// Modul data menu coffee shop
export const menuItems = [
    { id: 1, name: "Espresso", price: 25000, category: "minuman" },
    { id: 2, name: "Cappuccino", price: 30000, category: "minuman" },
    { id: 3, name: "Latte", price: 32000, category: "minuman" },
    { id: 4, name: "Mocha", price: 35000, category: "minuman" },
    { id: 5, name: "Americano", price: 27000, category: "minuman" },
    { id: 6, name: "Macchiato", price: 33000, category: "minuman" },
    { id: 7, name: "Flat White", price: 31000, category: "minuman" },
    { id: 8, name: "Cold Brew", price: 29000, category: "minuman" },
    { id: 9, name: "Iced Coffee", price: 28000, category: "minuman" },
    { id: 10, name: "Hot Chocolate", price: 26000, category: "minuman" },
    { id: 11, name: "Tea", price: 20000, category: "minuman" },
    { id: 12, name: "Croissant", price: 25000, category: "makanan" },
    { id: 13, name: "Muffin", price: 22000, category: "makanan" },
    { id: 14, name: "Sandwich", price: 35000, category: "makanan" },
    { id: 15, name: "Cake Slice", price: 28000, category: "makanan" }
];

// Fungsi untuk mendapatkan semua item menu
export function getAllMenuItems() {
    return menuItems;
}

// Fungsi untuk mendapatkan item menu berdasarkan ID
export function getMenuItemById(id) {
    return menuItems.find(item => item.id === id);
}

// Fungsi untuk memformat harga ke format Rupiah
export function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Fungsi untuk mendapatkan item menu berdasarkan nama
export function getMenuItemByName(name) {
    return menuItems.find(item => item.name === name);
}