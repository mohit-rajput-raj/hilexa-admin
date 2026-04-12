
'use client'
import React from 'react'
import { useSupportStsts } from './queryes'
import { TicketStatsGrid } from './_components/supportStsts';
import { PageSkeleton } from '@/components/loaders/loader/skeleton';
export interface TicketStats {
  success: boolean;
  data: {
    totalTickets: number;
    activeTickets: number;
    resolvedTickets: number;
    closedTickets: number;
  };
}
type Props = {}

const page = (props: Props) => {
  const {data, isLoading} = useSupportStsts()
  if(isLoading){
    return (
      <PageSkeleton/>
    )
  }
  return (
    <div><TicketStatsGrid stats={data?.data?.data}/></div>
  )
}

export default page 