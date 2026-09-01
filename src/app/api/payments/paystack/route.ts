import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET_KEY)
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    switch (event.event) {
      case "charge.success": {
        const { reference, metadata, amount, customer } = event.data;
        const programSlug = metadata?.programSlug;
        const cohortId = metadata?.cohortId;
        const userId = metadata?.userId;

        // TODO: Update enrollment status in database
        // await prisma.enrollment.update({
        //   where: { paymentReference: reference },
        //   data: { status: "ACTIVE", paidAt: new Date() },
        // });

        console.log(`Paystack charge.success: ref=${reference}, program=${programSlug}`);
        break;
      }

      case "subscription.create": {
        const { subscription_code, customer, plan } = event.data;

        // TODO: Create subscription record
        // await prisma.subscription.create({
        //   data: { subscriptionCode: subscription_code, userId: customer.id, planId: plan.id },
        // });

        console.log(`Paystack subscription.create: code=${subscription_code}`);
        break;
      }

      case "subscription.disable": {
        const { subscription_code } = event.data;

        // TODO: Mark subscription as cancelled
        // await prisma.subscription.update({
        //   where: { subscriptionCode: subscription_code },
        //   data: { status: "CANCELLED" },
        // });

        console.log(`Paystack subscription.disable: code=${subscription_code}`);
        break;
      }

      default:
        console.log(`Unhandled Paystack event: ${event.event}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Paystack webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
