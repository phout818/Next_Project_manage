"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { apiUpdateProject } from "@/lib/api";
import { getToken, getUserId } from "@/lib/auth";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  project: any;
  onSuccess: () => void;
}

interface ProjectForm {
  name: string;
  business_type: string;
  day_of_billing: number;
  day_of_payment: number;
  email: string;
  phone: string[];
  address: string;
  province: string;
  district: string;
  subdistrict: string;
  postal_code: string;
  location: string;
  status: boolean;
}

export default function EditProjectModal({
  open,
  onClose,
  project,
  onSuccess,
}: EditModalProps) {
  if (!open) return null;

  const token = getToken();
  const user_id = getUserId();

  const [form, setForm] = useState<ProjectForm>({
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
    location: "0,0",
    status: true,
  });

  // get old data befor edit
  useEffect(() => {
    if (project) {
      setForm({
        name: project.name || "",
        business_type: project.business_type || "natural_person",
        day_of_billing: project.day_of_billing || 20,
        day_of_payment: project.day_of_payment || 5,
        email: project.email || "",
        phone: project.phone || [""],
        address: project.address || "",
        province: project.province || "",
        district: project.district || "",
        subdistrict: project.subdistrict || "",
        postal_code: project.postal_code || "",
        location: project.location || "0,0",
        status: project.status ?? true,
      });
    }
  }, [project]);

  // add parameter type
  const handleChange = (key: keyof ProjectForm, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const updatePhone = (i: number, value: string) => {
    const ph = [...form.phone];
    ph[i] = value;
    setForm({ ...form, phone: ph });
  };

  const addPhone = () => {
    setForm({ ...form, phone: [...form.phone, ""] });
  };

  const handleSubmit = async () => {
    const res = await apiUpdateProject(token!, user_id!, project.id, form);

    if (res.code === "SUCCESS") {
      alert("แก้ไขโครงการสำเร็จ");
      onSuccess();
      onClose();
    } else {
      alert("แก้ไขล้มเหลว: " + res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[700px] rounded-2xl shadow-xl">
        <div className="bg-linear-to-r from-purple-600 to-pink-500 text-white p-4 rounded-t-2xl text-xl font-semibold">
          แก้ไขโครงการ
        </div>

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

          {/* กำหนดวันทำบิล & วันจ่าย */}
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
              className="border rounded-xl w-full p-2 mt-1"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* เบอร์โทร */}
          <div>
            <label className="font-medium">เบอร์โทรศัพท์ติดต่อโครงการ</label>

            {form.phone.map((p, i) => (
              <input
                key={i}
                className="border rounded-xl w-full p-2 mt-2"
                placeholder="กรุณาเพิ่มเบอร์ติดต่อ"
                value={p}
                onChange={(e) => updatePhone(i, e.target.value)}
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
            />
          </div>

          {/* รายละเอียดที่อยู่ */}
          <div className="grid grid-cols-2 gap-4">
            <input
              className="border rounded-xl p-2"
              placeholder="ตำบล/แขวง"
              value={form.subdistrict}
              onChange={(e) => handleChange("subdistrict", e.target.value)}
            />
            <input
              className="border rounded-xl p-2"
              placeholder="อำเภอ/เขต"
              value={form.district}
              onChange={(e) => handleChange("district", e.target.value)}
            />
            <input
              className="border rounded-xl p-2"
              placeholder="จังหวัด"
              value={form.province}
              onChange={(e) => handleChange("province", e.target.value)}
            />
            <input
              className="border rounded-xl p-2"
              placeholder="รหัสไปรษณีย์"
              value={form.postal_code}
              onChange={(e) => handleChange("postal_code", e.target.value)}
            />
          </div>

          {/* ปุ่ม */}
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
