import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    amount: v.number(),
    date: v.string(),
    category: v.string(),
    description: v.optional(v.string()),
    groupId: v.id("groups"),
    participants: v.array(v.string()),
    paidBy: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const expenseId = await ctx.db.insert("expenses", {
      ...args,
      createdBy: identity.subject,
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
    title: v.optional(v.string()),
    amount: v.optional(v.number()),
    date: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    participants: v.optional(v.array(v.string())),
    paidBy: v.optional(v.string()),
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

    if (expense.createdBy !== identity.subject) {
      throw new Error("Not authorized to update this expense");
    }

    await ctx.db.patch(id, updates);
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

    if (expense.createdBy !== identity.subject) {
      throw new Error("Not authorized to delete this expense");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
