import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    amount: v.number(),
    payor: v.object({
      id: v.optional(v.id("users")),
      name: v.string(),
      email: v.optional(v.string()),
      isRegistered: v.boolean(),
      paidAt: v.number(),
    }),
    users: v.array(
      v.object({
        id: v.optional(v.id("users")),
        name: v.string(),
        email: v.optional(v.string()),
        isRegistered: v.boolean(),
        share: v.number(),
        isPaid: v.boolean(),
      })
    ),
    groupId: v.id("groups"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const now = Date.now();
    const expenseId = await ctx.db.insert("expenses", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });

    return expenseId;
  },
});

export const list = query({
  args: {
    groupId: v.id("groups"),
  },
  handler: async (ctx, args) => {
    const expenses = await ctx.db
      .query("expenses")
      .filter((q) => q.eq(q.field("groupId"), args.groupId))
      .collect();

    return expenses;
  },
});

export const get = query({
  args: {
    id: v.id("expenses"),
  },
  handler: async (ctx, args) => {
    const expense = await ctx.db.get(args.id);
    return expense;
  },
});

export const update = mutation({
  args: {
    id: v.id("expenses"),
    name: v.optional(v.string()),
    amount: v.optional(v.number()),
    payor: v.optional(
      v.object({
        id: v.optional(v.id("users")),
        name: v.string(),
        email: v.optional(v.string()),
        isRegistered: v.boolean(),
        paidAt: v.number(),
      })
    ),
    users: v.optional(
      v.array(
        v.object({
          id: v.optional(v.id("users")),
          name: v.string(),
          email: v.optional(v.string()),
          isRegistered: v.boolean(),
          share: v.number(),
          isPaid: v.boolean(),
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
    const expense = await ctx.db.get(id);

    if (!expense) {
      throw new Error("Expense not found");
    }
    await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
    return id;
  },
});

export const remove = mutation({
  args: {
    id: v.id("expenses"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const expense = await ctx.db.get(args.id);
    if (!expense) {
      throw new Error("Expense not found");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
