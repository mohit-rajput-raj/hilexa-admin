
"use client";
import { useQuery } from "@tanstack/react-query";
import { usePanelRef } from "react-resizable-panels";
import { getBookingById, getBookings, getBookingsStats } from "./bookings.service";
// import { property } from "./users.service";

export const useBookings = () => {
    
    

  return useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookings(),
    staleTime: 20000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false, // optional
  });
};
export const useBookingStats = () => {

  return useQuery({
    queryKey: ["getBookingsStats"],
    queryFn: () => getBookingsStats(),
    staleTime: 20000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false, // optional
  });
};
export const useBookingById = (id:string) => {

  return useQuery({
    queryKey: ["getBookingById", id],
    queryFn: () => getBookingById(id),
    staleTime: 20000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false, // optional
    enabled:!!id
  });
};