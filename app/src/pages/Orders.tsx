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

function handleDelete(id: number) {
  console.log("Delete order:", id);
}

export default function Orders() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(MOCK_ORDERS.length / pageSize);

  const start = (page - 1) * pageSize;
  const data = MOCK_ORDERS.slice(start, start + pageSize);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

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
              {data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>${order.total}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                  <div className="flex gap-2">
                    <UpdateOrderDialog
                      order={order}
                      onUpdate={(data) => console.log("Updated in table:", data)}
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
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </Button>

              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
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