"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Receipt,
  Users,
  ArrowLeft,
  DollarSign,
  Check,
  Divide,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Expense, User } from "@/src/utils/resources/interfaces";
import { getRandomPastelColor } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";
import { createExpense, updateExpense } from "@/src/redux/slices/groupSlice";
import Snack from "@/src/components/Snack/Snack";
import TextField from "@/src/components/TextField/TextField";

interface Props {
  groupId: number;
  expenseId?: number;
}

type Tabs = "info" | "shares";

const ExpenseForm = ({ groupId, expenseId }: Props) => {
  const selectedGroup = useSelector((state: RootState) =>
    state.group.groups.find((item) => item.id === groupId)
  );
  const selectedExpense = selectedGroup?.expenses?.find(
    (expense) => expense.id === expenseId
  );

  const [activeTab, setActiveTab] = useState<Tabs>("info");
  const [expenseName, setExpenseName] = useState(selectedExpense?.name || "");
  const [amount, setAmount] = useState(
    selectedExpense?.amount.toString() || ""
  );
  const [payor, setPayor] = useState(
    selectedExpense?.payor.id.toString() || ""
  );
  const [selectedUsers, setSelectedUsers] = useState<User[]>(
    selectedExpense?.users || []
  );
  const [userShares, setUserShares] = useState<Record<number, string>>({});

  const dispatch = useDispatch();
  const router = useRouter();

  const currency = selectedGroup?.currency;

  // When users are selected/deselected, update their shares
  useEffect(() => {
    if (activeTab === "shares" && selectedUsers.length > 0 && amount) {
      const equalShare = (
        Number.parseFloat(amount.replace(/,/g, "")) / selectedUsers.length
      ).toFixed(0);

      const newShares: Record<number, string> = {};
      selectedUsers.forEach((user) => {
        // Preserve existing share if it exists, otherwise set equal share
        newShares[user.id] = userShares[user.id] || equalShare;
      });

      setUserShares(newShares);
    }
  }, [activeTab]);

  const handleUserToggle = (user: User, isChecked: boolean) => {
    if (isChecked) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    }
  };

  const handleAmountChange = (value: string) => {
    // Only allow numbers and commas
    const cleanValue = value.replace(/[^\d,]/g, "");
    setAmount(cleanValue);

    // Update shares if users are selected
    if (selectedUsers.length > 0 && cleanValue) {
      const equalShare = (
        Number.parseFloat(cleanValue.replace(/,/g, "")) / selectedUsers.length
      ).toFixed(0);

      const newShares: Record<number, string> = {};
      selectedUsers.forEach((user) => {
        newShares[user.id] = equalShare;
      });

      setUserShares(newShares);
    }
  };

  const handleShareChange = (userId: number, value: string) => {
    // Only allow numbers and commas
    const cleanValue = value.replace(/[^\d,]/g, "");
    setUserShares({
      ...userShares,
      [userId]: cleanValue,
    });
  };

  const formatNumber = (value: string) => {
    if (!value) return "";
    // Remove existing commas
    const withoutCommas = value.replace(/,/g, "");
    // Add commas for thousands
    return withoutCommas.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSplitEvenly = () => {
    if (selectedUsers.length > 0 && amount) {
      const equalShare = (
        Number.parseFloat(amount.replace(/,/g, "")) / selectedUsers.length
      ).toFixed(0);

      const newShares: Record<number, string> = {};
      selectedUsers.forEach((user) => {
        newShares[user.id] = equalShare;
      });

      setUserShares(newShares);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = selectedGroup?.users.find((user) => user.id === +payor);

    if (user) {
      const expense: Expense = {
        ...selectedExpense,
        name: expenseName,
        amount: +amount,
        payor: user,
        users: selectedUsers.map((user) => ({
          id: user.id,
          name: user.name,
          share: Number.parseFloat(
            userShares[user.id]?.replace(/,/g, "") || "0"
          ),
        })),
      };

      if (expenseId) {
        dispatch(updateExpense({ groupId, expense }));
      } else {
        dispatch(createExpense({ groupId, expense }));
      }

      // Then redirect or show success message
      handleOnBack();
      Snack.success(
        `${expenseName} has been ${
          expenseId ? "updated" : "created"
        } successfuly`
      );
    }
  };

  const handleOnBack = () => {
    router.back();
  };

  const getTotalShares = () => {
    let total = 0;
    Object.values(userShares).forEach((share) => {
      total += Number.parseFloat(share.replace(/,/g, "") || "0");
    });
    return total;
  };

  const isSharesValid = () => {
    if (selectedUsers.length === 0 || !amount) return false;
    const totalAmount = Number.parseFloat(amount.replace(/,/g, ""));
    const totalShares = getTotalShares();
    return Math.abs(totalAmount - totalShares) < 1; // Allow for tiny rounding errors
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 py-6">
      <Card className="bg-[#1a1a1a] border-none shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#064e3b]/80 to-[#10B981]/50 p-6">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Create Expense
              </CardTitle>
              <CardDescription className="text-gray-300">
                You can create an expense with your information.
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              className="bg-[#10B981] hover:bg-[#059669] text-white border-none"
              onClick={handleOnBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          </div>
        </div>

        <CardContent className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as Tabs)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 bg-[#141414] mb-6">
              <TabsTrigger
                value="info"
                className="data-[state=active]:bg-[#10B981] data-[state=active]:text-white"
              >
                Expense Info
              </TabsTrigger>
              <TabsTrigger
                value="shares"
                className="data-[state=active]:bg-[#10B981] data-[state=active]:text-white"
                disabled={selectedUsers.length === 0 || !amount}
              >
                Split Shares
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="expenseName"
                    className="text-white text-sm font-medium mb-2 block"
                  >
                    <div className="flex items-center">
                      <Receipt className="h-4 w-4 mr-2 text-[#10B981]" />
                      Expense Name
                    </div>
                  </Label>
                  <TextField
                    id="expenseName"
                    placeholder="Enter expense name"
                    value={expenseName}
                    onChangeText={setExpenseName}
                    className="bg-[#141414] border-[#2a2a2a] text-white focus:border-[#10B981] focus:ring-[#10B981]"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="amount"
                    className="text-white text-sm font-medium mb-2 block"
                  >
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-[#10B981]" />
                      Amount
                    </div>
                  </Label>
                  <div className="relative">
                    <TextField
                      id="amount"
                      placeholder="Enter amount"
                      value={formatNumber(amount)}
                      onChangeText={handleAmountChange}
                      type="number"
                      className="bg-[#141414] border-[#2a2a2a] text-white focus:border-[#10B981] focus:ring-[#10B981] pl-16"
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400 font-medium">
                      {currency}
                    </div>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="payor"
                    className="text-white text-sm font-medium mb-2 block"
                  >
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-[#10B981]" />
                      Paid By
                    </div>
                  </Label>
                  <Select value={payor} onValueChange={setPayor}>
                    <SelectTrigger className="bg-[#141414] border-[#2a2a2a] text-white">
                      <SelectValue placeholder="Select who paid" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#141414] border-[#2a2a2a] text-white">
                      {selectedGroup?.users?.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-white text-sm font-medium">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-[#10B981]" />
                      Select Users
                    </div>
                  </Label>
                  <div className="text-sm text-gray-400">
                    {selectedUsers.length}{" "}
                    {selectedUsers.length === 1 ? "user" : "users"} selected
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedGroup?.users?.map((user) => {
                    const checked = selectedUsers.some((u) => u.id === user.id);

                    return (
                      <div
                        id={user.id.toString()}
                        key={user.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          checked
                            ? "bg-[#1f1f1f] border-[#10B981]/50"
                            : "bg-[#1f1f1f] border-[#2a2a2a]"
                        }`}
                      >
                        <Checkbox
                          id={`user-${user.id}`}
                          checked={checked}
                          onCheckedChange={(checked) =>
                            handleUserToggle(user, checked === true)
                          }
                          className="border-[#2a2a2a] data-[state=checked]:bg-[#10B981] data-[state=checked]:border-[#10B981]"
                        />
                        <div className="flex items-center flex-1">
                          <Avatar
                            className={`h-8 w-8 mr-3 ${getRandomPastelColor(
                              user.name
                            )}`}
                          >
                            <AvatarFallback className="text-white">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <Label
                            htmlFor={`user-${user.id}`}
                            className="font-medium text-white cursor-pointer"
                          >
                            {user.name}
                          </Label>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedUsers.length > 0 && (
                  <div className="flex justify-end mt-6">
                    <Button
                      type="button"
                      onClick={() => setActiveTab("shares")}
                      className="bg-[#10B981] hover:bg-[#059669] text-white"
                    >
                      Continue to Split Shares
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="shares" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Divide className="h-4 w-4 mr-2 text-[#10B981]" />
                  <h3 className="text-white text-lg font-medium">
                    Users Share
                  </h3>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSplitEvenly}
                  className="border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
                >
                  Split Evenly
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedUsers.map((user) => (
                    <div key={user.id} className="space-y-2">
                      <Label className="text-white text-sm flex items-center">
                        <Avatar
                          className={`h-6 w-6 mr-2 ${getRandomPastelColor(
                            user.name
                          )}`}
                        >
                          <AvatarFallback className="text-white text-xs">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {user.name}
                      </Label>
                      <div className="relative">
                        <TextField
                          id="user-share"
                          value={formatNumber(userShares[user.id] || "")}
                          onChangeText={(value) =>
                            handleShareChange(user.id, value)
                          }
                          type="number"
                          className="bg-[#141414] border-[#2a2a2a] text-white focus:border-[#10B981] focus:ring-[#10B981] pl-16"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400 font-medium">
                          {currency}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#141414] p-4 rounded-lg mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">
                      Total Amount:
                    </span>
                    <span className="text-white font-bold">
                      {formatNumber(amount)} {currency}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white font-medium">
                      Total Shares:
                    </span>
                    <span className="text-white font-bold">
                      {formatNumber(getTotalShares().toString())} {currency}
                    </span>
                  </div>
                  {+amount !== getTotalShares() && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-white font-medium">
                        Remaining Shares:
                      </span>
                      <span
                        className={`font-bold ${
                          isSharesValid() ? "text-[#10B981]" : "text-red-500"
                        }`}
                      >
                        -{" "}
                        {formatNumber((+amount - getTotalShares()).toString())}{" "}
                        {currency}
                      </span>
                    </div>
                  )}
                  {!isSharesValid() && (
                    <div className="text-red-500 text-sm mt-2">
                      Total shares must equal the expense amount
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("info")}
                    className="border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Info
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#10B981] hover:bg-[#059669] text-white"
                    disabled={
                      !expenseName ||
                      !amount ||
                      !payor ||
                      selectedUsers.length === 0 ||
                      !isSharesValid()
                    }
                  >
                    <Check className="h-5 w-5 mr-2" /> Create Expense
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </form>
  );
};

export default ExpenseForm;
