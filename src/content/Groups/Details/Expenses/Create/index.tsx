import { useState, ChangeEvent } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Box,
  Chip,
  useTheme,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import PageTitle from "@/components/PageTitle";
import UsersData from "@/core/db/Users.json";
import { User, UserWithShare } from "@/core/resources/interfaces";
import UsersShare from "./UsersShare";

const CreateExpense = () => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const [detailsSubmitted, setDetailsSubmitted] = useState<boolean>(false);

  const theme = useTheme();

  const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleOnChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleOnChangeUsers = (event: SelectChangeEvent<typeof users>) => {
    if (Array.isArray(event.target.value)) {
      setUsers(event.target.value);
    }
  };

  const toggleDetailsSubmission = () => {
    setDetailsSubmitted(!detailsSubmitted);
  };

  const submitAll = (usersWithShare: UserWithShare[]) => {
    /**
     * Submit all the informations to the redux
     * Name - Amount - Users with share
     */
  };

  return (
    <Container maxWidth={"lg"}>
      <PageTitle
        heading="Create Expense"
        subHeading="You can create a expense with your information."
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={"Info"} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="expense-name-textfield"
                    value={name}
                    onChange={handleOnChangeName}
                    label="Name"
                    fullWidth
                    disabled={detailsSubmitted}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="expense-amount-textfield"
                    value={amount}
                    onChange={handleOnChangeAmount}
                    label="Amount"
                    fullWidth
                    type="number"
                    disabled={detailsSubmitted}
                    InputProps={{
                      endAdornment: <Typography ml={1}>{"USD"}</Typography>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="expense-users-select-label">
                      {"Users"}
                    </InputLabel>
                    <Select
                      id="expense-users-select"
                      labelId="expense-users-select-label"
                      multiple
                      value={users}
                      onChange={handleOnChangeUsers}
                      label="Users"
                      fullWidth
                      disabled={detailsSubmitted}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {UsersData.data.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.name}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {!detailsSubmitted && (
                <Button
                  onClick={toggleDetailsSubmission}
                  sx={{ mt: 2 }}
                  variant={"contained"}
                >
                  {"Submit"}
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
        {detailsSubmitted && (
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={"Users Share"}
                action={
                  <Button
                    variant={"contained"}
                    sx={{ mr: 1 }}
                    onClick={toggleDetailsSubmission}
                  >
                    {"Back"}
                  </Button>
                }
              />
              <CardContent>
                <UsersShare users={users} amount={+amount} submit={submitAll} />
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CreateExpense;
