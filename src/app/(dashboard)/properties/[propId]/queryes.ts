"use client";
import { useQuery } from "@tanstack/react-query";
import { propertiesDetails } from "./dash.service";

export const usePropertyDetails = (id: string) => {
  return useQuery({
    queryKey: ["admin_property_details", id],
    queryFn: () => propertiesDetails(id),
    staleTime: 200000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false, // optional
  });
};
