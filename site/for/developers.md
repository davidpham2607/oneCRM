---
title: "oneCRM cho Lập trình viên: Kiến trúc Laravel 13 & Livewire 4"
description: "Xây dựng và mở rộng module cho oneCRM với Laravel 13, Livewire 4 SFC, nwidart/modules và AI dev skills."
source_path: "/for/developers"
---

# oneCRM dành cho Lập trình viên & Đội ngũ Kỹ thuật

<div v-pre>

Được xây dựng lại hoàn toàn từ đầu trên nền tảng **Laravel 13 và Livewire 4**, oneCRM mang lại trải nghiệm phát triển phần mềm chuẩn mực, hiện đại và sạch sẽ nhất cho các kỹ sư phần mềm.

---

### Điểm nổi bật về kiến trúc kỹ thuật

- **Kiến trúc Module hóa hoàn toàn (`modules/`):** Mỗi tính năng tùy biến nằm trong thư mục module riêng, sở hữu routes, migrations, models, views và permissions riêng biệt mà không can thiệp vào mã nguồn gốc của hệ thống.
- **Livewire Single-File Components (`--sfc`):** Tạo giao diện tương tác động mượt mà bằng PHP + Blade nằm gọn trong 1 file duy nhất. **Không cần cài đặt npm hay chạy Vite pipeline phức tạp**.
- **Tích hợp sẵn chuẩn Model Context Protocol (MCP Server):** Cung cấp sẵn endpoint MCP an toàn (OAuth 2.1 + PKCE), cho phép các lập trình viên kết nối trực tiếp các công cụ AI (Claude Desktop, Cursor, ChatGPT, VS Code) để tương tác với cơ sở dữ liệu CRM bằng ngôn ngữ tự nhiên.
- **Hỗ trợ cơ sở dữ liệu đa dạng:** Vận hành tối ưu trên cả **MySQL 8.0+**, **MariaDB 10.6+** và **PostgreSQL 15+**.
- **Đóng gói Docker Compose sẵn sàng:** Đi kèm cấu hình `docker/production/` tiêu chuẩn, hỗ trợ tự động cấp SSL HTTPS miễn phí và tương thích với cả kiến trúc **amd64** và **arm64** (tiết kiệm chi phí máy chủ tối đa).

</div>
