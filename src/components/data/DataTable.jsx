import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";

export function DataTable({
  columns,
  data,
  pageSize = 10,
  searchPlaceholder = "Search…",
  searchKeys,
  className,
  emptyMessage = "No results.",
  rowClassName,
  onRowClick,
}) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const enhancedColumns = useMemo(() => columns, [columns]);

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, value) => {
      const lower = String(value).toLowerCase();
      const keys = searchKeys || Object.keys(row.original);
      return keys.some((k) => String(row.original[k] ?? "").toLowerCase().includes(lower));
    },
    initialState: { pagination: { pageSize } },
  });

  const total = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div className={cn("flex flex-col", className)}>
      {searchKeys !== false && (
        <div className="flex items-center gap-3 mb-3">
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="max-w-xs"
          />
          <span className="ml-auto text-[12px] text-[var(--text-tertiary)] tabular-nums">
            {total.toLocaleString()} {total === 1 ? "result" : "results"}
          </span>
        </div>
      )}

      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden bg-[var(--bg-surface)]">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="bg-[var(--bg-muted)]/60 border-b border-[var(--border)]">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => {
                    const sortDir = header.column.getIsSorted();
                    const canSort = header.column.getCanSort();
                    return (
                      <th
                        key={header.id}
                        className={cn(
                          "px-4 h-10 text-left font-semibold text-[11.5px] uppercase tracking-[0.04em] text-[var(--text-tertiary)] whitespace-nowrap",
                          canSort && "cursor-pointer select-none hover:text-[var(--text-primary)]"
                        )}
                        onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                        style={{ width: header.getSize?.() || "auto" }}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && (
                            <span className="text-[var(--text-muted)]">
                              {sortDir === "asc" ? (
                                <ArrowUp className="size-3" />
                              ) : sortDir === "desc" ? (
                                <ArrowDown className="size-3" />
                              ) : (
                                <ChevronsUpDown className="size-3 opacity-50" />
                              )}
                            </span>
                          )}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    className="px-4 py-12 text-center text-[13px] text-[var(--text-tertiary)]"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "hover:bg-[var(--bg-hover)] transition-colors",
                    onRowClick && "cursor-pointer",
                    typeof rowClassName === "function" ? rowClassName(row.original) : rowClassName
                  )}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 whitespace-nowrap text-[var(--text-secondary)]">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between mt-3">
          <span className="text-[12px] text-[var(--text-tertiary)] tabular-nums">
            Page {pageIndex + 1} of {pageCount}
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="size-3.5" />
              Prev
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
