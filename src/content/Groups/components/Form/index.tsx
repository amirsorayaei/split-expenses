"use client";
import type React from "react";

import { useEffect, useState } from "react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Plus, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Id } from "@/convex/_generated/dataModel";
import { useRouter, useParams } from "next/navigation";
import { store } from "@/src/redux/store";
import Snack from "@/src/components/Snack/Snack";
import { getRandomPastelColor } from "@/lib/utils";
import Currencies from "@/src/core/db/Currencies.json";
import TextField from "@/src/components/TextField/TextField";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface Props {
  type: "create" | "edit";
}

const GroupForm = ({ type }: Props) => {
  const [groupName, setGroupName] = useState("");
  const [currency, setCurrency] = useState("IRR");
  const [newUserName, setNewUserName] = useState("");
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [nextUserId, setNextUserId] = useState(1);

  const createGroup = useMutation(api.groups.create);
  const updateGroup = useMutation(api.groups.update);

  const router = useRouter();
  const params = useParams<{ groupId?: string }>();
  const groupId = params?.groupId ?? null;

  useEffect(() => {
    if (type === "edit") {
      const selectedGroup = store
        .getState()
        .group.groups.find((item) =>
          groupId ? String(item.id) === groupId : false
        );
      // If your stored ids are numbers, compare as strings
      // .find((item) => item.id?.toString() === groupId)

      if (selectedGroup) {
        setGroupName(selectedGroup.name);
        setCurrency(selectedGroup.currency);
        setUsers(selectedGroup.users);
      }
    }
  }, []);

  const handleAddUser = () => {
    if (newUserName.trim()) {
      setUsers([...users, { id: nextUserId, name: newUserName.trim() }]);
      setNextUserId(nextUserId + 1);
      setNewUserName("");
    }
  };

  const handleRemoveUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    const convexUsers = users.map((u) => ({
      name: u.name,
      isRegistered: false,
      joinedAt: now,
    }));

    if (type === "create") {
      await createGroup({ name: groupName, currency, users: convexUsers });
    } else if (groupId) {
      await updateGroup({
        id: groupId as unknown as Id<"groups">,
        name: groupName,
        currency,
        users: convexUsers,
      });
    }

    // Then redirect or show success message
    router.push(`/groups`);
    Snack.success(`${groupName} has been created successfuly`);
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 py-6">
      <Card className="bg-[#1a1a1a] border-none shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#064e3b]/80 to-[#10B981]/50 p-6">
          <CardTitle className="text-2xl font-bold text-white mb-2">
            Create a Group
          </CardTitle>
          <CardDescription className="text-gray-300">
            You can create a group with your information.
          </CardDescription>
        </div>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="groupName"
                className="text-white text-sm font-medium mb-2 block"
              >
                Group Name
              </Label>
              <TextField
                id="groupName"
                placeholder="Enter group name"
                value={groupName}
                onChangeText={setGroupName}
                className="bg-[#141414] border-[#2a2a2a] text-white focus:border-[#10B981] focus:ring-[#10B981]"
              />
            </div>

            <div>
              <Label
                htmlFor="currency"
                className="text-white text-sm font-medium mb-2 block"
              >
                Currency
              </Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="bg-[#141414] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>

                <SelectContent className="bg-[#141414] border-[#2a2a2a] text-white">
                  {Currencies.data.map((item) => (
                    <SelectItem key={item.code} value={item.code}>
                      {item.code} ({item.name})
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
                  Users
                </div>
              </Label>
              <div className="text-sm text-gray-400">
                {users.length} {users.length === 1 ? "member" : "members"}
              </div>
            </div>

            <div className="flex space-x-2 mb-4">
              <TextField
                id="user-name"
                placeholder="Enter user name"
                value={newUserName}
                onChangeText={setNewUserName}
                handleSubmit={handleAddUser}
                className="bg-[#141414] border-[#2a2a2a] text-white focus:border-[#10B981] focus:ring-[#10B981]"
              />
              <Button
                type="button"
                onClick={handleAddUser}
                className="bg-[#10B981] hover:bg-[#059669] text-white"
                disabled={!newUserName.trim()}
              >
                <Plus className="h-4 w-4 mr-2" /> Add User
              </Button>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {users.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {users.map((user) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between bg-[#1f1f1f] p-3 rounded-lg border border-[#2a2a2a]"
                      >
                        <div className="flex items-center">
                          <Avatar
                            className={`h-8 w-8 mr-3 ${getRandomPastelColor(
                              user.name
                            )}`}
                          >
                            <AvatarFallback className="text-white">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-white">
                            {user.name}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveUser(user.id)}
                          className="text-red-500 hover:text-red-400 hover:bg-[#2a2a2a] p-1 h-auto"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#141414] rounded-lg p-6 text-center">
                    <Users className="h-12 w-12 mx-auto mb-3 text-gray-600" />
                    <h3 className="text-lg font-medium text-white mb-1">
                      No users added
                    </h3>
                    <p className="text-gray-400">
                      Add at least one user to create a group
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-[#1a1a1a] p-6 pt-0">
          <Button
            type="submit"
            className="w-full bg-[#10B981] hover:bg-[#059669] text-white h-12 text-base"
            disabled={!groupName || !currency || users.length === 0}
          >
            <Check className="h-5 w-5 mr-2" /> Create Group
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default GroupForm;
