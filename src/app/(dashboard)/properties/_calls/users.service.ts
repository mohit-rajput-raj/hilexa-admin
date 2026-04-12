import { axiosApi } from "@/lib/axios"

export const property = ()=>{
    const res = axiosApi.get('/admin/property')
    return res
}
