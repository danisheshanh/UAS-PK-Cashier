// Modul untuk menangani pesanan
import { getMenuItemById } from './menu.js';

// Array untuk menyimpan pesanan
let orders = [];

// Total dan diskon
let subtotal = 0;
let discountAmount = 0;
let total = 0;

// Fungsi untuk menambahkan item ke pesanan
export function addOrderItem(itemId, quantity, isMember = false) {
    // PERCABANGAN: Validasi input
    if (!itemId || quantity <= 0) {
        return { success: false, message: "Item atau jumlah tidak valid" };
    }
    
    // Cek apakah item sudah ada di pesanan
    const existingItemIndex = orders.findIndex(order => order.id === itemId);
    
    if (existingItemIndex !== -1) {
        // Jika item sudah ada, tambahkan jumlahnya
        orders[existingItemIndex].quantity += quantity;
        orders[existingItemIndex].total = orders[existingItemIndex].price * orders[existingItemIndex].quantity;
    } else {
        // Jika item belum ada, tambahkan item baru
        const menuItem = getMenuItemById(itemId);
        if (!menuItem) {
            return { success: false, message: "Item menu tidak ditemukan" };
        }
        
        const newOrder = {
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: quantity,
            total: menuItem.price * quantity
        };
        
        orders.push(newOrder);
    }
    
    // Hitung ulang subtotal
    calculateSubtotal();
    
    return { success: true, message: "Item berhasil ditambahkan ke pesanan" };
}

// Fungsi untuk menghitung subtotal
export function calculateSubtotal() {
    subtotal = 0;
    
    // PERULANGAN: Menghitung total semua pesanan
    for (let i = 0; i < orders.length; i++) {
        subtotal += orders[i].total;
    }
    
    return subtotal;
}

// Fungsi untuk menghitung total dengan diskon
export function calculateTotal(isMember = false) {
    calculateSubtotal();
    
    // PERCABANGAN: Logika diskon
    let discountRate = 0;
    
    // Kondisi 1: Diskon 5% jika subtotal > 100000
    if (subtotal > 100000) {
        discountRate += 0.05;
    }
    
    // Kondisi 2: Diskon tambahan 10% jika member
    if (isMember) {
        discountRate += 0.10;
    }
    
    discountAmount = subtotal * discountRate;
    total = subtotal - discountAmount;
    
    return {
        subtotal,
        discountRate: discountRate * 100,
        discountAmount,
        total
    };
}

// Fungsi untuk mendapatkan semua pesanan
export function getOrders() {
    return orders;
}

// Fungsi untuk menghapus item dari pesanan
export function removeOrderItem(itemId) {
    // PERULANGAN: Mencari item berdasarkan ID
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === itemId) {
            orders.splice(i, 1);
            calculateSubtotal();
            return { success: true, message: "Item berhasil dihapus dari pesanan" };
        }
    }
    
    return { success: false, message: "Item tidak ditemukan dalam pesanan" };
}

// Fungsi untuk mereset semua pesanan
export function resetOrders() {
    orders = [];
    subtotal = 0;
    discountAmount = 0;
    total = 0;
    
    return { success: true, message: "Semua pesanan telah direset" };
}

// Fungsi untuk mendapatkan ringkasan
export function getSummary() {
    return {
        subtotal,
        discountAmount,
        total,
        itemCount: orders.length
    };
}

