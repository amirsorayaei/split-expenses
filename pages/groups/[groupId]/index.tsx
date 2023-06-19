import React from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import GroupDetails from "@/content/Groups/Details";

const GroupDetailsPage = () => {
  const router = useRouter();

  const { groupId } = router.query;

  if (!groupId) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{"Group Details"}</title>
      </Head>
      <GroupDetails id={+groupId} />
    </>
  );
};

export default GroupDetailsPage;
