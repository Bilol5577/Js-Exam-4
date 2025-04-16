let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartDiv = document.getElementById('cart');

function updateCart() {
  cartDiv.innerHTML = '';

  if (cart.length === 0) {
    cartDiv.innerHTML = '<p>Savatingiz bosh</p>';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="80">
      <h3>${item.name}</h3>
      <p>Narx: ${item.price.toLocaleString()} so‘m</p>
      <div class="quantity-controls">
        <button onclick="decreaseQuantity(${index})">−</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${index})">+</button>
      </div>
      <p>Jami: ${(item.price * item.quantity).toLocaleString()} so‘m</p>
      <hr>
    `;
    cartDiv.appendChild(itemDiv);
  });

  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<h3>Umumiy: ${total.toLocaleString()} so‘m</h3>`;
  cartDiv.appendChild(totalDiv);
}

function increaseQuantity(index) {
  cart[index].quantity++;
  saveCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1); 
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

updateCart();
