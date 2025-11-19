"use client";

export default function DeleteConfirmModal({ open, onClose, onConfirm }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[480px] rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
        {/* HEADER */}
        <div className=" text-center bg-linear-to-r from-pink-500 to-purple-600 px-6 py-4">
          <h2 className="text-white text-lg font-bold">ยืนยันการลบโครงการ</h2>
        </div>

        {/* CONTENT */}
        <div className="p-6 text-center">
          <p className="text-gray-700 text-base">
            คุณต้องการลบโครงการนี้หรือไม่?
          </p>
          <p className="text-gray-500 text-sm mt-1">
            ข้อมูลทั้งหมดจะถูกลบและไม่สามารถกู้คืนได้
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            ยกเลิก
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            ลบข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
}
