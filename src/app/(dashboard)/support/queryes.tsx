'use client'
import { useQuery } from "@tanstack/react-query";
import { getSupportStats } from "./support.service";

export const useSupportStsts = () => {
    
    

  return useQuery({
    queryKey: ["getSupportStats"],
    queryFn: () => getSupportStats(),
    staleTime: 20000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false, // optional
  });
};