import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PageTitle from "@/src/components/PageTitle";
import { RootState } from "@/src/redux/store";
import Expenses from "../../Expenses";

const GroupDetails = () => {
  const router = useRouter();
  const { groupId } = router.query;

  const selectedGroup = useSelector((state: RootState) =>
    state.group.groups.find((item) => item.id === +groupId!)
  );

  const onClickBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageTitle
        heading="Group Details"
        subHeading="You can see group details and expenses."
        buttonTitle="Back"
        onClickButton={onClickBack}
      />
      {selectedGroup && <Expenses group={selectedGroup} />}
    </div>
  );
};

export default GroupDetails;
