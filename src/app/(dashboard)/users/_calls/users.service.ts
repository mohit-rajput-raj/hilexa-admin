import { axiosApi } from "@/lib/axios"

export const adminUsers = (params?: any)=>{
    const res = axiosApi.get('/admin/users' , {params})
    return res
}
export const singleUser = (id:string)=>{
    const res = axiosApi.get(`/admin/users/${id}/bookings` )
    return res
}
export const getDestination = ({id , booking}:{
    id:string, booking:string
})=>{
    const res = axiosApi.get(`/admin/users/${id}/bookings/${booking}` )
    return res
}