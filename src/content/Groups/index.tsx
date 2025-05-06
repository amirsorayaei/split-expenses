import React from "react";
import PageTitle from "@/src/components/PageTitle";
import GroupsTable from "./GroupsTable";
import { useRouter } from "next/router";
import { clientEnvironment } from "@/src/config/environments/client.environment.config";
import { Routes } from "@/src/core/routes";

const Groups = () => {
  const router = useRouter();

  const onClickButton = () => {
    router.push(clientEnvironment.NEXT_PUBLIC_BASE_URL + Routes.createGroup());
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageTitle
        heading="Groups"
        subHeading="Manage your expense groups"
        buttonTitle="Create Group"
        onClickButton={onClickButton}
      />
      <GroupsTable />
    </div>
  );
};

export default Groups;
