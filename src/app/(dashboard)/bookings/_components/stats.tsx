"use client";
export interface BookingStats {
  success: boolean;
  data: {
    totalBookings: number;
    todaysBookings: number;
    pendingPayments: number;
    cancellations: number;
  };
}

import React from "react";
import { 
   
  CalendarCheck, 
  CreditCard, 
  XCircle, 
  TrendingUp, 
  ArrowUpRight 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function BookingStatsGrid({ stats }: { stats: BookingStats["data"] }) {
  const items = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      description: "Lifetime reservations",
      icon: CalendarCheck,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      title: "Today's Bookings",
      value: stats.todaysBookings,
      description: "New entries today",
      icon: CalendarCheck,
      color: "text-purple-600",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      title: "Pending Payments",
      value: stats.pendingPayments,
      description: "Awaiting confirmation",
      icon: CreditCard,
      color: "text-orange-600",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
    {
      title: "Cancellations",
      value: stats.cancellations,
      description: "Refunded/Voided",
      icon: XCircle,
      color: "text-rose-600",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {items.map((item, index) => (
        <Card key={index} className={`overflow-hidden border-b-4 ${item.border} shadow-sm group hover:shadow-md transition-all duration-300`}>
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-xl ${item.bg}`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                <ArrowUpRight className="h-3 w-3" />
                12%
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <h3 className="text-2xl font-black tracking-tight tracking-tight">
                {item.value.toLocaleString()}
              </h3>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {item.title}
                </p>
                <p className="text-[10px] text-muted-foreground/70 font-medium">
                  {item.description}
                </p>
              </div>
            </div>
            
            {/* Subtle background decoration */}
            <div className={`absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}>
               <item.icon size={80} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}