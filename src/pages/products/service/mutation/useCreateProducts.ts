import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import toast from "react-hot-toast";
import type { CreateProductDto } from "../../types";

export const useCreateProducts = () => {
  return useMutation({
    mutationFn: (data: CreateProductDto) =>
      request
        .post("/products", data)
        .then((res) => res.data)
        .catch(() => toast.error("An error occured while fecthing data")),
  });
};
