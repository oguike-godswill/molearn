const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const FLUTTERWAVE_PUBLIC_KEY = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!;
const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY!;
const FLUTTERWAVE_ENCRYPTION_KEY = process.env.FLUTTERWAVE_ENCRYPTION_KEY!;

export const paystackConfig = {
  publicKey: PAYSTACK_PUBLIC_KEY,
  secretKey: PAYSTACK_SECRET_KEY,
  baseUrl: "https://api.paystack.co",
};

export const flutterwaveConfig = {
  publicKey: FLUTTERWAVE_PUBLIC_KEY,
  secretKey: FLUTTERWAVE_SECRET_KEY,
  encryptionKey: FLUTTERWAVE_ENCRYPTION_KEY,
  baseUrl: "https://api.flutterwave.com/v3",
};

export async function initializePaystackPayment(
  email: string,
  amount: number,
  metadata: Record<string, unknown> = {}
): Promise<string> {
  const amountInKobo = Math.round(amount * 100);

  const response = await fetch(`${paystackConfig.baseUrl}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${paystackConfig.secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountInKobo,
      metadata,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payments/verify`,
    }),
  });

  const data = await response.json();

  if (!data.status) {
    throw new Error(data.message || "Failed to initialize Paystack payment");
  }

  return data.data.reference;
}

export async function initializeFlutterwavePayment(
  email: string,
  amount: number,
  metadata: Record<string, unknown> = {}
): Promise<string> {
  const txRef = `mojetech-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const response = await fetch(`${flutterwaveConfig.baseUrl}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${flutterwaveConfig.secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: txRef,
      amount,
      currency: "NGN",
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/payments/verify`,
      customer: { email },
      meta: metadata,
    }),
  });

  const data = await response.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to initialize Flutterwave payment");
  }

  return txRef;
}

export async function verifyPaystackPayment(
  reference: string
): Promise<{ status: string; amount: number; metadata: Record<string, unknown> }> {
  const response = await fetch(
    `${paystackConfig.baseUrl}/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${paystackConfig.secretKey}`,
      },
    }
  );

  const data = await response.json();

  if (!data.status || data.data.status !== "success") {
    throw new Error("Payment verification failed");
  }

  return {
    status: data.data.status,
    amount: data.data.amount / 100,
    metadata: data.data.metadata,
  };
}

export async function verifyFlutterwavePayment(
  transactionId: string
): Promise<{ status: string; amount: number; meta: Record<string, unknown> }> {
  const response = await fetch(
    `${flutterwaveConfig.baseUrl}/transactions/${transactionId}/verify`,
    {
      headers: {
        Authorization: `Bearer ${flutterwaveConfig.secretKey}`,
      },
    }
  );

  const data = await response.json();

  if (data.status !== "success" || data.data.status !== "successful") {
    throw new Error("Payment verification failed");
  }

  return {
    status: data.data.status,
    amount: data.data.amount,
    meta: data.data.meta,
  };
}
