import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import UpdateOrderDialog from "@/components/orders/UpdateOrderDialog";
import CreateOrderDialog from "@/components/orders/CreateOrderDialog";

type Order = {
  id: number;
  customer: string;
  total: number;
  status: "pending" | "processing" | "completed";
};

const MOCK_ORDERS: Order[] = Array.from({ length: 35 }).map((_, i) => ({
  id: i + 1,
  customer: `Customer ${i + 1}`,
  total: Number((Math.random() * 500 + 50).toFixed(2)),
  status:
    i % 3 === 0
      ? "pending"
      : i % 3 === 1
      ? "processing"
      : "completed",
}));

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [page, setPage] = useState(1);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));

  const start = (page - 1) * pageSize;
  const data = orders.slice(start, start + pageSize);

  function handleCreate(newOrder: Order) {
    setOrders((currentOrders) => [newOrder, ...currentOrders]);
    setPage(1);
  }

  function handleUpdate(updatedOrder: Order) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  }

  function handleDelete(id: number) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!shouldDelete) return;

    setOrders((currentOrders) => {
      const updatedOrders = currentOrders.filter(
        (order) => order.id !== id
      );

      // If the last item on the current page was deleted,
      // move back one page if needed.
      const updatedTotalPages = Math.max(
        1,
        Math.ceil(updatedOrders.length / pageSize)
      );

      if (page > updatedTotalPages) {
        setPage(updatedTotalPages);
      }

      return updatedOrders;
    });
  }

  return (
    <div className="p-6">
      {/* Page title + Add Order button */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>

        <CreateOrderDialog onCreate={handleCreate} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell className="capitalize">
                      {order.status}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <UpdateOrderDialog
                          order={order}
                          onUpdate={handleUpdate}
                        />

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(order.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((currentPage) => currentPage - 1)}
              >
                Prev
              </Button>

              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((currentPage) => currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}