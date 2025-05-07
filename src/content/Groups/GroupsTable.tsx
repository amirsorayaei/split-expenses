import { TableCell } from "@/components/ui/table";
import CustomTable from "@/src/components/Table";
import ActionButtons from "@/src/components/ActionButtons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { Group } from "@/src/utils/resources/interfaces";
import { RootState } from "@/src/redux/store";
import { deleteGroup } from "@/src/redux/slices/groupSlice";
import { getTotalAmountOfExpenses } from "@/src/utils/resources/Functions";
import { Button } from "@/components/ui/button";
import { Routes } from "@/src/core/routes";
import { API_URL } from "@/src/core/constants";

const GroupsTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  /**
   * Clone groups list from redux
   */
  const groups = useSelector((state: RootState) => state.group.groups);

  const onClickItem = (item: Group) => {
    router.push(`/groups/${item.id}/`);
  };

  const tableColumns = [
    { text: "Name", align: "left" as const },
    { text: "Members", align: "left" as const },
    { text: "Total Expenses", align: "left" as const },
    { text: "Actions", align: "left" as const },
  ];

  const onEditGroup = (groupId: number) => {
    router.push(`/groups/${groupId}/edit`);
  };

  const onCreateGroup = () => {
    router.push(API_URL + Routes.createGroup());
  };

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
            onEdit={() => onEditGroup(item.id!)}
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
      title={"Groups"}
      tableColumns={tableColumns}
      data={groups}
      renderItem={renderItem}
      emptyMessage={"No groups found"}
      onClickItem={onClickItem}
      action={<Button onClick={onCreateGroup}>Create Group</Button>}
    />
  );
};

export default GroupsTable;
