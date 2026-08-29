import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createStockTransaction,
  getLowStock,
  getStockTransactions,
  type CreateStockTransactionPayload,
} from "@/services/stockTransactions";

export function useStockTransactions(productId?: number) {
  return useQuery({
    queryKey: ["stock-transactions", productId ?? "all"],
    queryFn: () => getStockTransactions(productId),
  });
}

export function useLowStock() {
  return useQuery({
    queryKey: ["stock-alerts"],
    queryFn: getLowStock,
  });
}

export function useCreateStockTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStockTransactionPayload) =>
      createStockTransaction(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["stock-alerts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
