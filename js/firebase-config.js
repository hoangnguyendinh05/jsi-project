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
async function displayProducts() {
    const productCollection = collection(db, "mobile");
    const querySnapshot = await getDocs(productCollection);

    const swiperWrapper = document.querySelector(".swiper-wrapper-2");
    console.log("🚀 ~ displayProducts ~ swiperWrapper:", swiperWrapper)

    querySnapshot.forEach((doc) => {
        const product = doc.data();

        // Create a swiper-slide element
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        // Add product content to the slide
        slide.innerHTML = `
            <div class="product-card position-relative">
                <div class="image-holder">
                  <img src="images/product-item1.jpg" alt="product-item" class="img-fluid">

                </div>
                <div class="cart-concern position-absolute">
                    <div class="cart-button d-flex">
                        <a href="#" class="btn btn-medium btn-black">Add to Cart</a>
                    </div>
                </div>
                <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
                    <h3 class="card-title text-uppercase">
                        <a href="#">${product.Name}</a>
                    </h3>
                    <span class="item-price text-primary">${product.Price} VND</span>
                </div>
                <p class="product-info">${product.Information}</p>
            </div>
        `;

        // Append the slide to the swiper-wrapper
        swiperWrapper.appendChild(slide);
    });

    // Reinitialize Swiper after adding slides

}

// Call the function to display products
displayProducts();