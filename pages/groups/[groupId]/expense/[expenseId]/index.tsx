import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import CreateExpense from "@/src/content/Expenses/Create";

const GroupDetailsPage = () => {
  const router = useRouter();

  const { groupId, expenseId } = router.query;

  if (!groupId) {
    return null;
  }

  if (!expenseId) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{"Expense Details"}</title>
      </Head>
      <CreateExpense groupId={+groupId} expenseId={+expenseId} />
    </>
  );
};

export default GroupDetailsPage;
