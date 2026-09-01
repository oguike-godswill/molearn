import { NextRequest, NextResponse } from "next/server";
import { verifyPaystackPayment, verifyFlutterwavePayment } from "@/lib/payments";
import { sendWelcomeEmail, sendEnrollmentConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, programSlug, cohortId, paymentReference, provider } = body;

    if (!name || !email || !programSlug || !paymentReference) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, programSlug, paymentReference" },
        { status: 400 }
      );
    }

    let paymentVerified = false;
    let paymentAmount = 0;

    if (provider === "flutterwave") {
      const result = await verifyFlutterwavePayment(paymentReference);
      paymentVerified = result.status === "successful";
      paymentAmount = result.amount;
    } else {
      const result = await verifyPaystackPayment(paymentReference);
      paymentVerified = result.status === "success";
      paymentAmount = result.amount;
    }

    if (!paymentVerified) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 402 });
    }

    // TODO: Find or create user
    // let user = await prisma.user.findUnique({ where: { email } });
    // if (!user) {
    //   user = await prisma.user.create({
    //     data: { name, email, phone, role: "STUDENT" },
    //   });
    // }

    // TODO: Create enrollment record
    // const enrollment = await prisma.enrollment.create({
    //   data: {
    //     userId: user.id,
    //     programSlug,
    //     cohortId,
    //     paymentReference,
    //     paymentAmount,
    //     paymentProvider: provider || "paystack",
    //     status: "ACTIVE",
    //   },
    // });

    // TODO: Fetch program and cohort details for emails
    // const program = await prisma.program.findUnique({ where: { slug: programSlug } });
    // const cohort = cohortId ? await prisma.cohort.findUnique({ where: { id: cohortId } }) : null;

    const programName = programSlug; // Replace with program.title
    const cohortName = cohortId || programSlug; // Replace with cohort.name
    const startDate = new Date().toLocaleDateString(); // Replace with cohort.startDate

    await sendEnrollmentConfirmation(email, name, programName);
    await sendWelcomeEmail(email, name, cohortName, startDate);

    return NextResponse.json({
      success: true,
      message: "Enrollment successful",
      data: {
        email,
        programSlug,
        cohortId,
        paymentReference,
        status: "ACTIVE",
      },
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Enrollment failed" },
      { status: 500 }
    );
  }
}
