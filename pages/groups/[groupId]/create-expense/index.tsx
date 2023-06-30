import { useRouter } from "next/router";
import Head from "next/head";

import CreateExpense from "@/content/Expenses/Create";

const CreateExpensePage = () => {
  const router = useRouter();

  const { groupId } = router.query;

  if (!groupId) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{"Create Expense"}</title>
      </Head>
      <CreateExpense groupId={+groupId} />
    </>
  );
};

export default CreateExpensePage;
