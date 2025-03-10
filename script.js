// Variables globales
let cart = [];
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const closeCart = document.getElementById("close-cart");
const totalAmount = document.getElementById("total-amount");
const totalProducts = document.getElementById("total-products");
const checkoutBtn = document.getElementById("checkout-btn");
const cartCount = document.getElementById("cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Función para actualizar el carrito
const updateCart = () => {
    cartItems.innerHTML = "";
    let total = 0, totalItems = 0;
    
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        totalItems += item.quantity;
        
        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString("es-CO")} 
            <button class="remove-btn" data-index="${index}">❌</button>
        `;
        cartItems.appendChild(li);
    });
    
    cartCount.textContent = totalItems;
    totalProducts.textContent = totalItems;
    totalAmount.textContent = `$${total.toLocaleString("es-CO")}`;
};

// Función para agregar productos al carrito
const addToCart = (name, price) => {
    let product = cart.find(item => item.name === name);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
};

// Función para eliminar productos del carrito
cartItems.addEventListener("click", event => {
    if (event.target.classList.contains("remove-btn")) {
        let index = event.target.getAttribute("data-index");
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCart();
    }
});

// Función para abrir/cerrar el carrito
const toggleCart = (isOpen) => {
    cartModal.style.display = isOpen ? "flex" : "none";
    cartModal.style.opacity = isOpen ? "1" : "0";
};

cartBtn.addEventListener("click", () => toggleCart(true));
closeCart.addEventListener("click", () => toggleCart(false));

// Función para finalizar compra
checkoutBtn.addEventListener("click", () => {
    if (!cart.length) return alert("Tu carrito está vacío.");
    
    let totalCompra = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let totalProductos = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    if (confirm(`🛒 Resumen de tu compra 🛒\n\n📦 Total de productos: ${totalProductos}\n💰 Total a pagar: $${totalCompra.toLocaleString("es-CO")}\n\n¿Deseas confirmar tu compra?`)) {
        alert("🎉 Gracias por comprar en CleanPro Service. ¡Esperamos verte pronto! ✨");
        cart = [];
        updateCart();
        toggleCart(false);
    }
});

// Asignar eventos a los botones de agregar al carrito
addToCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        let productCard = event.target.closest(".product-card");
        let name = productCard.querySelector("h3").textContent;
        let price = parseFloat(productCard.querySelector("p").textContent.replace("$", "").replace(",", ""));
        addToCart(name, price);
    });
});


// Variables para el modal de envío
const shippingModal = document.getElementById("shipping-modal");
const closeShipping = document.getElementById("close-shipping");
const shippingForm = document.getElementById("shipping-form");

// Evento para cerrar el modal de envío
closeShipping.addEventListener("click", () => {
    shippingModal.style.display = "none";
});

// Modificar la función de finalizar compra para abrir el formulario
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    cartModal.style.display = "none"; // Cierra el carrito
    shippingModal.style.display = "flex"; // Abre el formulario de envío
});

// Evento para confirmar el pedido
shippingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    alert(`📦 Pedido Confirmado\n\n🧑 Nombre: ${name}\n🏡 Dirección: ${address}\n📞 Teléfono: ${phone}\n\n¡Gracias por tu compra! 🚀`);

    shippingModal.style.display = "none"; // Cierra el modal
    cart = []; // Vacía el carrito
    updateCart(); // Actualiza la interfaz
});

// Variable para el mensaje de confirmación
const orderConfirmation = document.getElementById("order-confirmation");

// Evento para finalizar la compra y abrir el formulario de envío
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    shippingModal.style.display = "flex"; // Abre el modal de datos personales
});

// Evento para manejar el envío del formulario
shippingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    if (name.trim() === "" || address.trim() === "" || phone.trim() === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Mostrar mensaje de confirmación
    orderConfirmation.style.display = "block";

    // Limpiar formulario
    shippingForm.reset();

    // Cerrar el modal después de 1 segundo
    setTimeout(() => {
        shippingModal.style.display = "none";
    }, 1000);

    // Vaciar carrito y actualizar interfaz
    cart = [];
    updateCart();
});
