"use client";

import { useState } from "react";

import { Group } from "@/src/utils/resources/interfaces";
import { RootState } from "@/src/redux/store";
import { useSelector } from "react-redux";
import PageTitle from "@/src/components/PageTitle";
import EmptyContent from "@/src/components/EmptyContent";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/src/core/constants";
import { Routes } from "@/src/core/routes";
import GroupItem from "./components/GroupItem";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { isEmptyArray } from "@/lib/utils";

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
  const groups = useQuery(api.groups.list);

  console.log(groups);

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

      {isEmptyArray(groups) ? (
        <EmptyContent message="No groups yet. Create your first group to start splitting expenses." />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {groups?.map((group) => (
            <GroupItem
              key={group._id}
              group={group}
              expandedGroup={expandedGroup}
              setExpandedGroup={setExpandedGroup}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Groups;
