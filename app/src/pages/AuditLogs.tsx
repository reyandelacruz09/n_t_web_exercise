import { useState } from "react";
import { History, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  DataTable,
  type DataTableColumn,
} from "@/components/data-table";
import { useAuditLogs } from "@/hooks/useAuditLogs";
import type { AuditLog } from "@/services/auditLogs";

const actionBadge: Record<string, string> = {
  add: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  update: "border-blue-500/30 bg-blue-500/10 text-blue-500",
  delete: "border-red-500/30 bg-red-500/10 text-red-500",
  login: "border-violet-500/30 bg-violet-500/10 text-violet-500",
  register: "border-amber-500/30 bg-amber-500/10 text-amber-500",
};

const entities = [
  { value: "", label: "All entities" },
  { value: "product", label: "Product" },
  { value: "customer", label: "Customer" },
  { value: "order", label: "Order" },
  { value: "user", label: "User" },
];

export default function AuditLogs() {
  const [entity, setEntity] = useState("");
  const [detail, setDetail] = useState<AuditLog | null>(null);
  const { data: logs = [], isPending } = useAuditLogs(entity || undefined);

  const columns: DataTableColumn<AuditLog>[] = [
    {
      id: "created_at",
      header: "Timestamp",
      cellClassName: "whitespace-nowrap text-muted-foreground",
      cell: (log) => new Date(log.created_at).toLocaleString(),
    },
    {
      id: "entity",
      header: "Entity",
      cellClassName: "font-medium capitalize",
      cell: (log) => log.entity,
    },
    {
      id: "action",
      header: "Action",
      cell: (log) => (
        <Badge className={actionBadge[log.action] ?? ""}>
          {log.action}
        </Badge>
      ),
    },
    {
      id: "user_id",
      header: "User",
      cellClassName: "text-right tabular-nums",
      cell: (log) => log.user_id ?? "—",
    },
    {
      id: "description",
      header: "Details",
      cellClassName: "max-w-md text-muted-foreground truncate",
      cell: (log) => log.description ?? "—",
    },
    {
      id: "actions",
      header: "Action",
      headerClassName: "text-right",
      cellClassName: "text-right",
      cell: (log) => (
        <Button size="sm" variant="outline" onClick={() => setDetail(log)}>
          View
        </Button>
      ),
    },
  ];

  if (isPending) {
    return <div className="p-6">Loading audit logs...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <History className="size-7" />
          Audit Logs
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Activity history for products, customers, orders, and users.
        </p>
      </div>

      <DataTable
        data={logs}
        columns={columns}
        getRowKey={(log) => log.id}
        title="Activities"
        entityName="activities"
        searchable
        searchPlaceholder="Search audit logs..."
        getSearchText={(log) =>
          `${log.entity} ${log.action} ${log.description ?? ""}`
        }
        emptyIcon={ShieldAlert}
        emptyTitle="No activities recorded."
        pageSize={10}
        actions={
          <select
            aria-label="Filter by entity"
            className="h-8 w-44 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none"
            value={entity}
            onChange={(e) => setEntity(e.target.value)}
          >
            {entities.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
        }
      />

      <Dialog
        open={detail !== null}
        onOpenChange={(open) => !open && setDetail(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
          </DialogHeader>
          {detail && (
            <div className="space-y-3 text-sm">
              <Row label="Timestamp">
                {new Date(detail.created_at).toLocaleString()}
              </Row>
              <Row label="Entity">
                <span className="capitalize">{detail.entity}</span>
              </Row>
              <Row label="Entity ID">{detail.entity_id ?? "—"}</Row>
              <Row label="Action">
                <Badge className={actionBadge[detail.action] ?? ""}>
                  {detail.action}
                </Badge>
              </Row>
              <Row label="User ID">{detail.user_id ?? "—"}</Row>
              <Row label="Details">{detail.description ?? "—"}</Row>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2">
      <span className="w-24 shrink-0 font-medium text-muted-foreground">
        {label}
      </span>
      <span className="break-words">{children}</span>
    </div>
  );
}
