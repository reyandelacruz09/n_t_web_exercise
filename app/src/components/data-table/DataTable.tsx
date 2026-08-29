import { useState, type Key, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableEmpty from "./DataTableEmpty";
import DataTablePagination from "./DataTablePagination";
import DataTableSearch from "./DataTableSearch";

export type DataTableColumn<T> = {
  id: string;
  header: ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  cell: (row: T) => ReactNode;
};

type Props<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowKey: (row: T) => Key;

  title?: string;
  entityName?: string;
  actions?: ReactNode;

  searchable?: boolean;
  searchPlaceholder?: string;
  getSearchText?: (row: T) => string;

  emptyIcon?: LucideIcon;
  emptyTitle?: string;
  emptyDescription?: string;

  pageSize?: number;
};

export default function DataTable<T>({
  data,
  columns,
  getRowKey,

  title,
  entityName,
  actions,

  searchable = false,
  searchPlaceholder,
  getSearchText,

  emptyIcon,
  emptyTitle = "No data found.",
  emptyDescription,

  pageSize = 10,
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const query = search.trim().toLowerCase();

  const filtered = getSearchText
    ? data.filter((row) =>
        getSearchText(row).toLowerCase().includes(query)
      )
    : data;

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const currentRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <Card>
      {(title || entityName || searchable || actions) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}

          {entityName && (
            <CardDescription>
              {filtered.length} {entityName}
            </CardDescription>
          )}

          {(searchable || actions) && (
            <CardAction>
              <div className="flex items-center gap-2">
                {searchable && (
                  <DataTableSearch
                    value={search}
                    onChange={handleSearchChange}
                    placeholder={searchPlaceholder}
                    className="w-56"
                  />
                )}

                {actions}
              </div>
            </CardAction>
          )}
        </CardHeader>
      )}

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={column.headerClassName}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentRows.length === 0 ? (
              <DataTableEmpty
                colSpan={columns.length}
                icon={emptyIcon}
                title={emptyTitle}
                description={emptyDescription}
              />
            ) : (
              currentRows.map((row) => (
                <TableRow key={getRowKey(row)}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      className={column.cellClassName}
                    >
                      {column.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <DataTablePagination
          page={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filtered.length}
          onPageChange={setPage}
        />
      </CardContent>
    </Card>
  );
}
