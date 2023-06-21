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
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "@/components/PageTitle";
import { Expense, UserWithShare } from "@/core/resources/interfaces";
import UsersShare from "./UsersShare";
import { createExpense } from "@/redux/slices/groupSlice";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";

interface Props {
  groupId: number;
}

const CreateExpense = ({ groupId }: Props) => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const [detailsSubmitted, setDetailsSubmitted] = useState<boolean>(false);

  const selectedGroup = useSelector((state: RootState) =>
    state.group.groups.find((item) => item.id === groupId)
  );

  const dispatch = useDispatch();

  const router = useRouter();

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
    const expense: Expense = {
      name,
      amount: +amount,
      usersWithShare,
    };

    dispatch(
      createExpense({
        groupId,
        expense,
      })
    );

    router.back();
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
                      {selectedGroup?.users.map((username, index) => {
                        return (
                          <MenuItem key={index} value={username}>
                            {username}
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
