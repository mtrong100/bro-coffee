# ☕ Bro Coffee

**Bro Coffee** là ứng dụng web hiện đại giúp bạn **theo dõi lịch sử uống cà phê, chi tiêu, đánh giá quán cafe và phân tích thói quen cá nhân**. Dữ liệu được **đồng bộ trực tiếp từ Google Sheets**, hiển thị dưới dạng giao diện đẹp mắt với thống kê chi tiết và hỗ trợ PWA.

---

## 📸 Screenshot

![Screenshot](./Screenshot.png)

## ✨ Tính năng nổi bật

### 📊 Trang chủ (Home)

- **Thống kê tổng quan**: Tổng số bản ghi, tổng tiền đã chi, thời điểm cập nhật
- **Hiển thị card hiện đại**: Mỗi lần uống cà phê được hiển thị với hình ảnh, thông tin chi tiết
- **Bộ lọc thông minh**: Tìm kiếm theo quán, đồ uống, buổi (sáng/trưa/tối), tháng
- **Phân trang mượt mà**: Dễ dàng điều hướng qua nhiều bản ghi
- **Sắp xếp tự động**: Hiển thị các bản ghi mới nhất trước

### 📈 Thống kê (Stats)

- **Biểu đồ chi tiêu theo quý**: Phân tích xu hướng chi tiêu
- **Thống kê theo tháng**: Xem chi tiết từng tháng
- **Phân bổ theo buổi**: Sáng, trưa, hay tối uống nhiều nhất?
- **Top quán cafe**: Những quán bạn ghé thăm nhiều nhất
- **Top đồ uống**: Đồ uống yêu thích của bạn
- **Phân tích theo khu vực**: Quán cafe ở đâu?
- **Đánh giá quán**: Xem rating và phân loại quán cafe

### 🗺️ Quán Cafe (Coffee Location)

- **Danh sách quán cafe**: Tất cả quán đã ghé thăm
- **Thông tin chi tiết**: Địa chỉ, khu vực, loại quán, rating
- **Bộ lọc đa dạng**: Lọc theo khu vực, loại quán, rating
- **Giao diện card đẹp mắt**: Hiển thị hình ảnh và thông tin rõ ràng

### 🎨 Giao diện & Trải nghiệm

- **Dark/Light mode**: Chuyển đổi theme mượt mà
- **Responsive design**: Hoạt động tốt trên mọi thiết bị
- **Mobile sidebar**: Menu sidebar hiện đại cho mobile
- **PWA support**: Cài đặt như ứng dụng native
- **Animations mượt**: Hover effects, transitions đẹp mắt
- **Amber theme**: Màu chủ đạo ấm áp, phù hợp với cà phê

---

## 🚀 Tech Stack

- **React 19** - UI Framework
- **Vite** - Build tool & dev server
- **Tailwind CSS 4** - Styling
- **Lucide Icons** - Icon library
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Google Sheets** - Data source (CSV export)
- **Vite PWA** - Progressive Web App

---

## 📁 Cấu trúc dự án

```
src/
├── components/
│   ├── CoffeeCard.jsx           # Card hiển thị coffee record
│   ├── CoffeeLocationCard.jsx   # Card hiển thị quán cafe
│   ├── DataTable.jsx            # Bảng dữ liệu với filter & pagination
│   ├── Filters.jsx              # Bộ lọc tìm kiếm
│   ├── Footer.jsx               # Footer component
│   ├── Header.jsx               # Header với navigation & sidebar
│   ├── Pagination.jsx           # Phân trang
│   ├── StatCard.jsx             # Card thống kê
│   ├── ThemeToggle.jsx          # Chuyển đổi dark/light mode
│   ├── charts/                  # Các biểu đồ
│   │   ├── AreaDistributionChart.jsx
│   │   ├── CategoryChart.jsx
│   │   ├── RatingDistributionChart.jsx
│   │   └── TopRatedCoffeeChart.jsx
│   └── stats/                   # Biểu đồ thống kê
│       ├── MonthlySpendingChart.jsx
│       ├── QuarterSpendingChart.jsx
│       ├── SessionPieChart.jsx
│       └── TopDrinkChart.jsx
│
├── pages/
│   ├── Home.jsx                 # Trang chủ
│   ├── Stats.jsx                # Trang thống kê
│   ├── CoffeeLocation.jsx       # Trang quán cafe
│   └── NotFound.jsx             # 404 page
│
├── hooks/
│   ├── useCoffeeData.js         # Hook lấy dữ liệu coffee
│   └── useCoffeeLocationData.js # Hook lấy dữ liệu quán cafe
│
├── utils/
│   ├── format.js                # Format tiền, ngày tháng
│   └── constants.js             # Hằng số
│
├── layouts/
│   └── MainLayout.jsx           # Layout chính
│
├── context/
│   └── ThemeContext.jsx         # Context quản lý theme
│
├── App.jsx                      # Main app component
├── main.jsx                     # Entry point
└── index.css                    # Global styles
```

