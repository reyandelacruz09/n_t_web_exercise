import { apiFetch, getApiErrorMessage } from "./api";

export interface ManagedUser {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
  permissions: string[];
}

export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
  role: string;
}

export type UpdateUserPayload = {
  username?: string;
  email?: string;
  role?: string;
};

export async function getUsers(): Promise<ManagedUser[]> {
  const response = await apiFetch("/api/users");

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response, "Failed to fetch users"));
  }

  return response.json();
}

export async function createUser(data: CreateUserPayload) {
  const response = await apiFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(response, "Failed to create user")
    );
  }

  return response.json();
}

export async function updateUser(id: number, data: UpdateUserPayload) {
  const response = await apiFetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(response, "Failed to update user")
    );
  }

  return response.json();
}

export async function deleteUser(id: number) {
  const response = await apiFetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(response, "Failed to delete user")
    );
  }

  return response.json();
}