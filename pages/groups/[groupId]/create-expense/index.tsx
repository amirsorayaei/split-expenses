import CreateExpense from "@/content/Groups/Details/Expenses/Create";
import Head from "next/head";

const CreateExpensePage = () => {
  return (
    <>
      <Head>
        <title>{"Create Expense"}</title>
      </Head>
      <CreateExpense />
    </>
  );
};

export default CreateExpensePage;
