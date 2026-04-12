import { axiosApi } from "@/lib/axios"

export const getSupportStats = ()=>{
    return axiosApi.get(`admin/supports/stats`);
}