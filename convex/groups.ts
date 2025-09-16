import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    currency: v.string(),
    users: v.array(
      v.object({
        id: v.optional(v.id("users")),
        name: v.string(),
        email: v.optional(v.string()),
        isRegistered: v.boolean(),
        joinedAt: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const now = Date.now();
    const groupId = await ctx.db.insert("groups", {
      ...args,
      expenses: [],
      balances: [],
      createdAt: now,
      updatedAt: now,
    });

    return groupId;
  },
});

export const list = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get all groups where the current user is a member
    const groups = await ctx.db
      .query("groups")
      .filter((q) =>
        q.and(
          q.eq(q.field("deletedAt"), undefined),
          q.or(
            // User is in the users array
            q.gt(q.field("users"), [])
          )
        )
      )
      .collect();

    // Filter groups where user is actually a member
    return groups.filter((group) =>
      group.users.some(
        (user) => user.id === identity.subject || user.email === identity.email
      )
    );
  },
});

export const get = query({
  args: {
    id: v.id("groups"),
  },
  handler: async (ctx, args) => {
    const group = await ctx.db.get(args.id);
    return group;
  },
});

export const update = mutation({
  args: {
    id: v.id("groups"),
    name: v.optional(v.string()),
    currency: v.optional(v.string()),
    users: v.optional(
      v.array(
        v.object({
          id: v.optional(v.id("users")),
          name: v.string(),
          email: v.optional(v.string()),
          isRegistered: v.boolean(),
          joinedAt: v.number(),
        })
      )
    ),
    deletedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const { id, ...updates } = args;
    const group = await ctx.db.get(id);

    if (!group) {
      throw new Error("Group not found");
    }
    await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
    return id;
  },
});

export const remove = mutation({
  args: {
    id: v.id("groups"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const group = await ctx.db.get(args.id);
    if (!group) {
      throw new Error("Group not found");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
