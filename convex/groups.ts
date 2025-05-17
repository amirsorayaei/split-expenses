import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    members: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const groupId = await ctx.db.insert("groups", {
      ...args,
      createdBy: identity.subject,
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

    const groups = await ctx.db
      .query("groups")
      .filter((q) => q.eq(q.field("createdBy"), identity.subject))
      .collect();

    return groups;
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
    description: v.optional(v.string()),
    members: v.optional(v.array(v.string())),
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

    if (group.createdBy !== identity.subject) {
      throw new Error("Not authorized to update this group");
    }

    await ctx.db.patch(id, updates);
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

    if (group.createdBy !== identity.subject) {
      throw new Error("Not authorized to delete this group");
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
