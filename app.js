// Aplikasi utama kalkulator kasir coffee shop
import { getAllMenuItems, getMenuItemById, formatPrice } from './menu.js';
import { 
    addOrderItem, 
    getOrders, 
    calculateTotal, 
    resetOrders, 
    getSummary,
    removeOrderItem 
} from './order.js';
import { 
    displayMenuList, 
    populateMenuDropdown, 
    displayOrderItems, 
    updateSummaryDisplay, 
    updateStatus, 
    updateTimeDisplay,
    updatePriceDisplay,
    displayReceipt 
} from './ui.js';

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Ambil data menu
    const menuItems = getAllMenuItems();
    
    // Inisialisasi tampilan
    initializeUI(menuItems);
    
    // Setup event listeners
    setupEventListeners(menuItems);
    
    // Update waktu setiap detik
    setInterval(updateTimeDisplay, 1000);
    updateTimeDisplay();
    
    console.log("Aplikasi Coffee Shop Cashier telah dimuat!");
});

// Fungsi untuk inisialisasi UI
function initializeUI(menuItems) {
    // Tampilkan daftar menu
    displayMenuList(menuItems);
    
    // Isi dropdown menu
    populateMenuDropdown(menuItems);
    
    // Tampilkan pesanan kosong
    displayOrderItems([]);
    
    // Update ringkasan awal
    updateSummaryDisplay({
        subtotal: 0,
        discountAmount: 0,
        total: 0
    });
    
    // Update status
    updateStatus("Aplikasi siap digunakan. Silakan pilih menu.");
}

// Fungsi untuk setup event listeners
function setupEventListeners(menuItems) {
    // Event listener untuk dropdown menu
    const menuSelect = document.getElementById('menu-select');
    if (menuSelect) {
        menuSelect.addEventListener('change', function() {
            const selectedId = parseInt(this.value);
            const selectedItem = getMenuItemById(selectedId);
            
            if (selectedItem) {
                updatePriceDisplay(selectedItem.price);
                updateStatus(`"${selectedItem.name}" dipilih`);
            }
        });
    }
    
    // Event listener untuk tombol tambah pesanan
    const addToOrderBtn = document.getElementById('add-to-order');
    if (addToOrderBtn) {
        addToOrderBtn.addEventListener('click', function() {
            addItemToOrder();
        });
    }
    
    // Event listener untuk tombol kuantitas
    const decreaseQtyBtn = document.getElementById('decrease-qty');
    const increaseQtyBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity');
    
    if (decreaseQtyBtn) {
        decreaseQtyBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }
    
    if (increaseQtyBtn) {
        increaseQtyBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue < 20) {
                quantityInput.value = currentValue + 1;
            }
        });
    }
    
    // Event listener untuk tombol hitung total
    const calculateTotalBtn = document.getElementById('calculate-total');
    if (calculateTotalBtn) {
        calculateTotalBtn.addEventListener('click', function() {
            calculateOrderTotal();
        });
    }
    
    // Event listener untuk tombol reset pesanan
    const resetOrderBtn = document.getElementById('reset-order');
    if (resetOrderBtn) {
        resetOrderBtn.addEventListener('click', function() {
            resetOrder();
        });
    }
    
    // Event listener untuk tombol cetak struk
    const printReceiptBtn = document.getElementById('print-receipt');
    if (printReceiptBtn) {
        printReceiptBtn.addEventListener('click', function() {
            printReceipt();
        });
    }
    
    // Event listener untuk modal struk
    const closeModalBtn = document.querySelector('.close-modal');
    const modal = document.getElementById('receipt-modal');
    
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Tutup modal saat klik di luar konten
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Fungsi untuk menambahkan item ke pesanan
function addItemToOrder() {
    const menuSelect = document.getElementById('menu-select');
    const quantityInput = document.getElementById('quantity');
    
    if (!menuSelect || !quantityInput) return;
    
    const itemId = parseInt(menuSelect.value);
    const quantity = parseInt(quantityInput.value) || 1;
    
    // Validasi input
    if (isNaN(itemId) || isNaN(quantity) || quantity <= 0) {
        updateStatus("Jumlah harus angka positif!");
        return;
    }
    
    // Tambahkan item ke pesanan
    const result = addOrderItem(itemId, quantity);
    
    if (result.success) {
        // Tampilkan pesanan terbaru
        const orders = getOrders();
        displayOrderItems(orders);
        
        // Update ringkasan
        const summary = getSummary();
        updateSummaryDisplay(summary);
        
        // Update status
        const menuItem = getMenuItemById(itemId);
        updateStatus(`"${menuItem.name}" (${quantity}x) ditambahkan ke pesanan`);
        
        // Reset jumlah ke 1
        quantityInput.value = 1;
    } else {
        updateStatus(result.message);
    }
}

// Fungsi untuk menghitung total pesanan
function calculateOrderTotal() {
    const orders = getOrders();
    
    if (orders.length === 0) {
        updateStatus("Belum ada pesanan untuk dihitung!");
        return;
    }
    
    const memberCheckbox = document.getElementById('member-checkbox');
    const isMember = memberCheckbox ? memberCheckbox.checked : false;
    
    // Hitung total dengan diskon
    const result = calculateTotal(isMember);
    
    // Update ringkasan
    updateSummaryDisplay({
        subtotal: result.subtotal,
        discountAmount: result.discountAmount,
        total: result.total
    });
    
    // Update status dengan detail diskon
    let discountMessage = "";
    if (result.discountRate > 0) {
        discountMessage = ` Diskon ${result.discountRate}% diterapkan.`;
    }
    
    updateStatus(`Total berhasil dihitung.${discountMessage}`);
}

// Fungsi untuk mereset pesanan
function resetOrder() {
    if (getOrders().length === 0) {
        updateStatus("Tidak ada pesanan untuk direset");
        return;
    }
    
    // Konfirmasi reset
    if (confirm("Apakah Anda yakin ingin mereset semua pesanan?")) {
        const result = resetOrders();
        
        if (result.success) {
            // Update tampilan
            displayOrderItems([]);
            updateSummaryDisplay({
                subtotal: 0,
                discountAmount: 0,
                total: 0
            });
            
            // Reset checkbox member
            const memberCheckbox = document.getElementById('member-checkbox');
            if (memberCheckbox) {
                memberCheckbox.checked = false;
            }
            
            updateStatus(result.message);
        }
    }
}

// Fungsi untuk mencetak struk
function printReceipt() {
    const orders = getOrders();
    
    if (orders.length === 0) {
        updateStatus("Tidak ada pesanan untuk dicetak struk");
        return;
    }
    
    const memberCheckbox = document.getElementById('member-checkbox');
    const isMember = memberCheckbox ? memberCheckbox.checked : false;
    
    const summary = getSummary();
    
    // Hitung total jika belum dihitung
    if (summary.total === 0) {
        calculateOrderTotal();
    }
    
    // Tampilkan struk
    displayReceipt(orders, summary, isMember);
    updateStatus("Struk berhasil dibuat");
}