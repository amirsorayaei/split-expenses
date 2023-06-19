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

const UsersShare = ({ users, amount, submit }: Props) => {
  const usersShare = useRef<any[]>([]);

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
        {users.map((item, index) => {
          const share = amount / users.length;
          return (
            <UserItem
              ref={(ref) => (usersShare.current[index] = ref)}
              key={index}
              item={item}
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
  (
    {
      item,
      userShare,
      index,
    }: {
      item: string;
      userShare: number;
      index: number;
    },
    ref
  ) => {
    const [share, setShare] = useState<string>(userShare.toString());

    useImperativeHandle(ref, () => ({
      getUserShare() {
        const userWithShare: UserWithShare = {
          username: item,
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
            startAdornment: <Typography mr={1.5}>{item}</Typography>,
            endAdornment: <Typography ml={1.5}>{"USD"}</Typography>,
          }}
        />
      </Grid>
    );
  }
);

UserItem.displayName = "UserItem";

export default UsersShare;
