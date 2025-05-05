import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { User } from "@/src/utils/resources/interfaces";

export interface SelectUsersRef {
  getUsers(): User[];
}

interface Props {
  users?: User[];
}

const SelectUsers = forwardRef<SelectUsersRef, Props>(({ users = [] }, ref) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  useImperativeHandle(ref, () => ({
    getUsers: () => selectedUsers,
  }));

  const onSelectUser = (user: User) => {
    setSelectedUsers((prev) => {
      if (prev.includes(user)) {
        return prev.filter((u) => u.id !== user.id);
      }
      return [...prev, user];
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {users.map((user) => (
          <Button
            key={user.id}
            variant={selectedUsers.includes(user) ? "default" : "outline"}
            className="h-auto flex-col items-start p-4"
            onClick={() => onSelectUser(user)}
          >
            <div className="flex w-full items-center justify-between">
              <span>{user.name}</span>
              {selectedUsers.includes(user) && <Check className="h-4 w-4" />}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
});

SelectUsers.displayName = "SelectUsers";

export default SelectUsers;
