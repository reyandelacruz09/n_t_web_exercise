import { apiFetch } from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  username?: string;
  email: string;
  role?: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export async function loginUser(
  payload: LoginPayload
): Promise<LoginResponse> {
  const response = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function getMe(): Promise<User> {
  const response = await apiFetch("/auth/me");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Not authenticated");
  }

  return data.user;
}

export async function logoutUser(): Promise<void> {
  await apiFetch("/auth/logout", {
    method: "POST",
  });
}

export interface UpdateProfilePayload {
  username?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
}

export interface UpdateProfileResponse {
  message: string;
  user: User;
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
  const response = await apiFetch("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data;
}
