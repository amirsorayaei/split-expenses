import CreateExpense from "@/content/Groups/Details/Expenses/Create";
import Head from "next/head";
import { useRouter } from "next/router";

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
