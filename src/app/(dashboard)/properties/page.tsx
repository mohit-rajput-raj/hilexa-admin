'use client'
import React from 'react'
import { useProperty } from './_calls/queryies'
import { PropertiesDataTable } from './_comp/propertytable';
import { PageSkeleton } from '@/components/loaders/loader/skeleton';

type Props = {}
export interface Property {
  _id: string;
  status: "approved" | "pending" | "rejected";
  submittedAt?: string; // Optional because some entries don't have it
  propertyName: string;
  city: string;
  vendorName: string;
  rank: string;
  canAssignRank: boolean;
}

export interface PropertyResponse {
  success: boolean;
  data: {
    properties: Property[];
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
  };
}
const page = (props: Props) => {
  const {data , isLoading} = useProperty()
  if(isLoading){
    return <PageSkeleton/>
  }
  return (
    <div>
      <PropertiesDataTable properties={data?.data?.data?.properties || []}/>
    </div>
  )
}

export default page 