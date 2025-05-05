import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import PageTitle from "@/components/PageTitle";
import { Expense, User } from "@/utils/resources/interfaces";
import UsersShare from "./UsersShare";
import { createExpense, updateExpense } from "@/redux/slices/groupSlice";
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  groupId: number;
  expenseId?: number;
}

const CreateExpense = ({ groupId, expenseId }: Props) => {
  const selectedGroup = useSelector((state: RootState) =>
    state.group.groups.find((item) => item.id === groupId)
  );

  const selectedExpense = selectedGroup?.expenses?.find(
    (expense) => expense.id === expenseId
  );

  const [name, setName] = useState<string>(selectedExpense?.name || "");
  const [amount, setAmount] = useState<string>(
    selectedExpense?.amount.toString() || ""
  );
  const [payorUserId, setPayorUserId] = useState<string>(
    selectedExpense?.payor.id.toString() || ""
  );
  const [users, setUsers] = useState<User[]>(selectedExpense?.users || []);
  const [detailsSubmitted, setDetailsSubmitted] = useState<boolean>(
    !!expenseId
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const handleOnChangeName = (value: string) => {
    setName(value);
  };

  const handleOnChangeAmount = (value: string) => {
    setAmount(value);
  };

  const handleOnChangePayorUser = (value: string) => {
    setPayorUserId(value);
  };

  const handleUserSelection = (user: User, checked: boolean) => {
    if (checked) {
      setUsers((prev) => [...prev, user]);
    } else {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    }
  };

  const toggleDetailsSubmission = () => {
    setDetailsSubmitted(!detailsSubmitted);
  };

  const submitAll = (users: User[]) => {
    const user = selectedGroup?.users.find((user) => user.id === +payorUserId);

    if (user) {
      const expense: Expense = {
        ...selectedExpense,
        name,
        amount: +amount,
        payor: user,
        users,
      };

      if (expenseId) {
        dispatch(updateExpense({ groupId, expense }));
      } else {
        dispatch(createExpense({ groupId, expense }));
      }

      router.back();
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageTitle
        heading="Create Expense"
        subHeading="You can create a expense with your information."
      />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Info</h3>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <Input
                  value={name}
                  onChange={(e) => handleOnChangeName(e.target.value)}
                  placeholder="Name"
                  disabled={detailsSubmitted}
                />
              </div>
              <div>
                <Input
                  value={amount}
                  onChange={(e) => handleOnChangeAmount(e.target.value)}
                  placeholder="Amount"
                  type="number"
                  disabled={detailsSubmitted}
                />
                {selectedGroup?.currency && (
                  <span className="ml-2">{selectedGroup.currency}</span>
                )}
              </div>
              <div>
                <Select
                  value={payorUserId}
                  onValueChange={handleOnChangePayorUser}
                  disabled={detailsSubmitted}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payor" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedGroup?.users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <div className="space-y-4">
                  <Label>Select Users</Label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {selectedGroup?.users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`user-${user.id}`}
                          checked={users.some((u) => u.id === user.id)}
                          onCheckedChange={(checked) =>
                            handleUserSelection(user, checked as boolean)
                          }
                          disabled={detailsSubmitted}
                        />
                        <Label
                          htmlFor={`user-${user.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {user.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {!detailsSubmitted && (
              <div className="mt-4">
                <Button onClick={toggleDetailsSubmission}>Submit</Button>
              </div>
            )}
          </CardContent>
        </Card>
        {detailsSubmitted && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">Users Share</h3>
              <Button variant="outline" onClick={toggleDetailsSubmission}>
                Back
              </Button>
            </CardHeader>
            <CardContent>
              <UsersShare
                users={users}
                amount={+amount}
                submit={submitAll}
                currency={selectedGroup?.currency}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreateExpense;
