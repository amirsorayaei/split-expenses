import GroupForm from "@/src/content/Groups/Form";
import Head from "next/head";

const EditGroupPage = () => {
  return (
    <>
      <Head>
        <title>{"Edit Group"}</title>
      </Head>
      <GroupForm type="edit" />
    </>
  );
};

export default EditGroupPage;
