// =============================
// SAVE TOKEN + USER_ID +ROLE
// =============================
export function saveToken(token: string, user_id: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
  localStorage.setItem("user_id", user_id);
  //localStorage.setItem("role", role);
}
// =============================
// GET ROLE
// =============================
export function getRole() {
  return localStorage.getItem("role");
}

// =============================
// GET TOKEN
// =============================
export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

// =============================
// GET USER ID
// =============================
export function getUserId() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("user_id");
}

// =============================
// SAVE FULL USER OBJECT
// =============================
export function saveUser(user: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem("user", JSON.stringify(user));
}

// =============================
// GET FULL USER OBJECT
// =============================
export function getUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

// =============================
// LOGOUT – clear data back to login
// =============================
export function logout() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user");
  //localStorage.removeItem("role");
  window.location.href = "/";
}
