import { useState, useRef, ChangeEvent } from "react";
import {
  Container,
  Card,
  CardHeader,
  Grid,
  TextField,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Button,
  useTheme,
  Box,
} from "@mui/material";

import PageTitle from "@/components/PageTitle";
import Currencies from "@/core/db/Currencies.json";
import SelectUsers from "./SelectUsers";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { createGroup } from "@/redux/slices/groupSlice";
import { Group, User } from "@/core/resources/interfaces";
import { store } from "@/redux/store";

interface SelectUsersRef {
  getUsers(): User[];
}

const CreateGroup = () => {
  const [name, setName] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");

  const selectUsersRef = useRef<SelectUsersRef>(null);

  const dispatch = useDispatch();

  const router = useRouter();

  const theme = useTheme();

  const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleOnChangeCurrency = (event: SelectChangeEvent<string>) => {
    setCurrency(event.target.value);
  };

  const onClickSubmit = () => {
    /**
     * Groups created with given details
     */
    const group: Group = {
      name,
      currency,
      users: selectUsersRef.current?.getUsers() || [],
    };
    dispatch(createGroup(group));

    /**
     * Latest group known as created group
     */
    const createdGroup = store.getState().group.groups.at(-1);

    /**
     * Navigate to the next page
     */
    router.push(`/groups/${createdGroup?.id}`);
  };

  return (
    <Container maxWidth="lg">
      <PageTitle
        heading="Create a Group"
        subHeading="You can create a group with your information."
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={"Info"} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="group-name-textfield"
                    value={name}
                    onChange={handleOnChangeName}
                    label="Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="group-curreny-select-label">
                      {"Currency"}
                    </InputLabel>
                    <Select
                      id="group-curreny-select"
                      labelId="group-curreny-select-label"
                      value={currency}
                      onChange={handleOnChangeCurrency}
                      label="Currency"
                      fullWidth
                    >
                      {Currencies.data.map((item) => {
                        return (
                          <MenuItem key={item.code} value={item.code}>
                            {item.code} ({item.name})
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={"Users"} />
            <CardContent>
              <SelectUsers ref={selectUsersRef} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box display={"flex"} mt={5}>
        <Button
          fullWidth
          variant="contained"
          sx={{ maxWidth: theme.breakpoints.values.sm / 2, m: "auto" }}
          onClick={onClickSubmit}
        >
          {"Submit"}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateGroup;
