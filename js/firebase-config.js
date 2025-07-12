// Import the functions you need from the SDKs you need
// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
    getFirestore,
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC17HKcyfLfEncUHV2u5u0NargzyUz24Vc",
    authDomain: "jsi04-a4502.firebaseapp.com",
    projectId: "jsi04-a4502",
    storageBucket: "jsi04-a4502.firebasestorage.app",
    messagingSenderId: "184028077572",
    appId: "1:184028077572:web:dd5649ab4fb41c27b79f51",
    measurementId: "G-3ED59SS1TN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Cloud Firestore and get a reference to the service

// const querySnapshot = await getDocs(collection(db, "mobile"));
// querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
// });.
// Display products in mobile-products section
async function displayMobileProducts() {
    try {
        const productCollection = collection(db, "mobile");
        const querySnapshot = await getDocs(productCollection);

        // Get the mobile products container
        let productGrid = document.querySelector("#mobile-products .product-grid");

        // If product-grid doesn't exist, create it
        if (!productGrid) {
            const mobileProductsSection = document.querySelector("#mobile-products .container .row");
            if (mobileProductsSection) {
                productGrid = document.createElement("div");
                productGrid.className = "product-grid row g-4 mt-3";
                mobileProductsSection.appendChild(productGrid);
            }
        }

        if (!productGrid) {
            console.error("Mobile products container not found");
            return;
        }

        // Clear existing products
        productGrid.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            console.log("🚀 ~ Product data:", product);

            // Create product card
            const productCard = createProductCard(product, doc.id);
            productGrid.appendChild(productCard);
        });

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Create individual product card
function createProductCard(product, productId) {
    const cardCol = document.createElement("div");
    cardCol.className = "col-lg-4 col-md-6 col-sm-12";

    cardCol.innerHTML = `
        <div class="product-card h-100 border-0 shadow-sm rounded-3 overflow-hidden position-relative">
            <div class="product-image-container position-relative">
                <img src="${product.thumbnail || 'images/product-item1.jpg'}" 
                     alt="${product.Name}" 
                     class="product-image img-fluid w-100"
                     style="height: 250px; object-fit: cover;"
                     onerror="this.src='images/product-item1.jpg'">
                <div class="product-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                    <div class="product-actions">
                        <button class="btn btn-primary btn-sm me-2" onclick="addToCart('${productId}')">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="btn btn-outline-primary btn-sm" onclick="viewProduct('${productId}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body p-3">
                <div class="product-category">
                    <span class="badge bg-secondary mb-2">${product.Category || 'Mobile'}</span>
                </div>
                <h5 class="card-title text-dark mb-2">${product.Name}</h5>
                <p class="product-price text-primary fw-bold fs-5 mb-2">
                    ${formatPrice(product.Price)} VND
                </p>
                <p class="product-info text-muted small mb-3" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                    ${product.Information || 'No description available'}
                </p>
                <div class="product-specs mt-auto">
                    <small class="text-muted">
                        <i class="fas fa-mobile-alt"></i> ${product.Category}
                    </small>
                </div>
            </div>
        </div>
    `;

    // Add hover effects
    const card = cardCol.querySelector('.product-card');
    const overlay = cardCol.querySelector('.product-overlay');

    card.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
        card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
        card.style.transform = 'translateY(0)';
    });

    return cardCol;
}

// Format price with thousands separator
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price);
}

// Add to cart functionality
function addToCart(productId) {
    console.log('Adding product to cart:', productId);
    showNotification('Product added to cart!', 'success');
}

// View product functionality
function viewProduct(productId) {
    console.log('Viewing product:', productId);
    // You can implement navigation to product detail page here
    window.location.href = `sanpham1.html?id=${productId}`;
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.toast-notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `toast-notification alert alert-${type === 'success' ? 'success' : 'info'} position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        transform: translateX(400px);
        transition: all 0.3s ease;
    `;

    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayMobileProducts();
});

// Also call the function when the script loads
displayMobileProducts();