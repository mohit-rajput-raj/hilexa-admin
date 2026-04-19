import { axiosApi } from "@/lib/axios";

export const propertiesDetails = (id: string) => {
  return axiosApi.get(`/admin/property/${id}`).then((res) => res.data);
};
export const rejectProperty = (id: string) => {
  return axiosApi
    .patch(`/admin/property/${id}/reject`, {
      rejectedSteps: "2",
      reasons: "invalid data",
    })
    .then((res) => res.data);
};
export const approveProperty = (id: string) => {
  return axiosApi
    .patch(`/admin/property/${id}/approve`)
    .then((res) => res.data);
};
