import { apiFetch, getApiErrorMessage } from "./api";

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address?: string | null;
  created_at?: string;
}

export type CreateCustomerPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

export type UpdateCustomerPayload = Partial<CreateCustomerPayload>;

export async function getCustomers(): Promise<Customer[]> {
  const response = await apiFetch("/api/customers");

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(response, "Failed to fetch customers")
    );
  }

  return response.json();
}

export async function createCustomer(data: CreateCustomerPayload) {
  const response = await apiFetch("/api/customers", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(response, "Failed to create customer")
    );
  }

  return response.json();
}

export async function updateCustomer(
  id: number,
  data: UpdateCustomerPayload
) {
  const response = await apiFetch(`/api/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(response, "Failed to update customer")
    );
  }

  return response.json();
}
