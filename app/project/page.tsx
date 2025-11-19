"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
///
import { getToken, logout, getUserId } from "@/lib/auth";
import {
  apiGetProjects,
  apiUpdateProjectStatus,
  apiDeleteProject,
} from "@/lib/api";
///
import CreateProjectModal from "./CreateProjectModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditProjectModal from "./EditProjectModal";
import ToggleSwitch from "../component/ToggleSwitch";

const Page = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const pageSize = 10;
  ///
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  ///
  const [editProject, setEditProject] = useState<any>(null);
  const [deleteId, setDeleteId] = useState(null);
  const [projects, setProjects] = useState<any[]>([]);
  ///
  const token = getToken();
  const user_id = getUserId();
  ///
  // page manage
  const totalPages = Math.ceil(projects.length / pageSize);
  const start = (page - 1) * pageSize;
  const current = projects.slice(start, start + pageSize);
  ///
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  ///load data from api
  const loadProjects = async () => {
    if (!token || !user_id) return;

    try {
      setLoading(true);
      const res = await apiGetProjects(token, user_id);
      const rows = Array.isArray(res?.data?.rows) ? res.data.rows : [];
      setProjects(rows);
    } catch (err) {
      console.error("LOAD PROJECT ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      router.replace("/");
      return;
    }
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
    loadProjects();
  }, []);

  if (loading) return <div className="p-6 w-full items-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-200 via-sky-50 to-white flex justify-center py-10">
      <div className="w-full max-w-5xl">
        {/* HEADER */}
        <div className="bg-linear-to-r from-purple-300 to-pink-300 w-full mx-auto px-8 py-4 bg-white rounded-2xl shadow-lg flex items-center">
          <Image
            src={"/icon/logo-icon.png"}
            alt="logo"
            width={40}
            height={40}
          />

          <div
            className="ml-auto cursor-pointer text-gray-600 font-bold transition hover:text-red-500 hover:scale-105"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>

        {/* TAB */}
        <div className="w-[92%] mx-auto flex gap-6 text-lg font-medium mt-6 mb-4 px-2">
          <div className="text-[#4a79ff] border-b-2 border-[#4a79ff] pb-2 cursor-pointer">
            จัดการโครงการ
          </div>
          <div className="text-gray-400 cursor-pointer hover:text-gray-600 transition">
            จัดการผู้ใช้งาน
          </div>
        </div>

        {/* MAIN  */}
        <div className="w-[92%] mx-auto bg-white rounded-2xl shadow-md p-6">
          {/* HEADER ROW */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setOpenCreateModal(true)}
              className="px-4 py-2 bg-pink-500 text-white rounded-xl transition hover:bg-pink-600 hover:scale-105"
            >
              + สร้างโครงการ
            </button>

            <div className="flex gap-2">
              <input
                className="border rounded-xl px-3 py-2"
                placeholder="ค้นหาโครงการ"
              />
              <button className="px-6 py-2 bg-orange-500 text-white rounded-xl transition hover:bg-orange-600 hover:scale-105">
                <div className="flex items-center gap-1">
                  <Image
                    src={"/icon/search-icon.png"}
                    alt="search"
                    width={20}
                    height={20}
                  />
                  <span>ค้นหา</span>
                </div>
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white p-4 rounded-xl shadow-sm min-h-[550px] overflow-x-auto">
            <table className="w-full border-collapse text-gray-700 text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 text-left">รหัส</th>
                  <th className="p-3 text-left">ชื่อโครงการ</th>
                  <th className="p-3 text-left">ที่อยู่โครงการ</th>
                  <th className="p-3 text-center">กระทำ</th>
                  <th className="p-3 text-left">สถานะ</th>
                </tr>
              </thead>

              <tbody>
                {current.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 whitespace-nowrap">{p.id}</td>
                    <td className="p-3 whitespace-nowrap">{p.name}</td>
                    <td className="p-3 whitespace-nowrap">{p.address}</td>

                    <td className="p-3 flex items-center justify-center gap-3">
                      <Image
                        src="/icon/setting-icon.png"
                        width={20}
                        height={20}
                        alt="setting"
                      />

                      <Image
                        src="/icon/pencil-icon.png"
                        width={20}
                        height={20}
                        alt="edit"
                        className="cursor-pointer transition hover:opacity-90 hover:scale-125 hover:brightness-125"
                        onClick={() => {
                          setEditProject(p);
                          setOpenEditModal(true);
                        }}
                      />

                      <Image
                        src="/icon/trash-icon.png"
                        width={20}
                        height={20}
                        alt="delete"
                        className="cursor-pointer transition hover:opacity-90 hover:scale-125"
                        onClick={() => {
                          setDeleteId(p.id);
                          setOpenDeleteModal(true);
                        }}
                      />
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <ToggleSwitch
                          checked={p.status}
                          onChange={async (newVal) => {
                            setProjects((prev) =>
                              prev.map((item) =>
                                item.id === p.id
                                  ? { ...item, status: newVal }
                                  : item
                              )
                            );

                            const res = await apiUpdateProjectStatus(
                              token!,
                              user_id!,
                              p.id,
                              newVal,
                              p
                            );

                            if (res.code !== "SUCCESS") {
                              alert("Update Fail");
                              setProjects((prev) =>
                                prev.map((item) =>
                                  item.id === p.id
                                    ? { ...item, status: !newVal }
                                    : item
                                )
                              );
                            }
                          }}
                        />

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            p.status
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {p.status ? "เปิด" : "ปิด"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end mt-5 gap-4 text-sm text-gray-600">
            <span>
              {start + 1}-{start + current.length} of {projects.length}
            </span>

            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
            >
              ‹
            </button>

            <button className="px-3 py-1 border border-blue-500 rounded bg-blue-50">
              {page}
            </button>

            <button
              onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
              disabled={page >= totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
            >
              ›
            </button>
          </div>
        </div>

        {/* MODALS */}
        {openCreateModal && (
          <CreateProjectModal
            open={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            onSuccess={loadProjects}
          />
        )}

        {openDeleteModal && (
          <DeleteConfirmModal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onConfirm={async () => {
              const res = await apiDeleteProject(token!, user_id!, deleteId!);
              if (res.code === "SUCCESS") {
                setProjects((prev) => prev.filter((p) => p.id !== deleteId));
              }
              setOpenDeleteModal(false);
            }}
          />
        )}

        {openEditModal && (
          <EditProjectModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            project={editProject}
            onSuccess={loadProjects}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
