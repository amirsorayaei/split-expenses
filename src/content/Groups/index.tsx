import React from "react";
import PageTitle from "@/src/components/PageTitle";
import GroupsTable from "./GroupsTable";

const Groups = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageTitle
        heading="Groups"
        subHeading="Manage your expense groups"
        buttonTitle="Create Group"
        onClickButton={() => {}}
      />
      <GroupsTable />
    </div>
  );
};

export default Groups;
