import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/src/utils/resources/interfaces";
import Snack from "@/src/components/Snack/Snack";
import TextField from "@/src/components/TextField/TextField";

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
  onShareChange?: (share: number) => void;
}

interface UserItemRef {
  getUserShare(): User;
  setShare(share: number): void;
}

const UsersShare = ({ users, amount, submit, currency }: Props) => {
  const usersShare = useRef<UserItemRef[]>([]);

  // Recalculate shares when amount changes
  useEffect(() => {
    const equalShare = amount / users.length;
    usersShare.current.forEach((ref) => {
      if (ref) {
        const newShare = equalShare;
        ref.setShare(newShare);
      }
    });
  }, [amount, users]);

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
          const initialShare = user.share || amount / users.length;

          return (
            <UserItem
              ref={(ref: UserItemRef) => {
                usersShare.current[index] = ref;
              }}
              key={user.id}
              user={user}
              index={index}
              userShare={initialShare}
              currency={currency}
            />
          );
        })}
      </div>
      <div className="flex justify-center pt-4">
        <Button className="w-full max-w-sm" onClick={onClickSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

const UserItem = forwardRef(
  ({ user, userShare, currency }: UserItemProps, ref) => {
    const [share, setShare] = useState<string>("");

    useEffect(() => {
      setShare(userShare?.toString());
    }, [userShare]);

    useImperativeHandle(ref, () => ({
      getUserShare() {
        const users: User = {
          ...user,
          share: +share,
        };
        return users;
      },
      setShare(newShare: number) {
        setShare(newShare.toString());
      },
    }));

    const handleOnChangeShare = (value: string) => {
      setShare(value);
    };

    return (
      <div className="flex items-center space-x-2">
        <span className="min-w-[100px]">{user.name}</span>
        <TextField
          id="share"
          type="number"
          value={share}
          onChangeText={handleOnChangeShare}
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
