// التحقق من تسجيل الدخول
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html"; //
}
const API_URL = "http://localhost:3004";

// عناصر الـ DOM
const productsTableBody = document.getElementById("productsTableBody");
const productModal = document.getElementById("productModal");
const productForm = document.getElementById("productForm");
const modalTitle = document.getElementById("modalTitle");
const productIdInput = document.getElementById("productId");
const typenameInput = document.getElementById("typename");
const modelInput = document.getElementById("Model");
const priceInput = document.getElementById("price");
const searchInput = document.getElementById("searchInput");

// أول ما الصفحة تفتح، جيب كل المنتجات
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

// دالة جلب كل المنتجات وعرضها في الجدول
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// دالة رسم الجدول
function renderProducts(products) {
    productsTableBody.innerHTML = "";
    
    if (products.length === 0) {
        productsTableBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-gray-500">No products found</td></tr>`;
        return;
    }

    products.forEach(product => {
        const row = document.createElement("tr");
        row.className = "hover:bg-gray-50 border-b";
        row.innerHTML = `
            <td class="p-4 text-gray-700">${product.id}</td>
            <td class="p-4 text-gray-700">${product.typename}</td>
            <td class="p-4 text-gray-700">${product.Model}</td>
            <td class="p-4 text-gray-700">$${product.price}</td>
            <td class="p-4 text-center space-x-2">
                <button onclick="openEditModal(${product.id}, '${product.typename}', '${product.Model}', ${product.price})" 
                    class="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm transition">Edit</button>
                <button onclick="deleteProduct(${product.id})" 
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition">Delete</button>
            </td>
        `;
        productsTableBody.appendChild(row);
    });
}

// اضافة مودال جديد
function openModal() {
    modalTitle.innerText = "Add New Product";
    productForm.reset();
    productIdInput.value = "";
    productModal.classList.remove("hidden");
}

// فتح مودال التعديل مع تعبئة البيانات

function openEditModal(id, typename, model, price) {
    modalTitle.innerText = "Edit Product";
    productIdInput.value = id;
    typenameInput.value = typename;
    modelInput.value = model;
    priceInput.value = price;
    productModal.classList.remove("hidden");
}

// غلق المودال
function closeModal() {
    productModal.classList.add("hidden");
}

// التعامل مع فورم الحفظ ( إضافة أو تعديل)
productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const id = productIdInput.value;
    const productData = {
        typename: typenameInput.value,
        Model: modelInput.value,
        price: parseFloat(priceInput.value)
    };

    try {
        let response;
        if (id) {
            // تحديث منتج (PUT)
            response = await fetch(`${API_URL}/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData)
            });
        } else {
            // إضافة منتج جديد (POST)
            response = await fetch(`${API_URL}/product`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData)
            });
        }

        if (response.ok) {
            closeModal();
            fetchProducts(); // تحديث الجدول فوراً
        } else {
            const err = await response.json();
            alert(err.error || err.message || "Something went wrong");
        }
    } catch (error) {
        console.error("Error saving product:", error);
    }
});

// دالة حذف منتج
async function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                fetchProducts();
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
}

// شريط البحث اللحظي (Live Search)
searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.trim();
    if (!query) {
        fetchProducts();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/products/search?brand=${encodeURIComponent(query)}`);
        if (response.ok) {
            const products = await response.json();
            renderProducts(products);
        } else {
            productsTableBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-gray-500">No products found</td></tr>`;
        }
    } catch (error) {
        console.error("Error searching:", error);
    }
});


function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "login.html";
}