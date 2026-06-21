export interface LoginPayload {
    email: string;
    password: string;
  }

  export interface LoginResponse {
    message: string;
    token: string;
    user: {
      id: number;
      email: string;
      role?: string;
    };
  }

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  console.log("Print the API UrL", API_URL);

  export async function loginUser(
    payload: LoginPayload
  ): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Print the response", response)

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  }