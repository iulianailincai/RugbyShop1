// cart.js

// Funcție pentru a afișa produsele din coș
function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = ""; // Curăță conținutul existent

  let total = 0;

  // Verifică dacă există produse în coș
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Coșul tău este gol.</p>";
    return;
  }

  // Creează un tabel pentru a afișa produsele
  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>Imagine</th>
      <th>Nume</th>
      <th>Descriere</th>
      <th>Preț</th>
      <th>Cantitate</th>
      <th>Total</th>
      <th>Acțiuni</th>
    </tr>
  `;

  // Încarcă datele produselor
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      const products = data.products;

      cart.forEach((item) => {
        const product = products.find((p) => p.id === item.id);

        if (product) {
          const row = document.createElement("tr");
          const itemTotal = product.price * item.quantity;

          row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" style="width: 100px;"></td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price} RON</td>
            <td>
              <button onclick="updateQuantity(${product.id}, -1)">-</button>
              ${item.quantity}
              <button onclick="updateQuantity(${product.id}, 1)">+</button>
            </td>
            <td>${itemTotal} RON</td>
            <td><button onclick="removeFromCart(${product.id})">Remove</button></td>
          `;

          table.appendChild(row);
          total += itemTotal;
        }
      });

      cartContainer.appendChild(table);

      // Afișează totalul
      const totalElement = document.createElement("p");
      totalElement.innerText = `Total: ${total} RON`;
      cartContainer.appendChild(totalElement);
    })
    .catch((error) => {
      console.error("Eroare la încărcarea produselor:", error);
    });
}

// Funcție pentru a actualiza cantitatea unui produs în coș
function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cart.findIndex((item) => item.id === id);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;

    // Verifică dacă cantitatea devine mai mică sau egală cu 0 și elimină produsul
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(); // Reîmprospătează coșul
  }
}

// Funcție pentru a elimina un produs din coș
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // Reîmprospătează coșul
}

// Apelează funcția pentru a afișa coșul la încărcarea paginii
document.addEventListener("DOMContentLoaded", displayCart);
