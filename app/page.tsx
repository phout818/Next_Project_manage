"use client";
import LoginForm from "../app/component/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[rgb(255,102,102)] to-[rgba(255,102,102,0)]">
      <div className="bg-center-fade w-full max-w-sm p-8 rounded-xl shadow">
        <LoginForm />
      </div>
    </div>
  );
}
