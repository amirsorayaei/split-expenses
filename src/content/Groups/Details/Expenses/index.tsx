import React from "react";
import { TableCell, Typography } from "@mui/material";

import Table from "@/components/Table";
import { Expense } from "@/core/resources/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import { deleteExpense } from "@/redux/slices/groupSlice";
import ActionButtons from "@/components/ActionButtons";
import { useRouter } from "next/router";

interface Props {
  groupId: number;
}

const Expenses = ({ groupId }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const expenses =
    useSelector((state: RootState) =>
      state.group.groups.find((el) => el.id === groupId)
    )?.expenses || [];

  const onClickItem = (item: Expense) => {
    router.push(`./${groupId}/expense/${item.id}`);
  };

  const renderItem = (item: Expense) => {
    const onDeleteExpense = () => {
      dispatch(deleteExpense(item));
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
          <Typography>
            {item.usersWithShare?.length + " " + "people"}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.amount}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.createdAt}</Typography>
        </TableCell>
        <TableCell>
          <ActionButtons
            onDelete={onDeleteExpense}
            dialogSettings={{
              title: "Delete expense?",
              message: "Do you want to delete this expense?",
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
      data={expenses}
      renderItem={renderItem}
      title={"Expenses Table List"}
      emptyMessage={"No expenses found !"}
      onClickItem={onClickItem}
      tableColumns={[
        { text: "ID" },
        { text: "Name" },
        { text: "Users count" },
        { text: "Expense amount" },
        { text: "Created at" },
      ]}
    />
  );
};

export default Expenses;
