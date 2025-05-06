import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PageTitle from "@/src/components/PageTitle";
import { RootState } from "@/src/redux/store";
import GroupsTable from "../GroupsTable";

const GroupDetails = () => {
  const router = useRouter();
  const { groupId } = router.query;

  const selectedGroup = useSelector((state: RootState) =>
    state.group.groups.find((item) => item.id === +groupId!)
  );

  const onClickEditGroup = () => {
    router.push(`/groups/${groupId}/edit`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageTitle
        heading="Group Details"
        subHeading="You can see group details and expenses."
        buttonTitle="Edit Group"
        onClickButton={onClickEditGroup}
      />
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
