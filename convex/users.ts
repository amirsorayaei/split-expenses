import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get the currently authenticated user's document by _id.
export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    // In Convex Auth, identity.subject is the user _id in the "users" table.
    return await ctx.db.get(identity.subject as any);
  },
});

// Ensure current user exists and optionally synchronize name/email.
// Convex Auth creates the user automatically; we just patch fields if provided.
export const ensureCurrentUser = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db.get(identity.subject as any);
    if (!user) {
      // If not yet visible (race), just no-op — auth will create it.
      return identity.subject as any;
    }

    const updates: Record<string, unknown> = {};
    if (args.name && args.name !== (user as any).name) updates.name = args.name;
    if (args.email && args.email !== (user as any).email)
      updates.email = args.email;
    if (Object.keys(updates).length > 0) {
      await ctx.db.patch((user as any)._id, updates);
    }
    return (user as any)._id;
  },
});
