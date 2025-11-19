"use client";

import { useState } from "react";
import Image from "next/image";
import { apiCreateProject } from "@/lib/api";
import { getToken, getUserId } from "@/lib/auth";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateProjectModal({
  open,
  onClose,
  onSuccess,
}: ModalProps) {
  if (!open) return null; // <-- สำคัญที่สุด ต้องมี

  const [form, setForm] = useState({
    name: "",
    business_type: "natural_person",
    day_of_billing: 20,
    day_of_payment: 5,
    email: "",
    phone: [""],
    address: "",
    province: "",
    district: "",
    subdistrict: "",
    postal_code: "",
    location: "0,0", // 👈 ต้องมี และเป็น lat,lng
    status: true, // 👈 ต้องส่ง
  });

  const token = getToken();
  const user_id = getUserId();

  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const addPhone = () => {
    setForm({ ...form, phone: [...form.phone, ""] });
  };

  const updatePhone = (i: number, value: string) => {
    const phones = [...form.phone];
    phones[i] = value;
    setForm({ ...form, phone: phones });
  };

  const handleSubmit = async () => {
    const res = await apiCreateProject(token!, user_id!, form);

    if (res.code === "SUCCESS") {
      alert("เพิ่มโครงการสำเร็จ");
      onSuccess();
      onClose();
    } else {
      alert("เกิดข้อผิดพลาด: " + res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[700px] rounded-2xl shadow-xl">
        {/* Header */}
        <div className="bg-linear-to-r from-purple-600 to-pink-500 text-white p-4 rounded-t-2xl text-xl font-semibold">
          เพิ่มโครงการ
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* ชื่อโครงการ */}
          <div>
            <label className="font-medium">ชื่อโครงการ</label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-2.5">
                <Image
                  src="/icon/home-icon.png"
                  width={18}
                  height={18}
                  alt="home"
                />
              </span>
              <input
                className="border rounded-xl w-full py-2 pl-10 pr-3"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
          </div>

          {/* ประเภทธุรกิจ */}
          <div>
            <label className="font-medium">ประเภทธุรกิจ</label>
            <div className="flex gap-6 mt-1">
              {["juristic", "natural_person"].map((t) => (
                <label key={t} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={form.business_type === t}
                    onChange={() => handleChange("business_type", t)}
                  />
                  {t === "juristic" ? "นิติบุคคล" : "บุคคลธรรมดา"}
                </label>
              ))}
            </div>
          </div>

          {/* กำหนดวันทำบิล */}
          <div>
            <label className="font-medium">
              กำหนดวันทำบิลและวันสิ้นสุดการชำระเงิน
            </label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <select
                className="border rounded-xl p-2"
                value={form.day_of_billing}
                onChange={(e) =>
                  handleChange("day_of_billing", Number(e.target.value))
                }
              >
                {[5, 10, 15, 20, 25].map((d) => (
                  <option key={d} value={d}>{`ทุกวันที่ ${d} ของเดือน`}</option>
                ))}
              </select>

              <select
                className="border rounded-xl p-2"
                value={form.day_of_payment}
                onChange={(e) =>
                  handleChange("day_of_payment", Number(e.target.value))
                }
              >
                {[5, 10, 15, 20, 25].map((d) => (
                  <option key={d} value={d}>{`ทุกวันที่ ${d} ของเดือน`}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="font-medium">อีเมลติดต่อโครงการ</label>
            <input
              type="email"
              className="border rounded-xl w-full p-2 mt-1"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>

          {/* เบอร์โทร */}
          <div>
            <label className="font-medium">เบอร์โทรศัพท์ติดต่อโครงการ</label>

            {form.phone.map((p, i) => (
              <input
                type="number"
                key={i}
                className="border rounded-xl w-full p-2 mt-2"
                placeholder="กรุณาเพิ่มเบอร์ติดต่อ"
                value={p}
                onChange={(e) => updatePhone(i, e.target.value)}
                required
              />
            ))}

            <button
              className="mt-2 px-4 py-1.5 bg-pink-500 text-white rounded-xl text-sm"
              onClick={addPhone}
            >
              + เพิ่มเบอร์
            </button>
          </div>

          {/* ที่อยู่ */}
          <div>
            <label className="font-medium">ที่อยู่</label>
            <textarea
              className="border rounded-xl w-full p-2 mt-1"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              required
            />
          </div>

          {/* รายละเอียดที่อยู่ */}
          <div className="grid grid-cols-2 gap-4">
            <input
              className="border rounded-xl p-2"
              placeholder="ตำบล/แขวง"
              value={form.subdistrict}
              onChange={(e) => handleChange("subdistrict", e.target.value)}
              required
            />
            <input
              className="border rounded-xl p-2"
              placeholder="อำเภอ/เขต"
              value={form.district}
              onChange={(e) => handleChange("district", e.target.value)}
              required
            />
            <input
              className="border rounded-xl p-2"
              placeholder="จังหวัด"
              value={form.province}
              onChange={(e) => handleChange("province", e.target.value)}
              required
            />
            <input
              type="number"
              className="border rounded-xl p-2"
              placeholder="รหัสไปรษณีย์"
              value={form.postal_code}
              onChange={(e) => handleChange("postal_code", e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-xl"
              onClick={onClose}
            >
              ยกเลิก
            </button>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-xl"
              onClick={handleSubmit}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
