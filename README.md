# 🥬 ORGANMART – Hệ thống mua sắm thực phẩm sạch

## 🚀 Hướng dẫn cài đặt & chạy ứng dụng

### 1. Clone dự án từ GitHub
```bash
git clone https://github.com/your-username/organmart.git

cd organmart
```
### 2. Cài đặt dependencies
```bash
cd organmart_app
npm install

cd ../organmart_backend
composer install
```
### 3. Tạo file .env cho Laravel
```bash
cp .env.example .env

# Cập nhật các thông tin sau trong .env:

APP_NAME=OrganMart
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=organmart
DB_USERNAME=root
DB_PASSWORD=root

SANCTUM_STATEFUL_DOMAINS=http://localhost:3000,http://localhost:19006,127.0.0.1:5173,localhost:5173,http://localhost:19001
CORS_ALLOWED_ORIGINS=
```
### 4. Lấy địa chỉ IP nội bộ (IPv4)

```bash
# Mở CMD (Windows) hoặc terminal:

ipconfig  # Windows

# Ghi lại địa chỉ IPv4, ví dụ: 192.168.1.6

```
### 5. Cập nhật IP vào các file
```bash
# .env trong organmart_backend
CORS_ALLOWED_ORIGINS=http://[ipv4]:8000,http://[ipv4]:8081
# api.ts trong organmart_app/services/
export const api = axios.create({
  baseURL: 'http://[ipv4]:8000/',
  withCredentials: true,
});
```
### 6. Khởi động Docker
```bash
docker-compose up -d --build
```
### 7. Cấu hình Laravel lần đầu sau khi Docker đã chạy
```bash
# Generate app key
docker-compose exec backend php artisan key:generate
```
### 7. Truy cập admin dashboard
```bash
  http://192.168.1.6:8000/admin
  # tài khoản admin
  # email: admin@example.com
  # pass: 111
```
### 8. Truy cập app
```bash
  #tải ứng dụng expo go để quét mã QR truy cập ứng dụng
  # truy cập log của frontend
  docker logs -f organmart_app
  # mở ứng dụng expo go để quét mã QR có trong log
  #tài khoản user 1
  # username: user1
  # pas: 123456789
```
