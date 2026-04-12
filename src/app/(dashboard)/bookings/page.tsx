'use client'
import React from 'react'
import { useBookings, useBookingStats } from './queryes'
import { BookingsDataTable } from './_components/bookingsTable';
import { BookingStatsGrid } from './_components/stats';
import { PageSkeleton } from '@/components/loaders/loader/skeleton';

type Props = {}
export interface BookingSummary {
  _id: string;
  bookingReference: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  paymentStatus: "paid" | "pending" | "refunded";
  createdAt: string;
  userName: string;
  serviceType: string;
  serviceName: string;
  city: string;
  status: "ongoing" | "upcoming" | "completed" | "cancelled";
}

export interface BookingResponse {
  success: boolean;
  data: {
    bookings: BookingSummary[];
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
  };
}
const page = (props: Props) => {
  const {data, isLoading:b} = useBookings()
  const {data:d, isLoading:s} = useBookingStats()
  if(b||s){
    return (
      <PageSkeleton/>
    )
  }
  return (
    <div>
      <BookingStatsGrid stats={d?.data?.data} />
      <BookingsDataTable bookings={data?.data?.data?.bookings || []}/></div>
  )
}

export default page 