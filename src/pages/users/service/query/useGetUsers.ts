import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import type { UsersResponse } from "../types";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: (data) =>
      request.get<UsersResponse>("/user", data).then((res) => res.data),
  });
};
