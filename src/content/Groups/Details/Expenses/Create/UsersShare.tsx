import React, {
  useState,
  ChangeEvent,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Grid, Typography, Button } from "@mui/material";

import { User } from "@/core/resources/interfaces";
import Snack from "@/components/Snack/Snack";
import TextField from "@/components/TextField/TextField";

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
    <>
      <Grid container spacing={2}>
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
      </Grid>
      <Button onClick={onClickSubmit} sx={{ mt: 2 }} variant={"contained"}>
        {"Submit"}
      </Button>
    </>
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

    const handleOnChangeShare = (event: ChangeEvent<HTMLInputElement>) => {
      setShare(event.target.value);
    };

    return (
      <Grid key={index} item xs={12} sm={6}>
        <TextField
          id={`user-share-${index}-textfield`}
          value={share}
          onChange={handleOnChangeShare}
          label="Share"
          fullWidth
          inputMode="numeric"
          InputProps={{
            startAdornment: <Typography mr={1.5}>{user.name}</Typography>,
            endAdornment: <Typography ml={1.5}>{currency}</Typography>,
          }}
        />
      </Grid>
    );
  }
);

UserItem.displayName = "UserItem";

export default UsersShare;
