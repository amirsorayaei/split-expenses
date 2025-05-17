"use client";

import CreateExpense from "@/src/content/Expenses/Create";

export default function CreateExpensePage({
  params,
}: {
  params: { groupId: string };
}) {
  return <CreateExpense groupId={+params.groupId} />;
}
