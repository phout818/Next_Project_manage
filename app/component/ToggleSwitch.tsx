"use client";
import React from "react";

export default function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
          checked ? "translate-x-6" : ""
        }`}
      />
    </div>
  );
}
