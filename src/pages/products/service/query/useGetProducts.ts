import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: (data) => request.get(`/products`, data).then((res) => res.data),
  });
};
