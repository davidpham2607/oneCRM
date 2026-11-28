---
title: "Chuẩn Model Context Protocol (MCP Server): Cầu nối CRM với AI Agents  -  oneCRM"
description: "Tích hợp sẵn MCP Server trong oneCRM: cho phép Claude, Cursor, ChatGPT và các AI Agent truy vấn và cập nhật dữ liệu CRM theo thời gian thực."
source_path: "/features/mcp"
---

# Chuẩn kết nối Model Context Protocol (MCP)

<div v-pre>

oneCRM là một trong những nền tảng quản trị kinh doanh tự lưu trữ tiên phong trang bị **MCP Server (Model Context Protocol)** - chuẩn mở do Anthropic khởi xướng để kết nối các trợ lý AI với dữ liệu kinh doanh thực tế.

Với MCP Server, bạn không còn phải chuyển qua lại giữa các cửa sổ ứng dụng: bạn có thể ra lệnh trực tiếp cho các AI Agent (như Claude Desktop, Cursor, Copilot) thực hiện các tác vụ CRM phức tạp chỉ bằng câu lệnh tự nhiên.

---

## 1. AI Agents có thể làm gì qua oneCRM MCP Server?

- **Truy vấn thông tin khách hàng tức thì:** *"Kiểm tra lịch sử giao dịch và các hóa đơn còn nợ của Công ty ABC."*
- **Tạo báo giá và công việc bằng câu lệnh:** *"Tạo báo giá thiết kế website 20 triệu cho anh Nam và gửi một task nhắc việc cho đội thiết kế vào thứ Hai tới."*
- **Phân tích dòng tiền và tiến độ dự án:** *"Tổng hợp doanh thu đã thu trong tháng này và liệt kê các dự án đang bị chậm tiến độ quá 3 ngày."*
- **Hỗ trợ kỹ thuật tự động:** *"Đọc ticket #1042 và tra cứu tài liệu hướng dẫn để tạo câu trả lời mẫu cho khách hàng."*

---

## 2. Bảo mật & Kiểm soát quyền hạn chặt chẽ

- **Phân quyền theo vai trò (Role-Based Access Control):** AI Agent khi kết nối chỉ được truy cập các dữ liệu mà tài khoản nhân sự đó có thẩm quyền.
- **Ghi nhật ký kiểm toán minh bạch:** Mọi hành động do AI Agent thực hiện (đọc, tạo, cập nhật) đều được ghi lại trong nhật ký hoạt động của oneCRM để kiểm soát.
- **Vận hành trên máy chủ riêng:** Toàn bộ luồng kết nối MCP diễn ra trực tiếp giữa máy trạm của bạn và máy chủ oneCRM, không thông qua bất kỳ máy chủ trung gian nào.

</div>
