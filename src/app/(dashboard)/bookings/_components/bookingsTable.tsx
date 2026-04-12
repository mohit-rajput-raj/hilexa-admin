"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Search, MapPin, Calendar, User, MoreHorizontal, ArrowRight } from "lucide-react";

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
import { BookingSummary } from "../page";
import { useRouter } from "next/navigation";
import { RouterPush } from "@/components/RouterPush";

// Formatting Helpers
const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", {
  day: "2-digit", month: "short", year: "numeric"
});

const formatCurrency = (amt: number) => 
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amt);

// --- Column Definitions ---
export const columns: ColumnDef<BookingSummary>[] = [
  {
    accessorKey: "bookingReference",
    header: "Ref / User",
    cell: ({ row }) => {
      const router = useRouter()
      return (
         <div className="flex flex-col cursor-pointer" onClick={()=>{
          RouterPush(router , `/bookings/${row.original._id}`)
         }} >
        <span className="font-mono text-[11px] font-bold text-primary leading-none mb-1">
          {row.original.bookingReference}
        </span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium uppercase tracking-tight">
          <User className="h-3 w-3" />
          {row.original.userName}
        </div>
      </div>
      )
    },
  },
  {
    id: "service",
    header: "Service & City",
    accessorFn: (row) => `${row.serviceName} ${row.city}`,
    cell: ({ row }) => (
      <div className="flex flex-col max-w-[200px]">
        <span className="font-bold text-sm truncate leading-tight mb-1">
          {row.original.serviceName}
        </span>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          {row.original.city}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "checkIn",
    header: "Duration",
    cell: ({ row }) => (
      <div className="text-[11px] leading-tight space-y-0.5">
        <div className="flex items-center gap-1 text-muted-foreground italic">
          {formatDate(row.original.checkIn)}
          <ArrowRight className="h-2.5 w-2.5" />
          {formatDate(row.original.checkOut)}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-black text-sm">{formatCurrency(row.getValue("totalAmount"))}</span>
        <span className={`text-[9px] font-bold uppercase tracking-widest ${
          row.original.paymentStatus === 'paid' ? 'text-emerald-500' : 'text-orange-500'
        }`}>
          {row.original.paymentStatus}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Booking Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variants: Record<string, string> = {
        ongoing: "bg-blue-500/10 text-blue-600 border-blue-200",
        upcoming: "bg-purple-500/10 text-purple-600 border-purple-200",
        completed: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
        cancelled: "bg-rose-500/10 text-rose-600 border-rose-200",
      };
      return (
        <Badge variant="outline" className={`font-bold text-[10px] uppercase px-2 py-0.5 ${variants[status]}`}>
          {status}
        </Badge>
      );
    },
  },
  
];

export function BookingsDataTable({ bookings }: { bookings: BookingSummary[] }) {
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: { globalFilter },
  });

  return (
    <div className="w-full  overflow-hidden">
      <div className="p-5 border-b border-border bg-muted/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight uppercase italic text-primary">Booking Logs</h1>
          <p className="text-xs text-muted-foreground font-medium">Track reservations across all property services</p>
        </div>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Reference, Hotel or City..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 w-full sm:min-w-[320px] bg-background h-10 rounded-xl"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-12 text-[11px] uppercase font-black tracking-[0.1em] text-muted-foreground/80 px-6">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50 border-border group transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 px-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-40 text-center text-muted-foreground italic">
                  No records found in database.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Total Bookings: {bookings.length}</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Prev</Button>
          <Button variant="ghost" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
        </div>
      </div>
    </div>
  );
}