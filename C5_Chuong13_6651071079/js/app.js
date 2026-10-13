// app.js - Xử lý logic Vue.js 3 (Reactivity, Quản lý giỏ hàng, Tìm kiếm)
// So sánh với Vanilla JS: Nếu dùng Vanilla JS, mỗi lần thêm/xóa giỏ hàng phải tự querySelector + cập nhật DOM thủ công — Vue tự động làm điều này nhờ reactivity.

const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        // Mảng chứa tối thiểu 8 sản phẩm phụ kiện (hình ảnh truy xuất nội bộ từ thư mục images/)
        const products = ref([
            { id: 1, name: 'Electric Blue Case', price: 250000, image: '../images/sp1.webp', desc: 'Ốp lưng chống sốc màu xanh dương thời thượng.' },
            { id: 2, name: 'Matte Black Case', price: 250000, image: '../images/sp2.jpg', desc: 'Ốp lưng nhám chống bám vân tay sang trọng.' },
            { id: 3, name: 'Wireless Charger Pad', price: 250000, image: '../images/sp3.jpg', desc: 'Đế sạc nhanh không dây tốc độ cao.' },
            { id: 4, name: 'Active TWS Earbuds', price: 250000, image: '../images/sp4.jpg', desc: 'Tai nghe không dây âm thanh sống động.' },
            { id: 5, name: 'Silicone Soft Case', price: 200000, image: '../images/sp5.jpg', desc: 'Ốp lưng silicon dẻo mịn bảo vệ toàn diện.' },
            { id: 6, name: 'MagSafe Charger Stand', price: 350000, image: '../images/sp6.jpg', desc: 'Giá đỡ sạc từ tính tiện lợi cho bàn làm việc.' },
            { id: 7, name: 'Pro Wireless Pods', price: 450000, image: '../images/sp7.jpg', desc: 'Tai nghe chống ồn chủ động cao cấp.' },
            { id: 8, name: 'Fast USB-C Cable', price: 150000, image: '../images/sp8.avif', desc: 'Cáp sạc nhanh bọc dù siêu bền 100W.' }
        ]);

        // Biến giỏ hàng lưu trữ các sản phẩm đã thêm
        const cart = ref([]);

        // Biến từ khóa tìm kiếm liên kết 2 chiều bằng v-model
        const tuKhoa = ref('');

        // Computed property: Lọc danh sách sản phẩm theo từ khóa (không phân biệt hoa thường)
        const danhSachLoc = computed(() => {
            if (!tuKhoa.value.trim()) {
                return products.value;
            }
            return products.value.filter(p =>
                p.name.toLowerCase().includes(tuKhoa.value.toLowerCase().trim())
            );
        });

        // Computed property: Tính tổng số lượng sản phẩm trong giỏ hàng hiển thị ở header
        const cartCount = computed(() => {
            return cart.value.reduce((total, item) => total + item.quantity, 0);
        });

        // Computed property: Tính tổng tiền trong giỏ hàng
        const tongTien = computed(() => {
            return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
        });

        // Method: Thêm sản phẩm vào giỏ hàng
        const themVaoGio = (sanPham) => {
            const existing = cart.value.find(item => item.id === sanPham.id);
            if (existing) {
                existing.quantity++;
            } else {
                cart.value.push({ ...sanPham, quantity: 1 });
            }
        };

        // Method: Xoá hoặc giảm số lượng sản phẩm khỏi giỏ hàng
        const xoaKhoiGio = (index) => {
            cart.value.splice(index, 1);
        };

        // Hàm định dạng tiền tệ VND
        const formatVND = (value) => {
            return value.toLocaleString('vi-VN') + ' VND';
        };

        return {
            products,
            cart,
            tuKhoa,
            danhSachLoc,
            cartCount,
            tongTien,
            themVaoGio,
            xoaKhoiGio,
            formatVND
        };
    }
}).mount('#app');