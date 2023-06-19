import React, { useState, ChangeEvent } from "react";
import { Grid, TextField, Button, Chip, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const SelectUsers = () => {
  const [username, setUsername] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);

  const handleOnChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const addUser = () => {
    setUsername("");
    setUsers((previousUsers) => [...previousUsers, username]);
  };

  const keyPress = (event: any) => {
    if (event.keyCode == 13) {
      addUser();
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
          onChange={handleOnChangeUsername}
          label={"User Name"}
          onKeyDown={keyPress}
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
              <Chip label={item} onDelete={() => onDeleteUser(index)} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SelectUsers;
