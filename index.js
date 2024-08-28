document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

function fetchProducts() {
  fetch("products.json") // Asigură-te că fișierul `products.json` este în locația corectă
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      displayProducts(data.products);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function displayProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Preț: $${product.price.toFixed(2)}</p>
            <p>Stoc: ${product.stock}</p>
            <input type="number" id="quantity-${product.id}" min="1" max="${
      product.stock
    }" value="1">
            <button onclick="addToCart(${product.id})">Adaugă în Coș</button>
        `;

    container.appendChild(productDiv);
  });
}

function addToCart(productId) {
  const quantityInput = document.getElementById(`quantity-${productId}`);
  const quantity = parseInt(quantityInput.value, 10);

  if (isNaN(quantity) || quantity <= 0) {
    alert("Cantitatea trebuie să fie un număr pozitiv.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produsul a fost adăugat în coș!");
}
