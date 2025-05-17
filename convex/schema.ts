import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  expenses: defineTable({
    title: v.string(),
    amount: v.number(),
    date: v.string(),
    category: v.string(),
    description: v.optional(v.string()),
    createdBy: v.string(),
    groupId: v.string(),
    participants: v.array(v.string()),
    paidBy: v.string(),
  }),

  groups: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.string(),
    members: v.array(v.string()),
  }),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    groups: v.array(v.string()),
  }),
});
