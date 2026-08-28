import { apiFetch, getApiErrorMessage } from "./api";

export interface AuditLog {
  id: number;
  entity: string;
  action: string;
  entity_id: number | null;
  description: string | null;
  user_id: number | null;
  created_at: string;
}

export async function getAuditLogs(entity?: string): Promise<AuditLog[]> {
  const query = entity ? `?entity=${entity}` : "";
  const response = await apiFetch(`/api/audit-logs${query}`);

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(response, "Failed to fetch audit logs")
    );
  }

  return response.json();
}
