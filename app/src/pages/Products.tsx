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
import UpdateProductDialog from "@/components/products/UpdateProductDialog";


type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const MOCK_PRODUCTS: Product[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Number((Math.random() * 200 + 10).toFixed(2)),
  stock: Math.floor(Math.random() * 100),
}));

export default function Products() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(MOCK_PRODUCTS.length / pageSize);

  const start = (page - 1) * pageSize;
  const data = MOCK_PRODUCTS.slice(start, start + pageSize);

  function handleEdit(id: number) {
    console.log("Edit product:", id);
  }

  function handleDelete(id: number) {
    console.log("Delete product:", id);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <UpdateProductDialog
                        product={product}
                        onUpdate={(data) => console.log("Updated in table:", data)}
                      />

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(product.id)}
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