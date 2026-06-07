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

import {
  Button
} from "@/components/ui/button";

import UpdateCustomerDialog from "@/components/customers/UpdateCustomerDialog";

type Customer = {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
};

// mock data (replace later with API)
const MOCK_CUSTOMERS: Customer[] = Array.from({ length: 42 }).map((_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@mail.com`,
  status: i % 2 === 0 ? "active" : "inactive",
}));

export default function Customers() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [open, setOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const totalPages = Math.ceil(MOCK_CUSTOMERS.length / pageSize);

  const startIndex = (page - 1) * pageSize;
  const currentData = MOCK_CUSTOMERS.slice(
    startIndex,
    startIndex + pageSize
  );

  function handleDelete(id: number) {
    console.log("Delete customer:", id);
  }

  function handleEdit(customer: any) {
    setSelectedCustomer(customer);
    setForm({
      name: customer.name,
      email: customer.email,
    });
    setOpen(true);
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Customers
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentData.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    {customer.status}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <UpdateCustomerDialog
                        customer={customer}
                        onUpdate={(data) => console.log("Updated in table:", data)}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(customer.id)}
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
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
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