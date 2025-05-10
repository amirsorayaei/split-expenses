import {
  Users,
  Receipt,
  ChevronDown,
  ChevronUp,
  Wallet,
  DollarSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Group } from "@/src/utils/resources/interfaces";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  formatCurrency,
  getRandomPastelColor,
  isEmptyArray,
} from "@/lib/utils";
import { motion } from "framer-motion";
import ExpenseCard from "../ExpenseCard";
import { useRouter } from "next/router";
import { useState } from "react";
import SettleUpModal from "../SettleUpModal";

interface Props {
  group: Group;
  expandedGroup: number | null;
  setExpandedGroup(value: number | null): void;
}

const GroupItem = ({ group, expandedGroup, setExpandedGroup }: Props) => {
  const [isSettleUpModalOpen, setIsSettleUpModalOpen] =
    useState<boolean>(false);
  const router = useRouter();

  const toggleGroup = (groupId: number) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId);
  };

  const getTotalExpenses = (group: Group) => {
    if (isEmptyArray(group.expenses)) return 0;
    return group.expenses!.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  };

  const handleOnCreateExpense = (groupId: number) => {
    router.push(`/groups/${groupId}/create-expense`);
  };

  const handleToggleSettleUpModal = () => {
    setIsSettleUpModalOpen(!isSettleUpModalOpen);
  };

  return (
    <>
      <motion.div
        key={group.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden border-none shadow-lg bg-[#1a1a1a]">
          <div className="bg-gradient-to-r from-[#064e3b]/80 to-[#10B981]/50 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {group.name}'s Group
                </h3>
                <div className="flex items-center mt-2">
                  <Users className="h-4 w-4 text-gray-300 mr-2" />
                  <span className="text-gray-300">
                    {group.users.length} members
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {formatCurrency(getTotalExpenses(group), group.currency)}
                </div>
                <div className="text-gray-300 text-sm">Total expenses</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div>
                <div className="flex -space-x-2 overflow-hidden">
                  {group.users.slice(0, 5).map((user) => (
                    <Avatar
                      key={user.id}
                      className={`inline-block border-2 border-[#1a1a1a] ${getRandomPastelColor(
                        user.name
                      )}`}
                    >
                      <AvatarFallback className="text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {group.users.length > 5 && (
                    <Avatar className="inline-block border-2 border-[#1a1a1a] bg-gray-600">
                      <AvatarFallback className="text-white">
                        +{group.users.length - 5}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>

              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-300 border-[#2a2a2a] mr-2 hover:bg-[#2a2a2a]"
                  onClick={handleToggleSettleUpModal}
                >
                  <Wallet className="h-4 w-4 mr-1" /> Settle Up
                </Button>
                <Button
                  size="sm"
                  className="bg-[#10B981] hover:bg-[#059669] text-white"
                  onClick={() => handleOnCreateExpense(group.id!)}
                >
                  <DollarSign className="h-4 w-4 mr-1" /> Add Expense
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-6 bg-[#1a1a1a]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <Badge
                  variant="outline"
                  className="bg-[#064e3b]/20 text-[#10B981] border-[#064e3b]/50 flex items-center"
                >
                  <Receipt className="h-3 w-3 mr-1" />
                  {group.expenses?.length} Expenses
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-[#064e3b]/20 text-[#10B981] border-[#064e3b]/50"
                >
                  {group.currency}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleGroup(group.id!)}
                className="text-gray-300 hover:text-white hover:bg-[#1f1f1f]"
              >
                {expandedGroup === group.id ? (
                  <div className="flex items-center">
                    <span className="mr-2">Hide Details</span>
                    <ChevronUp className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="mr-2">Show Details</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>

            {expandedGroup === group.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {group.expenses?.map((expense) => (
                  <ExpenseCard
                    key={expense.id}
                    groupId={group.id!}
                    expense={expense}
                    currency={group.currency}
                  />
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <SettleUpModal
        open={isSettleUpModalOpen}
        group={group}
        onOpenChange={handleToggleSettleUpModal}
      />
    </>
  );
};

export default GroupItem;
