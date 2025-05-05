import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import CustomTable from "@/components/Table";
import { Expense, Group, User } from "@/utils/resources/interfaces";
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
  const [result, setResult] = useState<string[]>([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const expenses =
    useSelector((state: RootState) =>
      state.group.groups.find((el) => el.id === group.id)
    )?.expenses || [];

  const onClickItem = (item: Expense) => {
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
      dispatch(deleteExpense({ groupId: group.id, expenseId: item.id }));
    };

    return [
      <div key="id">{item.id}</div>,
      <div key="name">{item.name}</div>,
      <div key="users">{item.users?.length + " people"}</div>,
      <div key="payor">{item.payor.name}</div>,
      <div key="amount">{`${numberFormat(item.amount)} ${
        group.currency
      }`}</div>,
      <div key="created">{item.createdAt}</div>,
      <div key="actions">
        <ActionButtons
          onDelete={onDeleteExpense}
          dialogSettings={{
            title: "Delete expense?",
            message: "Do you want to delete this expense?",
          }}
        />
      </div>,
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between px-4 pb-2">
        <div data-testid="group-usersname">{getUsersName(group.users)}</div>
        <div>{`Total expense: ${getTotalAmountOfExpenses(group.expenses)} ${
          group.currency
        }`}</div>
      </div>
      <CustomTable
        data={expenses}
        renderItem={renderItem}
        title="Expenses Table List"
        emptyMessage="No expenses found!"
        onClickItem={onClickItem}
        tableColumns={[
          { text: "ID", align: "left" as const },
          { text: "Name", align: "left" as const },
          { text: "Users count", align: "left" as const },
          { text: "Payor", align: "left" as const },
          { text: "Expense amount", align: "left" as const },
          { text: "Created at", align: "left" as const },
          { text: "Actions", align: "right" as const },
        ]}
      />
      <div className="flex items-start justify-between p-4">
        <div className="space-y-2">
          {result.map((item, index) => (
            <div key={index}>
              {index + 1} - {item}
            </div>
          ))}
        </div>
        <button
          className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80"
          onClick={minimizeTransactions}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default Expenses;
