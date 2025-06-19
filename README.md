# 🥬 ORGANMART – Hệ thống mua sắm thực phẩm sạch

Triển khai hệ thống đầy đủ gồm:
- 📱 Frontend: React Native (Expo)
- 🖥️ Backend: Laravel 9 (API)
- 🐬 MySQL Database
- 🐳 Đóng gói bằng Docker Compose – chạy được bằng 1 dòng lệnh

## 📦 Yêu cầu cài đặt

- Git
- Docker & Docker Compose
- Khuyến nghị: Dùng Ubuntu (test trên WSL Ubuntu cũng được)

## 🚀 Các bước chạy ứng dụng

```bash
git clone https://github.com/your-username/organmart.git
cd organmart
docker-compose up -d --build
```

## ⚠️ Kết nối API

```ts
// src/config.ts
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';
```

## 👨‍🏫 Quản lý

Đã mời tài khoản GitHub `anhnguyen888`. Thầy accept là có thể chạy thử ngay.

## 📂 Cấu trúc repo

organmart/
├── organmart_backend/
├── organmart_app/
├── docker-compose.yml
└── README.md
