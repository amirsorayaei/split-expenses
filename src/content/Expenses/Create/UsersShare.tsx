import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/utils/resources/interfaces";
import Snack from "@/components/Snack/Snack";

interface Props {
  users: User[];
  amount: number;
  submit(users: User[]): void;
  currency?: string;
}

interface UserItemProps {
  user: User;
  index: number;
  userShare: number;
  currency?: string;
}

interface UserItemRef {
  getUserShare(): User;
}

const UsersShare = ({ users, amount, submit, currency }: Props) => {
  const usersShare = useRef<UserItemRef[]>([]);

  const onClickSubmit = () => {
    const usersWithShare: User[] = usersShare.current.map((item) =>
      item.getUserShare()
    );

    const sharesSum = usersWithShare.reduce((a, b) => {
      return a + (b.share || 0);
    }, 0);

    if (sharesSum !== amount) {
      Snack.warn("Not Equal !");
      return;
    }

    submit(usersWithShare);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {users.map((user, index) => {
          const share = user.share?.toString()
            ? user.share
            : amount / users.length;

          return (
            <UserItem
              ref={(ref: UserItemRef) => (usersShare.current[index] = ref)}
              key={user.id}
              user={user}
              index={index}
              userShare={share}
              currency={currency}
            />
          );
        })}
      </div>
      <div className="flex justify-end">
        <Button onClick={onClickSubmit}>Submit</Button>
      </div>
    </div>
  );
};

const UserItem = forwardRef(
  ({ user, userShare, index, currency }: UserItemProps, ref) => {
    const [share, setShare] = useState<string>(userShare.toString());

    useImperativeHandle(ref, () => ({
      getUserShare() {
        const users: User = {
          ...user,
          share: +share,
        };
        return users;
      },
    }));

    const handleOnChangeShare = (value: string) => {
      setShare(value);
    };

    return (
      <div className="flex items-center space-x-2">
        <span className="min-w-[100px]">{user.name}</span>
        <Input
          type="number"
          value={share}
          onChange={(e) => handleOnChangeShare(e.target.value)}
          placeholder="Enter share amount"
          className="flex-1"
        />
        {currency && <span className="ml-2">{currency}</span>}
      </div>
    );
  }
);

UserItem.displayName = "UserItem";

export default UsersShare;
