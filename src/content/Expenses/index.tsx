import React, { useState } from "react";
import { Button, TableCell, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";

import Table from "@/components/Table";
import { Expense, Group, User } from "@/utils/resources/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteExpense } from "@/redux/slices/groupSlice";
import ActionButtons from "@/components/ActionButtons";
import {
  getTotalAmountOfExpenses,
  numberFormat,
} from "@/utils/resources/Functions";

interface Props {
  group: Group;
}

const Expenses = ({ group }: Props) => {
  const [result, setResult] = useState<any[]>([]);

  const expenses =
    useSelector((state: RootState) =>
      state.group.groups.find((el) => el.id === group.id)
    )?.expenses || [];

  const onClickItem = (item: Expense) => {
    const router = useRouter();
    router.push(`./${group.id}/expense/${item.id}`);
  };

  const minimizeTransactions = () => {
    const users = group.users;
    const givers: { user: User; amount: number }[] = [];
    const receivers: { user: User; amount: number }[] = [];
    users?.forEach((user) => {
      let amount = 0;
      expenses.forEach((expense) => {
        /**
         * Current user is the payor,
         * So he/she is owed money in this expense
         */
        if (user.id === expense.payor.id) {
          expense.users.forEach((item) => {
            /**
             * The payor should not be in the list
             */
            if (item.id !== user.id) {
              amount += item.share || 0;
            }
          });
        } else {
          expense.users.forEach((item) => {
            /**
             * The payor should not be in the list
             */
            if (item.id === user.id) {
              amount -= item.share || 0;
            }
          });
        }
      });

      if (amount > 0) {
        receivers.push({ user, amount: Math.abs(amount) });
      } else {
        givers.push({ user, amount: Math.abs(amount) });
      }
    });

    calculateShares(receivers, givers);
  };

  const calculateShares = (
    receivers: { user: User; amount: number }[],
    givers: { user: User; amount: number }[]
  ) => {
    let array: string[] = [];

    receivers.forEach((receiver) => {
      givers.forEach((giver) => {
        if (receiver.amount > 0 && giver.amount > 0) {
          const giverAmountBeforeChange = giver.amount;

          if (receiver.amount > giver.amount) {
            receiver.amount -= giver.amount;
            giver.amount -= giver.amount;
          } else {
            giver.amount -= receiver.amount;
            receiver.amount -= receiver.amount;
          }

          array.push(
            `${giver.user.name} owes to ${receiver.user.name} ${numberFormat(
              giverAmountBeforeChange - giver.amount
            )} ${group.currency}`
          );
        }
      });
    });

    setResult(array);
  };

  const getUsersName = (users: User[]) => {
    let usersText = "";
    users.forEach((user, index) => {
      usersText += user.name + " - ";

      /**
       * Remove the last 3 characters from string ( - )
       */
      if (index === group.users.length - 1) {
        usersText = usersText.substring(0, usersText.length - 3);
      }
    });

    return usersText;
  };

  const renderItem = (item: Expense) => {
    const onDeleteExpense = () => {
      useDispatch()(deleteExpense({ groupId: group.id, expenseId: item.id }));
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
          <Typography>{item.payor.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {`${numberFormat(item.amount)} ${group.currency}`}
          </Typography>
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
    <>
      <Box
        px={2}
        pb={1}
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        <Typography data-testid="group-usersname">
          {getUsersName(group.users)}
        </Typography>
        <Typography>{`Total expense: ${getTotalAmountOfExpenses(
          group.expenses
        )} ${group.currency}`}</Typography>
      </Box>
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
          { text: "Payor" },
          { text: "Expense amount" },
          { text: "Created at" },
        ]}
      />
      <Box
        p={2}
        pb={0}
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        <Box>
          {result.map((item, index) => {
            return (
              <Typography key={index}>
                {index + 1} - {item}
              </Typography>
            );
          })}
        </Box>
        <Button
          variant="contained"
          color={"secondary"}
          onClick={minimizeTransactions}
        >
          {"Calculate"}
        </Button>
      </Box>
    </>
  );
};

export default Expenses;
