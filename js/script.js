"use strict";

/* =============================================================
   FAIRGAME SHOP - CORE SCRIPT
   =============================================================
   Everything the assignment brief requires lives in this file:

   1. Product data
   2. Small helpers (cart storage, product lookup)
   3. Mobile menu toggle
   4. Product cards (build + render)
   5. Shopping cart (add / remove / change quantity / total)
   6. Product details dialog (product detail view)
   7. Contact form validation
   8. Page start-up

   Purely decorative behaviour (particles, pointer tilt) lives in
   js/fx.js and starts itself independently, so this file works
   on its own even if fx.js is removed.
   ============================================================= */

/* =========================================================
   1. PRODUCT DATA
   This one array supplies the product cards, details dialog
   and shopping cart.
   ========================================================= */
const products = [
    {
        id: 1,
        name: "Tt eSPORTS Gaming Keyboard",
        category: "Keyboard",
        price: 59.99,
        image: "../media/images/product1.png",
        alt: "Black gaming keyboard with blue illuminated keys",
        description: "A full-size wired keyboard with blue lighting and responsive keys for everyday gaming.",
        accent: "#248cff"
    },
    {
        id: 2,
        name: "Spectrum RGB Gaming Mouse",
        category: "Mouse",
        price: 34.99,
        image: "../media/images/product2.png",
        alt: "Gaming mouse with colourful RGB lighting",
        description: "A comfortable wired gaming mouse with adjustable controls and bright RGB lighting.",
        accent: "#ff356b"
    },
    {
        id: 3,
        name: "Vortex Gaming Headset",
        category: "Headset",
        price: 49.99,
        image: "../media/images/prdukt3.png",
        alt: "Black over-ear gaming headset with purple lighting",
        description: "An over-ear headset with soft ear cushions, clear sound and a lightweight adjustable frame.",
        accent: "#9d5cff"
    },
    {
        id: 4,
        name: "Velocity Ultra-Wide Gaming Monitor",
        category: "Monitor",
        price: 349.99,
        image: "../media/images/product4.png",
        alt: "Ultra-wide gaming monitor displaying a neon racing scene",
        description: "A wide gaming display designed for immersive racing, action and multitasking.",
        accent: "#20d9ff"
    },
    {
        id: 5,
        name: "Apex Ergonomic Gaming Chair",
        category: "Chair",
        price: 279.99,
        image: "../media/images/product5.webp",
        alt: "Black and silver ergonomic gaming chair with adjustable armrests",
        description: "A supportive adjustable chair with a high back, padded seat and ergonomic controls.",
        accent: "#71e36f"
    },
    {
        id: 6,
        name: "Pulse RGB Streaming Microphone",
        category: "Microphone",
        price: 89.99,
        image: "../media/images/product6.webp",
        alt: "Black desktop microphone with orange and red RGB lighting",
        description: "A desktop microphone with a shock mount and clear voice capture for gaming and streaming.",
        accent: "#ff8a24"
    },
    {
        id: 7,
        name: "Nova Wireless Game Controller",
        category: "Controller",
        price: 64.99,
        image: "../media/images/product7.webp",
        alt: "White and dark blue wireless game controller",
        description: "A responsive wireless controller with dual analogue sticks and a comfortable grip.",
        accent: "#78a8ff"
    },
    {
        id: 8,
        name: "Vortex Triple-Fan RGB Graphics Card",
        category: "Graphics Card",
        price: 599.99,
        image: "../media/images/product8.png",
        alt: "Black graphics card with three RGB illuminated cooling fans",
        description: "A triple-fan graphics card designed for smooth gaming performance and effective cooling.",
        accent: "#d85cff"
    },
    {
        id: 9,
        name: "ROG Zephyrus Gaming Laptop",
        category: "Laptop",
        price: 1499.99,
        image: "../media/images/product9.png",
        alt: "Dark grey ROG gaming laptop with a colourful screen",
        description: "A portable gaming laptop with a high-refresh display and performance-focused hardware.",
        accent: "#3f7cff"
    },
    {
        id: 10,
        name: "Vengeance RGB Gaming PC",
        category: "Gaming PC",
        price: 1299.99,
        image: "../media/images/product10.avif",
        alt: "Black glass-sided gaming PC with pink, orange and yellow RGB fans",
        description: "A complete gaming desktop with liquid cooling, a glass case and synchronised RGB lighting.",
        accent: "#ff4f70"
    },
    {
        id: 11,
        name: "Command RGB Gaming Desk",
        category: "Desk",
        price: 229.99,
        image: "../media/images/product11.png",
        alt: "Black gaming desk with RGB illuminated corners",
        description: "A wide gaming desk with a shaped work surface, sturdy frame and integrated RGB lighting.",
        accent: "#00e0c6"
    },
    {
        id: 12,
        name: "Halo RGB Gaming Mouse Pad",
        category: "Mouse Pad",
        price: 39.99,
        image: "../media/images/product12.png",
        alt: "Black rectangular gaming mouse pad with an RGB illuminated edge",
        description: "A large smooth mouse pad with a non-slip base and colourful illuminated border.",
        accent: "#ffd84a"
    }
];

