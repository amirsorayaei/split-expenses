import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PageTitle from "@/components/PageTitle";
import { RootState } from "@/redux/store";
import GroupsTable from "../GroupsTable";
import { Button } from "@/components/ui/button";

const GroupDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const selectedGroup = useSelector((state: RootState) =>
    state.group.groups.find((item) => item.id === +id!)
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <PageTitle
        heading="Group Details"
        subHeading="You can see group details and expenses."
      />
      <div className="mb-4">
        <Button onClick={() => router.back()}>Back</Button>
      </div>
      {selectedGroup && (
        <GroupsTable
          groupId={selectedGroup.id}
          expenses={selectedGroup.expenses}
        />
      )}
    </div>
  );
};

export default GroupDetails;
