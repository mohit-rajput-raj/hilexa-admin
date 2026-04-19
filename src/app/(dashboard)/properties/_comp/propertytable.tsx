'use client'

import * as React from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Search, MapPin, Building2, Star, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Property } from "../page";
import { RouterPush } from "@/components/RouterPush";
import { useRouter } from "next/navigation";

// Helper for date
const formatDate = (iso?: string) => {
  if (!iso) return "N/A";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// --- Column Definitions ---
export const columns: ColumnDef<Property>[] = [
  {
    id: "property",
    header: "Property Name",
    accessorFn: (row) => `${row.propertyName} ${row.city}`,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Building2 className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm leading-none mb-1">
            {row.original.propertyName}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {row.original.city}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        {formatDate(row.getValue("submittedAt"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant="outline"
          className={`capitalize text-[10px] font-bold ${status === "approved"
            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
            : "bg-orange-500/10 text-orange-600 border-orange-500/20"
            }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => {
      const rank = row.getValue("rank") as string;
      const canAssign = row.original.canAssignRank;
      return (
        <div className="flex items-center gap-2">
          <Badge className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-black h-7 w-7 flex items-center justify-center p-0 rounded-md">
            {rank}
          </Badge>
          {!canAssign && (
            <span className="text-[9px] text-muted-foreground font-medium italic">Fixed</span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Manage",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <Button variant="ghost" size="sm" className="h-8 text-[11px] font-bold" onClick={() => {
          RouterPush(router, `/properties/${row.original._id}`)
        }}>
          View Details
        </Button>
      )
    },
  },
];

export function PropertiesDataTable({ properties }: { properties: Property[] }) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: properties,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { columnFilters },
  });

  return (
    <div className="w-full  overflow-hidden">
      {/* Search Header */}
      <div className="p-4 bg-muted/20 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Property Directory</h2>
          <p className="text-xs text-muted-foreground">Manage and rank your registered property listings</p>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search property or city..."
            value={(table.getColumn("property")?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn("property")?.setFilterValue(e.target.value)}
            className="pl-9 w-full sm:w-[300px] bg-background border-input h-9"
          />
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-10 text-[10px] uppercase font-black text-muted-foreground tracking-widest">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/40 transition-colors border-border">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 px-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground text-sm italic">
                  No properties found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer info */}
      <div className="p-4 border-t border-border bg-muted/10 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
        <div>Showing {table.getRowModel().rows.length} properties</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-7 px-2" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Prev</Button>
          <Button variant="outline" size="sm" className="h-7 px-2" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next</Button>
        </div>
      </div>
    </div>
  );
}