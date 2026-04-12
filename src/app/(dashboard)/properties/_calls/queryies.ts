"use client";
import { useQuery } from "@tanstack/react-query";
import { usePanelRef } from "react-resizable-panels";
import { property } from "./users.service";

export const useProperty = () => {
    
    

  return useQuery({
    queryKey: ["property"],
    queryFn: () => property(),
    staleTime: 20000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false, // optional
  });
};