const cartStorageKey = "fairgame-cart";

/* =========================================================
   2. SMALL HELPERS
   ========================================================= */
function getCart() {
    return JSON.parse(localStorage.getItem(cartStorageKey)) || {};
}

function saveCart(cart) {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    updateCartCount();
}

function findProduct(productId) {
    return products.find((product) => product.id === Number(productId));
}

/* =========================================================
   3. MOBILE MENU
   ========================================================= */
function initialiseMobileMenu() {
    const button = document.querySelector(".menu-toggle");
    const menu = document.getElementById("main-navigation");

    if (!button || !menu) {
        return;
    }

    function closeMenu() {
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open menu");
        menu.classList.remove("is-open");
    }

    button.addEventListener("click", () => {
        const menuIsOpen = button.getAttribute("aria-expanded") === "true";

        if (menuIsOpen) {
            closeMenu();
        } else {
            button.setAttribute("aria-expanded", "true");
            button.setAttribute("aria-label", "Close menu");
            menu.classList.add("is-open");
        }
    });

    menu.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        const menuIsOpen = button.getAttribute("aria-expanded") === "true";

        if (event.key === "Escape" && menuIsOpen) {
            closeMenu();
            button.focus();
        }
    });
}

/* =========================================================
   4. PRODUCT CARDS
   ========================================================= */
function createProductCard(product) {
    return `
        <article class="product-card" style="
            --card-accent: ${product.accent};
            --float-delay: -${product.id * 0.55}s;
        ">
            <div class="product-image">
                <img src="${product.image}" alt="${product.alt}">
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3>${product.name}</h3>
                <div class="product-bottom">
                    <p class="product-price">&pound;${product.price.toFixed(2)}</p>
                    <div class="product-actions">
                        <button class="secondary-button" type="button"
                            data-action="details" data-product-id="${product.id}">
                            Details
                        </button>
                        <button type="button" data-action="add"
                            data-product-id="${product.id}">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function renderProducts(containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    const visibleProducts = containerId === "featured-products"
        ? products.slice(0, 3)
        : products;

    container.innerHTML = visibleProducts.map(createProductCard).join("");
}

/* =========================================================
   5. CART
   ========================================================= */
function updateCartCount() {
    const itemCount = Object.values(getCart()).reduce(
        (total, quantity) => total + quantity,
        0
    );

    document.querySelectorAll(".cart-count").forEach((element) => {
        element.textContent = itemCount;
    });
}

function showShopMessage(message) {
    let messageElement = document.getElementById("shop-message");

    if (!messageElement) {
        messageElement = document.createElement("p");
        messageElement.id = "shop-message";
        messageElement.className = "shop-message";
        messageElement.setAttribute("aria-live", "polite");
        document.body.append(messageElement);
    }

    messageElement.textContent = message;
    messageElement.classList.add("is-visible");

    window.setTimeout(() => {
        messageElement.classList.remove("is-visible");
    }, 2200);
}

function addToCart(productId) {
    const cart = getCart();
    cart[productId] = (cart[productId] || 0) + 1;
    saveCart(cart);

    const product = findProduct(productId);
    showShopMessage(`${product.name} added to cart.`);
}

function changeQuantity(productId, change) {
    const cart = getCart();
    cart[productId] = (cart[productId] || 0) + change;

    if (cart[productId] <= 0) {
        delete cart[productId];
    }

    saveCart(cart);
    renderCart();
}

function removeFromCart(productId) {
    const cart = getCart();
    delete cart[productId];
    saveCart(cart);
    renderCart();
}

function renderCart() {
    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    if (!container || !totalElement) {
        return;
    }

    const cart = getCart();
    const cartEntries = Object.entries(cart);

    if (cartEntries.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some gaming gear to see it here.</p>
                <a class="button" href="products.html">Browse products</a>
            </div>
        `;
        totalElement.textContent = "£0.00";
        return;
    }

    let total = 0;

    container.innerHTML = cartEntries.map(([productId, quantity]) => {
        const product = findProduct(productId);
        const itemTotal = product.price * quantity;
        total += itemTotal;

        return `
            <article class="cart-item">
                <img src="${product.image}" alt="">
                <div class="cart-item-info">
                    <p class="product-category">${product.category}</p>
                    <h2>${product.name}</h2>
                    <p>&pound;${product.price.toFixed(2)} each</p>
                </div>
                <div class="quantity-controls" aria-label="Quantity for ${product.name}">
                    <button type="button" data-action="decrease"
                        data-product-id="${product.id}" aria-label="Decrease quantity">−</button>
                    <span aria-live="polite">${quantity}</span>
                    <button type="button" data-action="increase"
                        data-product-id="${product.id}" aria-label="Increase quantity">+</button>
                </div>
                <p class="cart-item-total">&pound;${itemTotal.toFixed(2)}</p>
                <button class="remove-button" type="button" data-action="remove"
                    data-product-id="${product.id}">Remove</button>
            </article>
        `;
    }).join("");

    totalElement.textContent = `£${total.toFixed(2)}`;
}

