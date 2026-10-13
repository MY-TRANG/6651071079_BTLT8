// script.js - Xử lý toggle menu mobile cho Tailwind CSS
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('#mobile-menu-button');
    const menu = document.querySelector('#mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            // Toggle các class hidden/flex để ẩn/hiện menu trên mobile
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
        });
    }
});