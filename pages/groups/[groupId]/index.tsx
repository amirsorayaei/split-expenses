import React from "react";
import Head from "next/head";

import GroupDetails from "@/src/content/Groups/Details";

const GroupDetailsPage = () => {
  return (
    <>
      <Head>
        <title>{"Group Details"}</title>
      </Head>
      <GroupDetails />
    </>
  );
};

export default GroupDetailsPage;
