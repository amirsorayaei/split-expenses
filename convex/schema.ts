import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Common user object type for both registered and unregistered users
const userObject = v.object({
  id: v.optional(v.id("users")), // Optional reference to registered user
  name: v.string(), // Name of the user (required for all users)
  email: v.optional(v.string()), // Optional email for unregistered users
  isRegistered: v.boolean(), // Flag to indicate if user is registered
});

export default defineSchema({
  // Groups table - stores group information and its members
  groups: defineTable({
    title: v.string(),
    currency: v.string(),
    users: v.array(
      v.object({
        ...userObject.fields,
        joinedAt: v.number(), // When the user was added to the group
      })
    ),
    expenses: v.array(v.id("expenses")),
    balances: v.array(v.id("balances")),
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.optional(v.number()),
  }),

  // Expenses table - stores expense information and its participants
  expenses: defineTable({
    name: v.string(),
    amount: v.number(),
    payor: v.object({
      ...userObject.fields,
      paidAt: v.number(), // When the payment was made
    }),
    users: v.array(
      v.object({
        ...userObject.fields,
        share: v.number(), // User's share of the expense
        isPaid: v.boolean(), // Whether the user has paid their share
      })
    ),
    groupId: v.id("groups"),
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.optional(v.number()),
  })
    .index("by_group", ["groupId"])
    .index("by_payer", ["payor.id"]),

  // Users table - stores registered user information
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.optional(v.number()),
    lastActive: v.optional(v.number()),
  }),

  // Balances table - stores payment balances between users
  balances: defineTable({
    from: v.object({
      ...userObject.fields,
      amount: v.number(), // Amount this user owes
    }),
    to: v.object({
      ...userObject.fields,
      amount: v.number(), // Amount this user is owed
    }),
    groupId: v.id("groups"),
    isPaid: v.boolean(),
    paidAmount: v.number(),
    paymentMethod: v.optional(v.string()),
    paymentNote: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.optional(v.number()),
  })
    .index("by_group", ["groupId"])
    .index("by_users", ["from.id", "to.id"]),
});
