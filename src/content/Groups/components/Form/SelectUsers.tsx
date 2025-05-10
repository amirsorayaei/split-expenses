import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, Trash2 } from "lucide-react";
import { User } from "@/src/utils/resources/interfaces";
import { generateUniqueID } from "@/src/utils/resources/Functions";
import TextField from "@/src/components/TextField/TextField";

export interface SelectUsersRef {
  getUsers(): User[];
}

interface Props {}

const SelectUsers = forwardRef<SelectUsersRef, Props>(({}, ref) => {
  const [username, setUsername] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  useImperativeHandle(ref, () => ({
    getUsers: () => selectedUsers,
    setUsers: (users: User[]) => setSelectedUsers(users),
  }));

  const handleOnChangeUser = (value: string) => {
    setUsername(value);
  };

  const addUser = () => {
    /**
     * Adding users is allowed when the input is filled
     */
    if (username.length > 0) {
      setUsername("");
      setSelectedUsers((previousUsers) => [
        ...previousUsers,
        { id: generateUniqueID(selectedUsers), name: username },
      ]);
    }
  };

  const onDeleteUser = (user: User) => {
    const filteredUsers = selectedUsers.filter((el, i) => el.id !== user.id);
    setSelectedUsers(filteredUsers);
  };

  return (
    <div className="space-y-6">
      <TextField
        id="user-name-textfield"
        value={username}
        onChangeText={handleOnChangeUser}
        placeholder="User Name"
        handleSubmit={addUser}
        endAdornment={
          <Button variant="default" onClick={addUser}>
            Add User
            <CheckIcon />
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {selectedUsers.map((user) => (
          <Button
            key={user.id}
            variant="outline"
            className="h-auto flex-col items-start p-4"
            onClick={() => onDeleteUser(user)}
          >
            <div className="flex w-full items-center justify-between">
              <span>{user.name}</span>
              {selectedUsers.includes(user) && (
                <Trash2 className="h-4 w-4 text-destructive" />
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
});

SelectUsers.displayName = "SelectUsers";

export default SelectUsers;
