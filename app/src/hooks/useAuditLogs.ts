import { useQuery } from "@tanstack/react-query";

import { getAuditLogs } from "@/services/auditLogs";

export function useAuditLogs(entity?: string) {
  return useQuery({
    queryKey: ["audit-logs", entity ?? "all"],
    queryFn: () => getAuditLogs(entity),
  });
}
