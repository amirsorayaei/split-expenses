import React, {
  useState,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Grid, Button, Chip, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { User } from "@/utils/resources/interfaces";
import { generateUniqueID } from "@/utils/resources/Functions";
import TextField from "@/components/TextField/TextField";

const SelectUsers = forwardRef((_props, ref) => {
  const [username, setUsername] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  useImperativeHandle(ref, () => ({
    getUsers() {
      return users as User[];
    },
  }));

  const handleOnChangeUser = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const addUser = () => {
    /**
     * Adding users is allowed when the input is filled
     */
    if (username.length > 0) {
      setUsername("");
      setUsers((previousUsers) => [
        ...previousUsers,
        { id: generateUniqueID(users), name: username },
      ]);
    }
  };

  const onDeleteUser = (index: number) => {
    const filteredUsers = users.filter((el, i) => i !== index);
    setUsers(filteredUsers);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          id="user-name-textfield"
          value={username}
          onChange={handleOnChangeUser}
          label={"User Name"}
          handleSubmit={addUser}
          fullWidth
          helperText={
            <Typography variant="caption">
              {"Type user name and press Enter to add user."}
            </Typography>
          }
          InputProps={{
            endAdornment: (
              <Button variant="text" color="secondary" onClick={addUser}>
                <CheckIcon />
              </Button>
            ),
          }}
        />
        <Grid container pt={2} spacing={1}>
          {users.map((item, index) => (
            <Grid key={index} item>
              <Chip label={item.name} onDelete={() => onDeleteUser(index)} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
});

SelectUsers.displayName = "SelectUsers";

export default SelectUsers;
