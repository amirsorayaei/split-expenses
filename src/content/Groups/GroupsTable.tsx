import React from "react";
import { TableCell, Typography } from "@mui/material";

import Table from "@/components/Table";
import { Group } from "@/core/resources/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import ActionButtons from "@/components/ActionButtons";
import { deleteGroup } from "@/redux/slices/groupSlice";
import { getTotalExpenseOfGroup } from "@/core/resources/Functions";

const GroupsTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * Clone groups list from redux
   */
  const groups = useSelector((state: RootState) => state.group.groups);

  const onClickItem = (item: Group) => {
    router.push(`/groups/${item.id}`);
  };

  const renderItem = (item: Group) => {
    const onDeleteGroup = () => {
      dispatch(deleteGroup(item));
    };

    return (
      <>
        <TableCell>
          <Typography>{item.id}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.users?.length + " " + "people"}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{`${getTotalExpenseOfGroup(item.id)} ${
            item.currency
          }`}</Typography>
        </TableCell>
        <TableCell>
          <ActionButtons
            onDelete={onDeleteGroup}
            dialogSettings={{
              title: "Delete group?",
              message: "Do you want to delete this group?",
              confirmBtn: "Yes",
              cancelBtn: "No",
            }}
          />
        </TableCell>
      </>
    );
  };

  return (
    <Table
      data={groups}
      renderItem={renderItem}
      title={"Groups Table List"}
      emptyMessage={"No groups found !"}
      onClickItem={onClickItem}
      tableColumns={[
        { text: "ID" },
        { text: "Name" },
        { text: "Users count" },
        { text: "Expense" },
      ]}
    />
  );
};

export default GroupsTable;
