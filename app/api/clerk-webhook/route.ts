import { NextApiRequest, NextApiResponse } from "next";
import { Webhook } from "svix";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const svix = new Webhook(CLERK_WEBHOOK_SECRET);
  let event: any;
  try {
    event = svix.verify(req.body, req.headers as Record<string, string>);
  } catch (err) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  if (event.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = event.data;
    const email = email_addresses[0]?.email_address || "";
    const name = [first_name, last_name].filter(Boolean).join(" ") || email;

    // Call Convex mutation to create user
    await fetch(
      `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/functions/users:createUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, clerkId: id }),
      }
    );
  }

  res.status(200).json({ success: true });
}
