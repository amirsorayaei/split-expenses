import { FC, ReactNode } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SearchBox from "../SearchBox";
import EmptyContent from "../EmptyContent";

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
  emptyMessage: string;
  onClickItem?(item: unknown, index: number): void;
}

const CustomTable: FC<TableProps> = ({
  data,
  renderItem,
  tableColumns,
  action,
  title,
  searchable = false,
  searchPlaceholder,
  emptyMessage,
  onClickItem,
}) => {
  const onSearch = () => {};

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-2xl font-semibold">{title}</h3>
        {action}
      </CardHeader>
      {searchable && (
        <div className="px-6 py-4">
          <SearchBox onSearch={onSearch} placeholder={searchPlaceholder} />
        </div>
      )}
      {Array.isArray(data) && data.length > 0 ? (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {tableColumns.map((item, index) => (
                  <TableHead
                    key={index}
                    className={item.align ? `text-${item.align}` : ""}
                  >
                    {item.text}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item: unknown, index: number) => (
                <TableRow
                  key={index}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onClickItem?.(item, index)}
                >
                  {renderItem(item, index)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      ) : (
        <EmptyContent message={emptyMessage} />
      )}
    </Card>
  );
};

export default CustomTable;
