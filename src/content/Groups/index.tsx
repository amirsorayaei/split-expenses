import React from "react";
import { Container } from "@mui/material";
import { useRouter } from "next/router";

import PageTitle from "@/components/PageTitle";
import GroupsTable from "./GroupsTable";

const Groups = () => {
  const router = useRouter();

  const onClickCreatNewGroup = () => {
    router.push("/groups/create");
  };

  return (
    <Container maxWidth="lg">
      <PageTitle
        heading={"Groups"}
        subHeading={"You can manage all of your expenses here."}
        buttonTitle={"Create new group"}
        onClickButton={onClickCreatNewGroup}
      />
      <GroupsTable />
    </Container>
  );
};

export default Groups;
