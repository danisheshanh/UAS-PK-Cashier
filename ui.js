// Fungsi untuk menampilkan daftar menu
export function displayMenuList(menuItems) {
    const menuListElement = document.getElementById('menu-list');
    
    if (!menuListElement) return;
    
    // Kosongkan daftar menu
    menuListElement.innerHTML = '';
    
    // PERULANGAN: Menampilkan semua item menu
    for (let i = 0; i < menuItems.length; i++) {
        const menuItem = menuItems[i];
        
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.dataset.id = menuItem.id;
        
        // Format harga
        const formattedPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(menuItem.price);
        
        menuItemElement.innerHTML = `
            <h4>${menuItem.name}</h4>
            <div class="menu-price">${formattedPrice}</div>
            <div class="menu-category">${menuItem.category}</div>
        `;
        
        // Tambahkan event listener untuk memilih item
        menuItemElement.addEventListener('click', () => {
            const selectElement = document.getElementById('menu-select');
            selectElement.value = menuItem.id;
            updatePriceDisplay(menuItem.price);
            
            // Update status
            updateStatus(`"${menuItem.name}" dipilih`);
        });
        
        menuListElement.appendChild(menuItemElement);
    }
}

// Fungsi untuk mengisi dropdown menu
export function populateMenuDropdown(menuItems) {
    const selectElement = document.getElementById('menu-select');
    
    if (!selectElement) return;
    
    // Kosongkan dropdown
    selectElement.innerHTML = '';
    
    // PERULANGAN: Menambahkan option untuk setiap item menu
    for (let i = 0; i < menuItems.length; i++) {
        const menuItem = menuItems[i];
        
        const option = document.createElement('option');
        option.value = menuItem.id;
        option.textContent = `${menuItem.name} - ${formatPrice(menuItem.price)}`;
        
        selectElement.appendChild(option);
    }
    
    // Set nilai default dan tampilkan harga
    if (menuItems.length > 0) {
        updatePriceDisplay(menuItems[0].price);
    }
}

// Fungsi untuk menampilkan daftar pesanan
export function displayOrderItems(orders) {
    const orderItemsElement = document.getElementById('order-items');
    
    if (!orderItemsElement) return;
    
    // Kosongkan daftar pesanan
    orderItemsElement.innerHTML = '';
    
    if (orders.length === 0) {
        orderItemsElement.innerHTML = '<p class="empty-order">Belum ada pesanan. Silakan tambahkan item dari menu.</p>';
        return;
    }
    
    // PERULANGAN: Menampilkan semua pesanan
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        
        const orderItemElement = document.createElement('div');
        orderItemElement.className = 'order-item';
        
        const formattedPrice = formatPrice(order.total);
        
        orderItemElement.innerHTML = `
            <div class="order-item-info">
                <h4>${order.name}</h4>
                <div class="order-item-qty">${order.quantity} x ${formatPrice(order.price)}</div>
            </div>
            <div class="order-item-price">${formattedPrice}</div>
        `;
        
        orderItemsElement.appendChild(orderItemElement);
    }
}

// Fungsi untuk memperbarui tampilan ringkasan
export function updateSummaryDisplay(summary) {
    const subtotalElement = document.getElementById('subtotal');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) {
        subtotalElement.textContent = formatPrice(summary.subtotal);
    }
    
    if (discountElement) {
        discountElement.textContent = formatPrice(summary.discountAmount);
    }
    
    if (totalElement) {
        totalElement.textContent = formatPrice(summary.total);
    }
}

// Fungsi untuk memperbarui status
export function updateStatus(message) {
    const statusElement = document.getElementById('status');
    
    if (statusElement) {
        statusElement.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
        
        // Reset status setelah 5 detik
        setTimeout(() => {
            if (statusElement.innerHTML.includes(message)) {
                statusElement.innerHTML = '<i class="fas fa-info-circle"></i> Siap menerima pesanan...';
            }
        }, 5000);
    }
}

// Fungsi untuk memperbarui tampilan harga
export function updatePriceDisplay(price) {
    const priceElement = document.getElementById('item-price');
    
    if (priceElement) {
        priceElement.textContent = formatPrice(price);
    }
}

// Fungsi untuk memperbarui waktu
export function updateTimeDisplay() {
    const timeElement = document.getElementById('current-time');
    
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID');
        timeElement.textContent = timeString;
    }
}

// Fungsi untuk menampilkan struk
export function displayReceipt(orders, summary, isMember) {
    const receiptContentElement = document.getElementById('receipt-content');
    const modalElement = document.getElementById('receipt-modal');
    
    if (!receiptContentElement || !modalElement) return;
    
    // Buat konten struk
    let receiptHTML = `
        <div class="receipt-header">
            <h3>COFFEE SHOP CASHIER</h3>
            <p>Struk Pembayaran</p>
            <p>${new Date().toLocaleString('id-ID')}</p>
            <hr>
        </div>
        
        <div class="receipt-items">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="text-align: left; padding: 8px 0;">Item</th>
                        <th style="text-align: center; padding: 8px 0;">Qty</th>
                        <th style="text-align: right; padding: 8px 0;">Total</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // PERULANGAN: Menambahkan item ke struk
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const itemName = order.name.length > 15 ? order.name.substring(0, 15) + "..." : order.name;
        
        receiptHTML += `
            <tr>
                <td style="padding: 5px 0;">${itemName}</td>
                <td style="text-align: center; padding: 5px 0;">${order.quantity}</td>
                <td style="text-align: right; padding: 5px 0;">${formatPrice(order.total)}</td>
            </tr>
        `;
    }
    
    receiptHTML += `
                </tbody>
            </table>
            <hr>
        </div>
        
        <div class="receipt-summary">
            <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span>Subtotal:</span>
                <span>${formatPrice(summary.subtotal)}</span>
            </div>
    `;
    
    // PERCABANGAN: Menampilkan diskon jika ada
    if (summary.discountAmount > 0) {
        const discountRate = isMember ? 15 : (summary.subtotal > 100000 ? 5 : 0);
        
        receiptHTML += `
            <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <span>Diskon (${discountRate}%):</span>
                <span>${formatPrice(summary.discountAmount)}</span>
            </div>
        `;
    }
    
    receiptHTML += `
            <hr>
            <div style="display: flex; justify-content: space-between; margin: 10px 0; font-weight: bold; font-size: 1.2rem;">
                <span>TOTAL:</span>
                <span>${formatPrice(summary.total)}</span>
            </div>
        </div>
        
        <div class="receipt-footer">
            <p style="text-align: center; margin-top: 20px; font-style: italic;">
                Terima kasih telah berkunjung!
            </p>
        </div>
    `;
    
    receiptContentElement.innerHTML = receiptHTML;
    
    // Tampilkan modal
    modalElement.style.display = 'flex';
}

// Fungsi untuk memformat harga
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}