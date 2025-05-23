"use client";

import { useState } from "react";

import { Group } from "@/src/utils/resources/interfaces";
import { RootState } from "@/src/redux/store";
import { useSelector } from "react-redux";
import PageTitle from "@/src/components/PageTitle";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/src/core/constants";
import { Routes } from "@/src/core/routes";
import GroupItem from "./components/GroupItem";

const Groups = () => {
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [settleUpData, setSettleUpData] = useState<{
    isOpen: boolean;
    group?: Group;
  }>({
    isOpen: false,
    group: undefined,
  });

  const router = useRouter();

  /**
   * Clone groups list from redux
   */
  const groups = useSelector((state: RootState) => state.group.groups);

  const onCreateGroup = () => {
    router.push(BASE_API_URL + Routes.createGroup());
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <PageTitle
        heading="Groups"
        subHeading="Manage your expense groups"
        buttonTitle="Create Group"
        onClickButton={onCreateGroup}
      />

      <div className="grid grid-cols-1 gap-6">
        {groups.map((group) => (
          <GroupItem
            key={group.id}
            group={group}
            expandedGroup={expandedGroup}
            setExpandedGroup={setExpandedGroup}
          />
        ))}
      </div>
    </div>
  );
};

export default Groups;
