import CreateGroup from "@/src/content/Groups/Create";
import Head from "next/head";

const CreateGroupPage = () => {
  return (
    <>
      <Head>
        <title>{"Create Group"}</title>
      </Head>
      <CreateGroup />
    </>
  );
};

export default CreateGroupPage;
