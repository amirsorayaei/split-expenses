import React, { useState } from "react";
import { TableRow, TableCell, Typography } from "@mui/material";

import Table from "@/components/Table";
import { Group } from "@/core/resources/interfaces";
import GroupsData from "@/core/db/Groups.json";

const GroupsTable = () => {
  const [data, setData] = useState<Group[]>(GroupsData.data);

  const renderItem = (item: Group) => {
    return (
      <>
        <TableCell>
          <Typography>{item.id}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.users?.length + " " + "people"}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.totalExpense}</Typography>
        </TableCell>
      </>
    );
  };

  return (
    <Table
      data={data}
      renderItem={renderItem}
      title={"Groups Table List"}
      tableColumns={[
        { text: "ID" },
        { text: "Name" },
        { text: "Users count" },
        { text: "Expense" },
      ]}
    />
  );
};

export default GroupsTable;
