import React, {
  useState,
  ChangeEvent,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import { UserWithShare } from "@/core/resources/interfaces";

interface Props {
  users: string[];
  amount: number;
  submit(usersWithShare: UserWithShare[]): void;
}

interface UserItemProps {
  username: string;
  index: number;
  userShare: number;
}

interface UserItemRef {
  getUserShare(): UserWithShare;
}

const UsersShare = ({ users, amount, submit }: Props) => {
  const usersShare = useRef<UserItemRef[]>([]);

  const onClickSubmit = () => {
    const usersWithShare: UserWithShare[] = usersShare.current.map((item) =>
      item.getUserShare()
    );

    const sharesSum = usersWithShare.reduce((a, b) => {
      return a + b.share;
    }, 0);

    if (sharesSum !== amount) {
      alert("Not Equal!");
      return;
    }

    submit(usersWithShare);
  };

  return (
    <>
      <Grid container spacing={2}>
        {users.map((username, index) => {
          const share = amount / users.length;
          return (
            <UserItem
              ref={(ref: UserItemRef) => (usersShare.current[index] = ref)}
              key={index}
              username={username}
              index={index}
              userShare={share}
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
  ({ username, userShare, index }: UserItemProps, ref) => {
    const [share, setShare] = useState<string>(userShare.toString());

    useImperativeHandle(ref, () => ({
      getUserShare() {
        const userWithShare: UserWithShare = {
          username,
          share: +share,
        };
        return userWithShare;
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
          type="number"
          InputProps={{
            startAdornment: <Typography mr={1.5}>{username}</Typography>,
            endAdornment: <Typography ml={1.5}>{"USD"}</Typography>,
          }}
        />
      </Grid>
    );
  }
);

UserItem.displayName = "UserItem";

export default UsersShare;
