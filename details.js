document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"), 10);

  function fetchProduct(id) {
    return fetch("products.json")
      .then((response) => response.json())
      .then((data) => data.products.find((product) => product.id === id));
  }

  function displayProduct(product) {
    const productDetails = document.getElementById("product-details");
    productDetails.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}" width="300">
            <p>${product.description}</p>
            <p>Preț: ${product.price} RON</p>
            <p>Stoc: ${product.stock}</p>
            <label for="quantity">Cantitate:</label>
            <input type="number" id="quantity" min="1" max="${product.stock}" value="1">
            <button id="add-to-cart">Adaugă în coș</button>
        `;

    document
      .getElementById("add-to-cart")
      .addEventListener("click", function () {
        addToCart(product.id);
      });
  }

  function addToCart(productId) {
    const quantityInput = document.getElementById("quantity");
    const quantity = parseInt(quantityInput.value, 10);
    if (quantity <= 0) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item) => item.id === productId);

    if (productIndex > -1) {
      cart[productIndex].quantity += quantity;
    } else {
      cart.push({ id: productId, quantity: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produsul a fost adăugat în coș!");
  }

  fetchProduct(productId).then((product) => {
    if (product) displayProduct(product);
    else
      document.getElementById("product-details").innerHTML =
        "<p>Produsul nu a fost găsit.</p>";
  });
});
