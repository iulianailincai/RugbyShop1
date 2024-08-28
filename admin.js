document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("product-id").value;
    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const stock = parseInt(document.getElementById("product-stock").value, 10);
    const image = document.getElementById("product-image").value;

    const product = { id, name, description, price, stock, image };
    saveProduct(product);
  });
});

function loadProducts() {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector("#products-table tbody");
      tbody.innerHTML = "";

      data.products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.stock}</td>
                    <td><img src="${product.image}" alt="${
          product.name
        }" style="max-width: 100px;"></td>
                    <td>
                        <button onclick="editProduct(${
                          product.id
                        })">Edit</button>
                        <button onclick="removeProduct(${
                          product.id
                        })">Remove</button>
                    </td>
                `;
        tbody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error loading products:", error));
}

function saveProduct(product) {
  // Here, you would send the product to the server (using POST or PUT)
  console.log("Saving product:", product);

  // For the purpose of this example, we'll simply reload the products
  loadProducts();
}

function removeProduct(productId) {
  // Here, you would send a DELETE request to the server
  console.log("Removing product with ID:", productId);

  // For the purpose of this example, we'll simply reload the products
  loadProducts();
}

function editProduct(productId) {
  // Load product data and show the form
  console.log("Editing product with ID:", productId);
  // For the purpose of this example, we'll just show the form without pre-filling data
  showProductForm();
}

function showProductForm() {
  document.getElementById("product-form").style.display = "block";
}

function hideProductForm() {
  document.getElementById("product-form").style.display = "none";
}
