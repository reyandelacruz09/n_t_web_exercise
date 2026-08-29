import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
  type CreateOrderPayload,
  type UpdateOrderPayload,
} from "@/services/orders";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}

export function useOrder(id: number | null) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id!),
    enabled: id !== null,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderPayload) => createOrder(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateOrderPayload;
    }) => updateOrder(id, data),

    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders", variables.id],
      });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteOrder(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
}