/* =========================================================
   6. PRODUCT DETAILS DIALOG
   ========================================================= */
function createProductDialog() {
    const dialog = document.createElement("dialog");
    dialog.id = "product-dialog";
    dialog.className = "product-dialog";
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
    document.body.append(dialog);
}

function openProductDetails(productId) {
    const product = findProduct(productId);
    const dialog = document.getElementById("product-dialog");

    dialog.style.setProperty("--card-accent", product.accent);
    dialog.innerHTML = `
        <button class="dialog-close" type="button" data-action="close-dialog"
            aria-label="Close product details">×</button>
        <img src="${product.image}" alt="${product.alt}">
        <div>
            <p class="product-category">${product.category}</p>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p class="product-price">&pound;${product.price.toFixed(2)}</p>
            <button type="button" data-action="add" data-product-id="${product.id}">
                Add to cart
            </button>
        </div>
    `;

    dialog.showModal();
}

function handleShopClick(event) {
    const button = event.target.closest("[data-action]");

    if (!button) {
        return;
    }

    const productId = button.dataset.productId;

    switch (button.dataset.action) {
        case "add":
            addToCart(productId);
            break;
        case "details":
            openProductDetails(productId);
            break;
        case "increase":
            changeQuantity(productId, 1);
            break;
        case "decrease":
            changeQuantity(productId, -1);
            break;
        case "remove":
            removeFromCart(productId);
            break;
        case "close-dialog":
            document.getElementById("product-dialog").close();
            break;
    }
}

/* =========================================================
   7. CONTACT FORM
   ========================================================= */
function validateContactForm() {
    const form = document.getElementById("contact-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = form.elements.name;
        const email = form.elements.email;
        const message = form.elements.message;
        const feedback = document.getElementById("form-message");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const invalidFields = [];

        [name, email, message].forEach((field) => {
            field.removeAttribute("aria-invalid");
        });

        if (name.value.trim().length < 2) {
            invalidFields.push(name);
        }

        if (!emailPattern.test(email.value.trim())) {
            invalidFields.push(email);
        }

        if (message.value.trim().length < 10) {
            invalidFields.push(message);
        }

        if (invalidFields.length > 0) {
            invalidFields.forEach((field) => field.setAttribute("aria-invalid", "true"));
            feedback.className = "form-message error";
            feedback.textContent = "Please complete every field correctly.";
            invalidFields[0].focus();
            return;
        }

        feedback.className = "form-message success";
        feedback.textContent = "Thank you. Your message has been validated successfully.";
        form.reset();
    });
}

/* =========================================================
   8. PAGE START
   Each function safely exits when its matching page element
   is not present, so the same script works on every page.
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    initialiseMobileMenu();
    createProductDialog();
    renderProducts("featured-products");
    renderProducts("product-list");
    renderCart();
    updateCartCount();
    validateContactForm();
    document.addEventListener("click", handleShopClick);
});
