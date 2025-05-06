import React from "react";
import { TableCell } from "@/components/ui/table";
import CustomTable from "@/src/components/Table";
import ActionButtons from "@/src/components/ActionButtons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { Group, Expense } from "@/src/utils/resources/interfaces";
import { RootState } from "@/src/redux/store";
import { deleteGroup } from "@/src/redux/slices/groupSlice";
import { getTotalAmountOfExpenses } from "@/src/utils/resources/Functions";
import { Button } from "@/components/ui/button";

interface Props {
  groupId?: number;
  expenses?: Expense[];
}

const GroupsTable = ({ groupId, expenses }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * Clone groups list from redux
   */
  const groups = useSelector((state: RootState) => state.group.groups);
  const selectedGroup = groupId ? groups.find((g) => g.id === groupId) : null;

  const onClickItem = (item: Group) => {
    router.push(`/groups/${item.id}/`);
  };

  const handleOnCreateExpense = () => {
    router.push(`/groups/${groupId}/create-expense`);
  };

  const tableColumns = [
    { text: "Name", align: "left" as const },
    { text: "Members", align: "left" as const },
    { text: "Total Expenses", align: "left" as const },
    { text: "Actions", align: "left" as const },
  ];

  const renderItem = (item: Group) => {
    const onDeleteGroup = () => {
      dispatch(deleteGroup(item.id));
    };

    return (
      <>
        <TableCell key="name">{item.name}</TableCell>
        <TableCell key="members">
          {item.users?.length + " " + "people"}
        </TableCell>
        <TableCell key="total">{`${getTotalAmountOfExpenses(item.expenses)} ${
          item.currency
        }`}</TableCell>
        <TableCell key="actions" className="text-left">
          <ActionButtons
            onEdit={() => {}}
            onDelete={onDeleteGroup}
            dialogSettings={{
              title: "Delete Group",
              message: "Are you sure you want to delete this group?",
            }}
          />
        </TableCell>
      </>
    );
  };

  return (
    <CustomTable
      title={selectedGroup ? "Expenses" : "Groups"}
      tableColumns={tableColumns}
      data={selectedGroup ? [selectedGroup] : groups}
      renderItem={renderItem}
      emptyMessage={selectedGroup ? "No expenses found" : "No groups found"}
      onClickItem={onClickItem}
      action={<Button onClick={handleOnCreateExpense}>Create Expense</Button>}
    />
  );
};

export default GroupsTable;
