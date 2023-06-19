import React, { useState } from "react";
import { TableCell, Typography } from "@mui/material";

import Table from "@/components/Table";

const Expenses = () => {
  const [data, setData] = useState<any[]>([]);

  const renderItem = (item: any) => {
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
          <Typography>{item.expense}</Typography>
        </TableCell>
      </>
    );
  };

  return (
    <Table
      data={data}
      renderItem={renderItem}
      title={"Expensess Table List"}
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
