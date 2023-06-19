import React from "react";
import Head from "next/head";
import Groups from "@/content/Groups";

const GroupsPage = () => {
  return (
    <>
      <Head>
        <title>{"Groups"}</title>
      </Head>
      <Groups />
    </>
  );
};

export default GroupsPage;
