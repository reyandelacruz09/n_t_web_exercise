import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Customer } from "@/services/customers";

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

type DetailRow = {
  label: string;
  value?: ReactNode;
};

function Detail({ rows }: { rows: DetailRow[] }) {
  return (
    <div className="divide-y rounded-lg border">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[7rem_1fr] items-center gap-2 px-3 py-2.5"
        >
          <span className="text-sm text-muted-foreground">{row.label}</span>
          <span className="text-sm font-medium break-all">
            {row.value ?? "—"}
          </span>
        </div>
      ))}
    </div>
  );
}

type Props = {
  customer: Customer;
};

export default function CustomerDetailDialog({ customer }: Props) {
  const [open, setOpen] = useState(false);

  const fullName = `${customer.first_name} ${customer.last_name}`;

  const rows: DetailRow[] = [
    {
      label: "Customer ID",
      value: `#${customer.id}`,
    },
    {
      label: "First Name",
      value: customer.first_name,
    },
    {
      label: "Last Name",
      value: customer.last_name,
    },
    {
      label: "Email",
      value: (
        <a
          className="hover:underline"
          href={`mailto:${customer.email}`}
        >
          {customer.email}
        </a>
      ),
    },
    {
      label: "Phone",
      value: (
        <a
          className="hover:underline"
          href={`tel:${customer.phone}`}
        >
          {customer.phone}
        </a>
      ),
    },
    ...(customer.address
      ? [{ label: "Address", value: customer.address }]
      : []),
    ...(customer.created_at
      ? [
          {
            label: "Created",
            value: new Date(customer.created_at).toLocaleDateString(),
          },
        ]
      : []),
  ];

  return (
    <>
      <button
        type="button"
        className="text-left font-medium underline-offset-2 hover:underline"
        onClick={() => setOpen(true)}
      >
        {fullName}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex size-12 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-semibold text-indigo-500">
              {getInitials(customer.first_name, customer.last_name)}
            </div>
            <DialogTitle>{fullName}</DialogTitle>
            <DialogDescription>Customer details</DialogDescription>
          </DialogHeader>

          <Detail rows={rows} />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
