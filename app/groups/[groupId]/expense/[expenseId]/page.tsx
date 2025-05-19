"use client";

import CreateExpense from "@/src/content/Expenses/Create";

export default function ExpenseDetailPage({
  params,
}: {
  params: { groupId: string; expenseId: string };
}) {
  return (
    <CreateExpense groupId={+params.groupId} expenseId={+params.expenseId} />
  );
}
