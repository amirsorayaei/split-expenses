import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import PageTitle from "@/components/PageTitle";
import SelectUsers from "./SelectUsers";
import { createGroup } from "@/redux/slices/groupSlice";
import { Group, User } from "@/utils/resources/interfaces";
import { store } from "@/redux/store";
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
import Currencies from "@/core/db/Currencies.json";

interface SelectUsersRef {
  getUsers(): User[];
}

const CreateGroup = () => {
  const [name, setName] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");

  const selectUsersRef = useRef<SelectUsersRef>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleOnChangeName = (value: string) => {
    setName(value);
  };

  const handleOnChangeCurrency = (value: string) => {
    setCurrency(value);
  };

  const onClickSubmit = () => {
    const group: Group = {
      name,
      currency,
      users: selectUsersRef.current?.getUsers() || [],
    };
    dispatch(createGroup(group));

    const createdGroup = store.getState().group.groups.at(-1);
    router.push(`/groups/${createdGroup?.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageTitle
        heading="Create a Group"
        subHeading="You can create a group with your information."
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

export default CreateGroup;
