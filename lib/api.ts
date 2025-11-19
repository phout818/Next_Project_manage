import { ApiError } from "next/dist/server/api-utils";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

// LOGIN API
export async function apiLogin(phone: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-role": "SUPER_ADMIN",
    },
    body: JSON.stringify({ phone, password }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("Api error:", data);
    throw new Error(data.message || "Login failed");
  }

  return data;
}

// Load project list
export async function apiGetProjects(token: string, user_id: string) {
  const res = await fetch(`${API_BASE}/projects/lists?limit=100&offset=0`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-role": "SUPER_ADMIN",
      "x-user-id": user_id,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("Fetch project error:", data);
    throw new Error(data?.message || "Cannot fetch projects");
  }

  return data; // ดูจาก API รูปแบบคือ { data: [...] }
}

// Update status TogleSwitch
export async function apiUpdateProjectStatus(
  token: string,
  user_id: string,
  project_id: string,
  newStatus: boolean,
  fullProject: any
) {
  const body = {
    ...fullProject,
    status: newStatus, // change only status
  };

  const res = await fetch(`${API_BASE}/projects/${project_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-user-id": user_id,
    },
    body: JSON.stringify(body),
  });

  return res.json();
}

// Create project
export async function apiCreateProject(
  token: string,
  user_id: string,
  body: any
) {
  const res = await fetch(`${API_BASE}/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-user-id": user_id,
      "x-role": "SUPER_ADMIN",
    },
    body: JSON.stringify(body),
  });

  return res.json();
}

// delete project
export async function apiDeleteProject(
  token: string,
  user_id: string,
  project_id: string
) {
  const res = await fetch(`${API_BASE}/projects/${project_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-user-id": user_id,
    },
  });

  return res.json();
}

// update all data
export async function apiUpdateProject(
  token: string,
  user_id: string,
  project_id: string,
  body: any
) {
  const res = await fetch(`${API_BASE}/projects/${project_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-user-id": user_id,
    },
    body: JSON.stringify(body),
  });

  return res.json();
}

// get user data
export async function apiGetUser(token: string, user_id: string) {
  const res = await fetch(`${API_BASE}/users/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
