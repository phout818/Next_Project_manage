"use client";

import { useState, useEffect } from "react";
import { apiLogin } from "@/lib/api";
import { saveToken, saveUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { decodeJWT } from "@/lib/jwt";
import { getToken } from "@/lib/auth";

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.replace("/project");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await apiLogin(phone, password);
      //console.log("result:", res);
      //console.log("Header:", res.headers);
      //console.log("x-role:", res.headers["x-role"]);
      const token = res?.data?.access_token;
      const user = res?.data?.user; //  get data user
      const payload = decodeJWT(token); //  decode JWT
      const userID = payload?.user_id; //  get user_id from token
      //const role = payload?.role; //   role

      if (!token) throw new Error("No token returned");

      //  save token + user_id
      saveToken(token, userID);
      //  save user object
      if (user) {
        saveUser(user);
      }
      // console.log("token:", token);
      // console.log("user_id:", userID);
      // console.log("payload:", payload);
      // console.log("role:", role);
      router.push("/project");
    } catch (err) {
      console.error("Login error:", err);
      setError("รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="bg-center-fade w-full max-w-sm p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {error && (
          <p className="text-red-600 text-sm text-center mb-6">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-amber-50"
            placeholder="Phone or Username"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-amber-50"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