---

## 📊 Google Sheets Schema

### Sheet 1: Coffee Records (Lịch sử uống cà phê)

| Cột      | Mô tả                          | Ví dụ            |
| -------- | ------------------------------ | ---------------- |
| date     | Ngày uống (DD/MM/YYYY)         | 22/01/2026       |
| time     | Thời gian (HH:MM)              | 14:30            |
| session  | Buổi (Sáng/Trưa/Tối)           | Trưa             |
| place    | Tên quán                       | The Coffee House |
| drink    | Tên đồ uống (phân cách bằng ,) | Bạc xỉu, Bánh mì |
| price    | Giá tiền                       | 45000            |
| imageUrl | URL hình ảnh (optional)        | https://...      |

### Sheet 2: Coffee Locations (Danh sách quán cafe)

| Cột      | Mô tả                   | Ví dụ              |
| -------- | ----------------------- | ------------------ |
| name     | Tên quán                | The Coffee House   |
| address  | Địa chỉ                 | 123 Nguyễn Huệ, Q1 |
| area     | Khu vực                 | Quận 1             |
| category | Loại quán               | Chain              |
| rating   | Đánh giá (1-5)          | 4.5                |
| imageUrl | URL hình ảnh (optional) | https://...        |

📌 **Lưu ý**:

- Sheet cần được **Publish to the web** (File → Share → Publish to web)
- Chọn định dạng **CSV** khi publish
- Đảm bảo tên cột chính xác như trên

---

## 🛠️ Cài đặt & Chạy

### 1️⃣ Clone repository

```bash
git clone https://github.com/mtrong100/bro-coffee.git
cd bro-coffee
```

### 2️⃣ Cài đặt dependencies

```bash
npm install
```

### 3️⃣ Cấu hình Google Sheets

Mở file `src/hooks/useCoffeeData.js` và `src/hooks/useCoffeeLocationData.js`, thay đổi:

```javascript
const SHEET_ID = "YOUR_SHEET_ID_HERE";
const SHEET_NAME = "Sheet1"; // Tên sheet của bạn
```

**Cách lấy SHEET_ID:**

- URL Google Sheets: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
- Copy phần `SHEET_ID_HERE`

### 4️⃣ Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại: `http://localhost:5173`

### 5️⃣ Build production

```bash
npm run build
```

### 6️⃣ Preview production build

```bash
npm run preview
```

---

## 🎨 Customization

### Thay đổi màu chủ đạo

Mở `src/index.css` và chỉnh sửa các biến màu:

```css
/* Thay amber bằng màu khác */
scrollbar-color: rgba(245, 158, 11, 0.45) transparent;
```

### Thay đổi số lượng items mỗi trang

Mở `src/components/DataTable.jsx`:

```javascript
const perPage = 12; // Thay đổi số này
```

---

## 📱 PWA Features

- ✅ Offline support
- ✅ Install as app
- ✅ Cache Google Sheets data
- ✅ Cache images
- ✅ Auto update
- ✅ Custom app icon (amber coffee cup)

---

## 🌟 Tính năng nổi bật

### 🎯 Sắp xếp thông minh

Dữ liệu tự động sắp xếp theo ngày mới nhất, giúp bạn luôn thấy các bản ghi gần đây nhất.

### 🎨 UI/UX hiện đại

- Gradient backgrounds
- Smooth animations
- Hover effects
- Loading skeletons
- Responsive design

### 📊 Thống kê chi tiết

- Biểu đồ đa dạng (Line, Bar, Pie, Area)
- Phân tích theo nhiều tiêu chí
- Dữ liệu trực quan, dễ hiểu

### 🔍 Tìm kiếm & Lọc mạnh mẽ

- Tìm kiếm full-text
- Lọc theo nhiều tiêu chí
- Kết hợp nhiều filter
- Clear filters nhanh chóng

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🙏 Credits

- Icons: [Lucide Icons](https://lucide.dev/)
- Charts: [Recharts](https://recharts.org/)
- Framework: [React](https://react.dev/)
- Build Tool: [Vite](https://vitejs.dev/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

**Made with ☕ & ❤️**

[⭐ Star this repo](https://github.com/mtrong100/bro-coffee) if you find it useful!

</div>
