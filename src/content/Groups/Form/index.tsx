import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import PageTitle from "@/src/components/PageTitle";
import SelectUsers from "./SelectUsers";
import { createGroup, updateGroup } from "@/src/redux/slices/groupSlice";
import { Group, User } from "@/src/utils/resources/interfaces";
import { store } from "@/src/redux/store";
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
import Currencies from "@/src/core/db/Currencies.json";

interface SelectUsersRef {
  getUsers(): User[];
  setUsers(users: User[]): void;
}

interface Props {
  type: "create" | "edit";
}

const GroupForm = ({ type }: Props) => {
  const [name, setName] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");

  const selectUsersRef = useRef<SelectUsersRef>(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const { groupId } = router.query;

  useEffect(() => {
    if (type === "edit") {
      const selectedGroup = store
        .getState()
        .group.groups.find((item) => item.id === +groupId!);

      if (selectedGroup) {
        setName(selectedGroup.name);
        setCurrency(selectedGroup.currency);
        selectUsersRef.current?.setUsers(selectedGroup.users);
      }
    }
  }, []);

  const handleOnChangeName = (value: string) => {
    setName(value);
  };

  const handleOnChangeCurrency = (value: string) => {
    setCurrency(value);
  };

  const onClickSubmit = () => {
    const group: Group = {
      id: groupId ? +groupId : undefined,
      name,
      currency,
      users: selectUsersRef.current?.getUsers() || [],
    };

    if (type === "create") {
      dispatch(createGroup(group));
    } else {
      dispatch(updateGroup(group));
    }

    const createdGroup = store.getState().group.groups.at(-1);
    router.push(`/groups/${createdGroup?.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageTitle
        heading={type === "create" ? "Create a Group" : "Edit Group"}
        subHeading={
          type === "create"
            ? "You can create a group with your information."
            : "You can edit group information."
        }
      />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Info</h3>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Input
                  value={name}
                  onChange={(e) => handleOnChangeName(e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div>
                <Select value={currency} onValueChange={handleOnChangeCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {Currencies.data.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.code} ({item.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Users</h3>
          </CardHeader>
          <CardContent>
            <SelectUsers ref={selectUsersRef} />
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 flex justify-center">
        <Button className="w-full max-w-sm" onClick={onClickSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default GroupForm;
