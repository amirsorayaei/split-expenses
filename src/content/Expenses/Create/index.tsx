import { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Box,
  Chip,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import PageTitle from "@/components/PageTitle";
import { Expense, User } from "@/utils/resources/interfaces";
import UsersShare from "./UsersShare";
import { createExpense, updateExpense } from "@/redux/slices/groupSlice";
import { RootState } from "@/redux/store";
import TextField from "@/components/TextField/TextField";

interface Props {
  groupId: number;
  expenseId?: number;
}

const CreateExpense = ({ groupId, expenseId }: Props) => {
  const selectedGroup = useSelector((state: RootState) =>
    state.group.groups.find((item) => item.id === groupId)
  );

  const selectedExpense = selectedGroup?.expenses?.find(
    (expense) => expense.id === expenseId
  );

  const [name, setName] = useState<string>(selectedExpense?.name || "");
  const [amount, setAmount] = useState<string>(
    selectedExpense?.amount.toString() || ""
  );
  const [payorUserId, setPayorUserId] = useState<string>(
    selectedExpense?.payor.id.toString() || ""
  );
  const [users, setUsers] = useState<User[]>(selectedExpense?.users || []);
  const [detailsSubmitted, setDetailsSubmitted] = useState<boolean>(
    !!expenseId
  );

  const dispatch = useDispatch();

  const router = useRouter();

  const handleOnChangeName = (value: string) => {
    setName(value);
  };

  const handleOnChangeAmount = (value: string) => {
    setAmount(value);
  };

  const handleOnChangePayorUser = (
    event: SelectChangeEvent<typeof payorUserId>
  ) => {
    setPayorUserId(event.target.value);
  };

  const handleOnChangeUsers = (event: SelectChangeEvent<typeof users>) => {
    if (Array.isArray(event.target.value)) {
      setUsers(event.target.value);
    }
  };

  const toggleDetailsSubmission = () => {
    setDetailsSubmitted(!detailsSubmitted);
  };

  const submitAll = (users: User[]) => {
    const user = selectedGroup?.users.find((user) => user.id === +payorUserId);

    if (user) {
      const expense: Expense = {
        ...selectedExpense,
        name,
        amount: +amount,
        payor: user,
        users,
      };

      if (expenseId) {
        /**
         * Update existing expense
         */
        dispatch(updateExpense({ groupId, expense }));
      } else {
        /**
         * Create new expense
         */
        dispatch(
          createExpense({
            groupId,
            expense,
          })
        );
      }

      router.back();
    }
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
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="expense-name-textfield"
                    value={name}
                    onChangeText={handleOnChangeName}
                    label="Name"
                    fullWidth
                    disabled={detailsSubmitted}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    id="expense-amount-textfield"
                    value={amount}
                    onChangeText={handleOnChangeAmount}
                    label="Amount"
                    fullWidth
                    inputMode="numeric"
                    disabled={detailsSubmitted}
                    InputProps={{
                      endAdornment: (
                        <Typography ml={1}>
                          {selectedGroup?.currency}
                        </Typography>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="expense-payor-select-label">
                      {"Payor user"}
                    </InputLabel>
                    <Select
                      id="expense-payor-select"
                      labelId="expense-payor-select-label"
                      value={payorUserId}
                      onChange={handleOnChangePayorUser}
                      label="Payor user"
                      fullWidth
                      disabled={detailsSubmitted}
                    >
                      {selectedGroup?.users.map((user) => {
                        return (
                          <MenuItem key={user.id} value={user.id}>
                            {user.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
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
                          {selected.map((user) => (
                            <Chip key={user.id} label={user.name} />
                          ))}
                        </Box>
                      )}
                    >
                      {selectedGroup?.users.map((user, index) => {
                        return (
                          <MenuItem key={user.id} value={user as any}>
                            {user.name}
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
                <UsersShare
                  users={users}
                  amount={+amount}
                  submit={submitAll}
                  currency={selectedGroup?.currency}
                />
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CreateExpense;
