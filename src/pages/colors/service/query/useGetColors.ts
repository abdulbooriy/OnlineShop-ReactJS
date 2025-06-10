import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import type { colorList } from "../../types";

export const useGetColors = () => {
  return useQuery({
    queryKey: ["colors"],
    queryFn: (data) =>
      request.get<colorList>("/color", data).then((res) => res.data),
  });
};
