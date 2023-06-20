import { FC, ReactNode } from "react";
import {
  Card,
  CardHeader,
  Box,
  Divider,
  TableContainer,
  Table as MaterialTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import SearchBox from "../SearchBox";

interface TableProps {
  title: string;
  action?: ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  tableColumns: {
    text: string;
    align?: "inherit" | "left" | "center" | "right" | "justify";
  }[];
  data: unknown[];
  renderItem(item: unknown, index: number): ReactNode | ReactNode[];
}

const Table: FC<TableProps> = ({
  data,
  renderItem,
  tableColumns,
  action,
  title,
  searchable = false,
  searchPlaceholder,
}) => {
  const onSearch = () => {};

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: "h3" }}
        action={action}
      />
      {searchable && (
        <Box paddingY={2} paddingX={1}>
          <SearchBox onSearch={onSearch} placeholder={searchPlaceholder} />
        </Box>
      )}
      <TableContainer>
        <MaterialTable>
          <TableHead>
            <TableRow>
              {tableColumns.map((item, index) => {
                return (
                  <TableCell align={item.align || "left"} key={index}>
                    {item.text}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item: unknown, index: number) => {
              return (
                <TableRow hover key={index} sx={{ cursor: "pointer" }}>
                  {renderItem(item, index)}
                </TableRow>
              );
            })}
          </TableBody>
        </MaterialTable>
      </TableContainer>
      {/* <CardActions sx={{ p: 2 }}>
        <Typography>{"Card Footer"}</Typography>
      </CardActions> */}
    </Card>
  );
};

export default Table;
