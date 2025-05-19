import { NextApiRequest, NextApiResponse } from "next";
import { Webhook } from "svix";
import { api } from "@/convex/_generated/api";
import { convex } from "@/lib/convex";

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
    console.error("Webhook verification failed:", err);
    return res.status(400).json({ error: "Invalid signature" });
  }

  try {
    switch (event.type) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name } = event.data;
        const email = email_addresses[0]?.email_address || "";
        const name = [first_name, last_name].filter(Boolean).join(" ") || email;

        await convex.mutation(api.users.createUser, {
          name,
          email,
          clerkId: id,
        });
        break;
      }

      case "user.updated": {
        const { id, email_addresses, first_name, last_name } = event.data;
        const email = email_addresses[0]?.email_address;
        const name = [first_name, last_name].filter(Boolean).join(" ");

        await convex.mutation(api.users.updateUser, {
          clerkId: id,
          ...(name && { name }),
          ...(email && { email }),
        });
        break;
      }

      case "user.deleted": {
        const { id } = event.data;
        await convex.mutation(api.users.deleteUser, {
          clerkId: id,
        });
        break;
      }

      default:
        console.log("Unhandled webhook event:", event.type);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
