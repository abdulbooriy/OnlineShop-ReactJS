import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import type { productsList } from "../../types";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: (data) =>
      request.get<productsList>(`/products`, data).then((res) => res.data),
  });
};
