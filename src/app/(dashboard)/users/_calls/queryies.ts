"use client";
import { useQuery } from "@tanstack/react-query";
import { adminUsers, getDestination, singleUser } from "./users.service";
import { usePanelRef } from "react-resizable-panels";

export const useAllUsers = () => {
    const params = usePanelRef()
    

  return useQuery({
    queryKey: ["admin_users"],
    queryFn: () => adminUsers(params),
    staleTime: 20000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false, // optional
  });
};
export const useUser = (id: string) => {
    

  return useQuery({
    queryKey: ["single_user", id],
    queryFn: () => singleUser(id),
    staleTime: 20000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false, // optional
    enabled: !!id,
  });
};

export const useDestination =({
  id , booking
}:{
  id:string , booking:string
}) => {
    

  return useQuery({
    queryKey: ["destination", id, booking],
    queryFn: () => getDestination({
      id , booking
    }),
    staleTime: 20000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false, // optional
    enabled: !!id && !!booking,
  });
};