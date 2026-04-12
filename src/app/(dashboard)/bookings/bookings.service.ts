import { axiosApi } from "@/lib/axios"

export const getBookings=async()=>{
    const res = await axiosApi.get("/admin/bookings");
    return res
}
export const getBookingsStats=async()=>{
    const res = await axiosApi.get("/admin/bookings/stats");
    return res
}
export const getBookingById=async(id:string)=>{
    const res = await axiosApi.get(`/admin/bookings/${id}`);
    return res
}