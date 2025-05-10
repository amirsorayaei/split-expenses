import GroupForm from "@/src/content/Groups/components/Form";
import Head from "next/head";

const CreateGroupPage = () => {
  return (
    <>
      <Head>
        <title>{"Create Group"}</title>
      </Head>
      <GroupForm type="create" />
    </>
  );
};

export default CreateGroupPage;
