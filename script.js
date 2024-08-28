document.addEventListener("DOMContentLoaded", () => {
  fetch("products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const productsContainer = document.getElementById("products-container");
      data.products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <p>Stock: ${product.stock}</p>
                    <button onclick="addToCart(${
                      product.id
                    })">Adaugă în Coș</button>
                `;

        productsContainer.appendChild(productDiv);
      });
    })
    .catch((error) => console.error("Error loading products:", error));
});

function addToCart(productId) {
  console.log("Add to cart:", productId);
  // Get the cart from local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  // Save the updated cart back to local storage
  localStorage.setItem("cart", JSON.stringify(cart));
}
