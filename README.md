## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

ได้เลยครับ! 🎉
ผมทำ README.md สำหรับโปรเจกต์ Next.js + API Project Management ของคุณ ให้อ่านง่ายและมืออาชีพ พร้อมการ setup ครบ

คุณสามารถ copy ได้เลย 👇

---

📌 README.md สำหรับโปรเจกต์ของคุณ

# 🚀 Project API Management (Next.js + TypeScript)

โปรเจกต์นี้เป็นระบบจัดการโครงการ (Project Management) ที่พัฒนาด้วย **Next.js + TypeScript + TailwindCSS**  
พร้อมเชื่อมต่อ API สำหรับสร้าง, แก้ไข, ลบ และอัปเดตสถานะของโครงการ  
รวมถึงระบบ Login + Token + Role (SUPER_ADMIN)

---

## 📦 เทคโนโลยีที่ใช้

- **Next.js 14+ (App Router)**
- **React 18**
- **TypeScript**
- **TailwindCSS**
- **REST API Service**
- LocalStorage สำหรับจัดการ Token และ UserID
- Modal Components (Create / Edit / Delete)
- Toggle Switch สำหรับอัปเดตสถานะ real-time

---

## 📁 โครงสร้างโฟลเดอร์หลัก

project-folder/ │ ├─ src/ │ ├─ app/ │ │ ├─ login/ │ │ ├─ project/ │ │ └─ layout.tsx │ │ │ ├─ lib/ │ │ ├─ api.ts ← ฟังก์ชันเรียก API │ │ └─ auth.ts ← จัดการ token / user_id │ │ │ ├─ component/ │ ├─ ToggleSwitch.tsx │ └─ Modal Components │ ├─ public/icon/ │ ├─ .env.example ├─ .gitignore └─ README.md

---

## ⚙️ การติดตั้งโปรเจกต์

### 1️⃣ Clone โปรเจกต์

```sh
git clone <your-repository-url>

2️⃣ เข้าโฟลเดอร์โปรเจกต์

cd nextjs-project

3️⃣ ติดตั้ง dependencies

npm install

สำรับการ Login ใช้
UserName : super_admin
Password : password112

---

🔑 Environment Variables

# ไฟล์ .env.local จะไม่รวมใน Git
# ให้ copy จากไฟล์ตัวอย่าง

# cp .env.example .env.local

# จากนั้นใส่ค่าตามจริงใน .env.local

# NEXT_PUBLIC_API_URL="https://api.marketxdev.store/api/v1"


---

▶️ การรันโปรเจกต์

Development mode

npm run dev

เปิดเว็บที่:
👉 http://localhost:3000


---

🔐 ระบบ Login

โปรเจกต์มีระบบ login พร้อมเก็บข้อมูลใน localStorage:

token

user_id

role (SUPER_ADMIN)

สำรับการ Login ใช้
UserName : super_admin
Password : password112


และมีระบบป้องกัน:

ถ้าไม่มี token → redirect ไปหน้า login

ถ้ากดปุ่ม back ของ browser → ไม่ย้อนกลับเข้าไปหน้า project ได้



---

🛠 ฟังก์ชันหลักที่ทำได้

✔️ Login

✔️ Logout

✔️ ดึงข้อมูลโครงการจาก API

✔️ สร้างโครงการ (Create)

✔️ แก้ไขโครงการ (Edit)

✔️ ลบโครงการ (Delete)

✔️ อัปเดตสถานะโครงการ (Toggle)

✔️ Modal ครบทั้งหมด

✔️ Pagination

✔️ การตกแต่ง UI ด้วย Tailwind

✔️ ปรับ UI ให้สวยงาม + Fade Gradient Background


---

📤 การ Deploy

รองรับ Next.js ทุกแพลตฟอร์ม เช่น:

Vercel (แนะนำที่สุด)

Netlify

Docker

Firebase Hosting

หรือเซิร์ฟเวอร์ Linux ผ่าน Node.js



---

📝 Git Ignore Files

โปรเจกต์นี้ ignore ไฟล์ดังนี้ (ตัวอย่าง):

node_modules/
.next/
.env.local
dist/


---

🤝 ผู้พัฒนา

Developer: --
Tech Stack: Next.js + TypeScript + Tailwind + REST API


---



---
```
