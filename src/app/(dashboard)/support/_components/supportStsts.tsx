"use client";

import React from "react";
import { 
  Ticket, 
  LifeBuoy, 
  CheckCircle2, 
  Archive, 
  ArrowRight,
  History
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TicketStats } from "../page";

export function TicketStatsGrid({ stats }: { stats: TicketStats["data"] }) {
    
  const items = [
    {
      title: "Total Tickets",
      value: stats.totalTickets,
      description: "All time requests",
      icon: Ticket,
      color: "text-indigo-600",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      title: "Active Tickets",
      value: stats.activeTickets,
      description: "Needs attention",
      icon: LifeBuoy,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "Resolved",
      value: stats.resolvedTickets,
      description: "Fixed & Waiting",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      title: "Closed",
      value: stats.closedTickets,
      description: "Archived issues",
      icon: Archive,
      color: "text-slate-600",
      bg: "bg-slate-500/10",
      border: "border-slate-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <Card 
          key={index} 
          className={`relative group overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
        >
          {/* Subtle Accent Line */}
          <div className={`absolute top-0 left-0 w-full h-1 ${item.bg.replace('/10', '')}`} />
          
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl ${item.bg}`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">View All</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black tracking-tighter">
                  {item.value}
                </span>
                {item.value === 0 && (
                  <span className="text-[10px] font-medium text-muted-foreground italic">No new activity</span>
                )}
              </div>
              
              <div className="mt-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/80">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <History className="h-3 w-3 text-muted-foreground/50" />
                  <p className="text-[10px] text-muted-foreground font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative background circle */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${item.bg} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}