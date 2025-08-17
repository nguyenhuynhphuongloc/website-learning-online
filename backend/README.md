# 🎓 Educational Application

<p align="center">
  <img src="https://img.icons8.com/color/96/online-education.png" width="120" alt="Education Logo"/>
</p>

Một ứng dụng giáo dục trực tuyến được thiết kế để hỗ trợ người học và giáo viên tương tác, quản lý khóa học, và theo dõi tiến độ học tập.  
Ứng dụng phù hợp cho **trường học, trung tâm đào tạo, và học trực tuyến**.

---

##  Mô tả

Ứng dụng cung cấp nền tảng **E-Learning** giúp:
- Học viên đăng ký khóa học, làm bài tập, và kiểm tra tiếng anh trực tuyến.
- Giáo viên tạo khóa học, đăng tài liệu, và chấm điểm.
- Quản trị viên quản lý người dùng, khóa học, và báo cáo.

Hỗ trợ đa nền tảng: **Web**.

---

## 🛠 Công nghệ sử dụng


 **NestJS**  Backend API 
 **React / Next.js**  Frontend giao diện web 
 **TypeScript**  Ngôn ngữ lập trình chính 
 **MongoDb**  Cơ sở dữ liệu 
 **TypeORM**  ORM giao tiếp với DB 
 **Socket.io**  Chat & thông báo thời gian thực 
 **JWT**  Xác thực & phân quyền 
 **Docker**  Đóng gói & triển khai 
 **AWS S3**  Lưu trữ tài liệu, video 
 **Stripe**  Thanh toán khóa học

---

##  Cơ sở dữ liệu

**MongoDb** với các bảng chính:


---

## 🚀 Chức năng chính

### 👨‍🎓 Học viên
- Đăng ký tài khoản và đăng nhập
- Tìm kiếm và đăng ký khóa học
- Xem bài học và làm bài tập
- Xem kết quả học tập và tiến độ


###  Quản trị viên
- Quản lý người dùng (CRUD)
- Quản lý khóa học
- Quản lý nội dung & cài đặt hệ thống

###  Tính năng bổ sung
- Chat trực tiếp giữa học viên và giáo viên
- Hệ thống thông báo đẩy (push notification)
- Thanh toán online Stripe

---

## 📦 Cài đặt & Chạy dự án

```bash
# Clone repository
git clone https://github.com/username/educational-app.git
cd educational-app

# Cài dependencies
npm install

# Cấu hình biến môi trường
cp .env.example .env

# Chạy database
docker-compose up -d

# Chạy backend
npm run start:dev

# Chạy frontend
cd frontend
npm run dev
