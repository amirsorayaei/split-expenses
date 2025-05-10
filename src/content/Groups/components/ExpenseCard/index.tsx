import {
  Calendar,
  Receipt,
  Wallet,
  DollarSign,
  PieChart,
  UserIcon,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Expense } from "@/src/utils/resources/interfaces";
import { formatCurrency, getRandomPastelColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { deleteExpense } from "@/src/redux/slices/groupSlice";

interface Props {
  groupId: number;
  expense: Expense;
  currency: string;
}

const ExpenseCard = ({ groupId, expense, currency }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Check if expense is split equally
  const isEqualSplit = expense.users.every(
    (user) => user.share === expense.users[0].share
  );

  // Calculate the percentage each user contributes to the expense
  const calculatePercentage = (share: number) => {
    return (share / expense.amount) * 100;
  };

  const handleOnDeleteExpense = () => {
    dispatch(deleteExpense({ groupId: groupId, expenseId: expense.id }));
  };

  return (
    <Card className="overflow-hidden border border-[#2a2a2a] bg-[#1f1f1f]">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-xl font-bold text-white flex items-center">
              <Receipt className="h-5 w-5 mr-2 text-[#10B981]" />
              {expense.name}
            </h4>
            <div className="flex items-center text-gray-400 mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{expense.createdAt}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-white">
              {formatCurrency(expense.amount, currency)}
            </div>
            <div className="flex items-center text-gray-400 mt-1 justify-end">
              <UserIcon className="h-4 w-4 mr-1" />
              <span>
                Paid by{" "}
                <span className="font-medium text-[#10B981]">
                  {expense.payor.name}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <PieChart className="h-4 w-4 text-[#10B981] mr-2" />
              <span className="text-gray-300 font-medium">
                {isEqualSplit ? "Split equally" : "Split unevenly"}
              </span>
            </div>
            {isEqualSplit && (
              <span className="text-sm text-gray-400">
                {formatCurrency(expense.users[0].share || 0, currency)} per
                person
              </span>
            )}
          </div>

          <Progress value={100} className="h-1 mb-4" />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {expense.users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 bg-[#1a1a1a] p-3 rounded-lg border border-[#2a2a2a] shadow-sm"
              >
                <Avatar
                  className={`h-8 w-8 ${getRandomPastelColor(user.name)}`}
                >
                  <AvatarFallback className="text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-white">{user.name}</div>
                  <div className="text-sm text-gray-400">
                    {formatCurrency(user.share || 0, currency)}
                    <span className="text-xs ml-1">
                      ({calculatePercentage(user.share || 0).toFixed(0)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleOnDeleteExpense}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete Expense
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExpenseCard;
