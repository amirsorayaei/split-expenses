import React, { useState } from "react";
import { TableCell, Typography } from "@mui/material";

import Table from "@/components/Table";
import { Expense } from "@/core/resources/interfaces";

const Expenses = () => {
  const [data, setData] = useState<Expense[]>([]);

  const renderItem = (item: Expense) => {
    return (
      <>
        <TableCell>
          <Typography>{item.id}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {item.usersWithShare?.length + " " + "people"}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.amount}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{item.createdAt}</Typography>
        </TableCell>
      </>
    );
  };

  return (
    <Table
      data={data}
      renderItem={renderItem}
      title={"Expenses Table List"}
      tableColumns={[
        { text: "ID" },
        { text: "Name" },
        { text: "Users count" },
        { text: "Expense amount" },
        { text: "Created at" },
      ]}
    />
  );
};

export default Expenses;
