import { NextRequest, NextResponse } from "next/server";

const FLUTTERWAVE_SECRET_HASH = process.env.FLUTTERWAVE_SECRET_HASH!;

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("verif-hash");

    if (signature !== FLUTTERWAVE_SECRET_HASH) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = await req.json();

    switch (event.event) {
      case "charge.completed": {
        const { tx_ref, amount, customer, meta } = event.data;
        const programSlug = meta?.programSlug;
        const cohortId = meta?.cohortId;

        // TODO: Update enrollment status in database
        // await prisma.enrollment.update({
        //   where: { paymentReference: tx_ref },
        //   data: { status: "ACTIVE", paidAt: new Date() },
        // });

        console.log(`Flutterwave charge.completed: txRef=${tx_ref}, program=${programSlug}`);
        break;
      }

      case "subscription.completed": {
        const { id, customer, plan } = event.data;

        // TODO: Create subscription record
        // await prisma.subscription.create({
        //   data: { flutterwaveId: id, userId: customer.id, planId: plan },
        // });

        console.log(`Flutterwave subscription.completed: id=${id}`);
        break;
      }

      default:
        console.log(`Unhandled Flutterwave event: ${event.event}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Flutterwave webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
