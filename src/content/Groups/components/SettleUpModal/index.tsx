import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, DollarSign, UserIcon } from "lucide-react";
import {
  formatCurrency,
  generateRandomID,
  getRandomPastelColor,
  isEmptyArray,
} from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Balance, Group, User } from "@/src/utils/resources/interfaces";
import TextField from "@/src/components/TextField/TextField";
import { useDispatch } from "react-redux";
import { createBalances, updateBalance } from "@/src/redux/slices/groupSlice";
import BalanceSkeleton from "./BalanceSkeleton";

interface SettleUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group?: Group;
}

const SettleUpModal = ({ open, onOpenChange, group }: SettleUpModalProps) => {
  const [selectedBalance, setSelectedBalance] = useState<Balance | null>(null);
  const [activeTab, setActiveTab] = useState("balances");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (group?.id && isEmptyArray(group?.balances)) {
      setTimeout(() => minimizeTransactions(), 1000);
    }
  }, [group?.id]);

  const minimizeTransactions = () => {
    const users = [...group?.users!];
    const givers: { user: User; amount: number }[] = [];
    const receivers: { user: User; amount: number }[] = [];
    users?.forEach((user) => {
      let amount = 0;
      group?.expenses?.forEach((expense) => {
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
    let array: Balance[] = [];

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

          array.push({
            id: generateRandomID(),
            from: giver.user,
            to: receiver.user,
            amount: giverAmountBeforeChange - giver.amount,
            isPaid: false,
            paidAmount: 0,
          });
        }
      });
    });

    dispatch(createBalances({ groupId: group?.id!, balances: array }));
  };

  const handleRecordPayment = (balance: Balance) => {
    setSelectedBalance(balance);
    setPaymentAmount(
      balance.isPaid
        ? (balance.amount - balance.paidAmount).toString()
        : balance.amount.toString()
    );
    setActiveTab("record");
  };

  const handleSubmitPayment = () => {
    if (selectedBalance) {
      dispatch(
        updateBalance({
          groupId: group?.id!,
          balance: {
            ...selectedBalance,
            isPaid: true,
            paidAmount: selectedBalance.isPaid
              ? selectedBalance.paidAmount + +paymentAmount
              : +paymentAmount,
            paymentMethod,
            paymentNote,
          },
        })
      );
    }
    setActiveTab("balances");
    setSelectedBalance(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1a1a] text-white border-[#2a2a2a] max-w-md sm:max-w-lg md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-[#10B981]" />
            Settle Up - {group?.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 bg-[#141414] mb-2">
            <TabsTrigger
              value="balances"
              className="data-[state=active]:bg-[#10B981] data-[state=active]:text-black"
            >
              Balances
            </TabsTrigger>
            <TabsTrigger
              value="record"
              className="data-[state=active]:bg-[#10B981] data-[state=active]:text-black"
              disabled={!selectedBalance && activeTab !== "record"}
            >
              Record Payment
            </TabsTrigger>
          </TabsList>

          <div className="text-sm text-gray-400 mb-4">
            Here's how the expenses are balanced between group members:
          </div>

          {!isEmptyArray(group?.balances) ? (
            <>
              <TabsContent value="balances" className="mt-4">
                {group?.balances?.length === 0 ? (
                  <div className="bg-[#141414] rounded-lg p-6 text-center">
                    <Check className="h-12 w-12 mx-auto mb-3 text-[#10B981]" />
                    <h3 className="text-lg font-medium text-white mb-1">
                      All settled up!
                    </h3>
                    <p className="text-gray-400">
                      Everyone in this group is even. No payments needed.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {group?.balances?.map((balance, index) => (
                      <Card
                        key={index}
                        className="bg-[#141414] border-[#2a2a2a] p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <Avatar
                                className={`h-8 w-8 ${getRandomPastelColor(
                                  balance.from.name
                                )}`}
                              >
                                <AvatarFallback>
                                  {balance.from.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="mx-2 text-gray-400">owes</span>
                              <Avatar
                                className={`h-8 w-8 ${getRandomPastelColor(
                                  balance.to.name
                                )}`}
                              >
                                <AvatarFallback>
                                  {balance.to.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="ml-3">
                              <div className="font-medium">
                                {balance.from.name}{" "}
                                <ArrowRight className="h-3 w-3 inline mx-1" />{" "}
                                {balance.to.name}
                              </div>
                              <div className="text-[#10B981] font-semibold">
                                {formatCurrency(
                                  balance.isPaid
                                    ? balance.amount - balance.paidAmount
                                    : balance.amount,
                                  group?.currency!
                                )}
                              </div>
                              {balance.isPaid && (
                                <div className="text-xs font-medium">
                                  Full Payment:{" "}
                                  {formatCurrency(
                                    balance.amount,
                                    group?.currency!
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className={
                              balance.amount !== balance.paidAmount
                                ? "bg-[#10B981] hover:bg-[#059669]"
                                : ""
                            }
                            onClick={() => handleRecordPayment(balance)}
                            disabled={balance.amount === balance.paidAmount}
                            variant="outline"
                          >
                            {balance.amount === balance.paidAmount
                              ? "Paid"
                              : "Settle"}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="record" className="mt-4">
                {paymentSuccess ? (
                  <div className="bg-[#141414] rounded-lg p-6 text-center">
                    <Check className="h-12 w-12 mx-auto mb-3 text-[#10B981]" />
                    <h3 className="text-lg font-medium text-white mb-1">
                      Payment Recorded!
                    </h3>
                    <p className="text-gray-400">
                      The balance has been updated successfully.
                    </p>
                  </div>
                ) : selectedBalance ? (
                  <div className="space-y-4">
                    <div className="bg-[#141414] p-4 rounded-lg mb-4">
                      <div className="text-sm text-gray-400 mb-2">
                        Recording payment:
                      </div>
                      <div className="flex items-center">
                        <Avatar
                          className={`h-8 w-8 ${getRandomPastelColor(
                            selectedBalance.from.name
                          )}`}
                        >
                          <AvatarFallback>
                            {selectedBalance.from.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <ArrowRight className="mx-2 text-gray-400" />
                        <Avatar
                          className={`h-8 w-8 ${getRandomPastelColor(
                            selectedBalance.to.name
                          )}`}
                        >
                          <AvatarFallback>
                            {selectedBalance.to.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <div className="font-medium">
                            {selectedBalance.from.name} pays{" "}
                            {selectedBalance.to.name}
                          </div>
                          <div className="text-[#10B981] font-semibold">
                            {formatCurrency(
                              selectedBalance.isPaid
                                ? selectedBalance.amount -
                                    selectedBalance.paidAmount
                                : selectedBalance.amount,
                              group?.currency!
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="amount" className="text-gray-300">
                          Amount
                        </Label>
                        <div className="relative">
                          <TextField
                            id="amount"
                            value={paymentAmount}
                            onChangeText={setPaymentAmount}
                            className="bg-[#141414] border-[#2a2a2a] text-white pl-10"
                            type="number"
                          />
                          <span className="absolute left-3 top-2 text-gray-400">
                            {group?.currency}
                          </span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="method" className="text-gray-300">
                          Payment Method
                        </Label>
                        <Select
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                        >
                          <SelectTrigger className="bg-[#141414] border-[#2a2a2a] text-white">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#141414] border-[#2a2a2a] text-white">
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="card">Card Payment</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="note" className="text-gray-300">
                          Note (Optional)
                        </Label>
                        <TextField
                          id="note"
                          placeholder="Add a note about this payment"
                          value={paymentNote}
                          onChangeText={setPaymentNote}
                          className="bg-[#141414] border-[#2a2a2a] text-white"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#141414] rounded-lg p-6 text-center">
                    <UserIcon className="h-12 w-12 mx-auto mb-3 text-gray-500" />
                    <h3 className="text-lg font-medium text-white mb-1">
                      No balance selected
                    </h3>
                    <p className="text-gray-400">
                      Please select a balance to settle from the Balances tab.
                    </p>
                  </div>
                )}
              </TabsContent>
            </>
          ) : (
            <BalanceSkeleton count={3} />
          )}
        </Tabs>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a] hover:text-white"
          >
            Close
          </Button>

          {activeTab === "record" && selectedBalance && !paymentSuccess && (
            <Button
              className="bg-[#10B981] hover:bg-[#059669] text-white"
              onClick={handleSubmitPayment}
              disabled={
                !paymentMethod ||
                !paymentAmount ||
                +paymentAmount > selectedBalance.amount
              }
            >
              Record Payment
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettleUpModal;
