let pizzas = [];
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("pizzas.json")
    .then(response => response.json())
    .then(data => {
      pizzas = data;
      renderPizzas(); 
    })
    .catch(error => console.error("JSON yuklashda xatolik:", error));
});

function renderPizzas(filteredPizzas = pizzas) {
  const pizzaList = document.getElementById("pizza-list");
  pizzaList.innerHTML = "";

  filteredPizzas.forEach(pizza => {
    const card = document.createElement("div");
    card.className = "pizza-card";
    card.innerHTML = `
      <img src="${pizza.image}" alt="${pizza.name}" />
      <h3>${pizza.name}</h3>
      <p>${pizza.price.toLocaleString()} so‘m</p>
      <button onclick="addToCart(${pizza.id})">Qo‘shish</button>
    `;
    pizzaList.appendChild(card);
  });
}

function filterPizzas(category) {
  let filteredPizzas;

  if (category === 'meat') {
    filteredPizzas = pizzas.filter(pizza => pizza.category === 'meat');
  } else if (category === 'vegetarian') {
    filteredPizzas = pizzas.filter(pizza => pizza.category === 'vegetarian');
  } else if (category === 'grill') {
    filteredPizzas = pizzas.filter(pizza => pizza.category === 'grill');
  } else if (category === 'spicy') {
    filteredPizzas = pizzas.filter(pizza => pizza.category === 'spicy');
  } else if (category === 'closed') {
    filteredPizzas = pizzas.filter(pizza => pizza.category === 'closed');
  } else {
    filteredPizzas = pizzas; 
  }

  renderPizzas(filteredPizzas);
}

function sortPizzas() {
  const sortBy = document.getElementById('sort-select').value;
  let sortedPizzas;

  if (sortBy === 'popularity') {

    sortedPizzas = [...pizzas].sort((a, b) => b.popularity - a.popularity);  
  } else if (sortBy === 'price') {
    sortedPizzas = [...pizzas].sort((a, b) => a.price - b.price);  
  } else if (sortBy === 'alphabet') {
    sortedPizzas = [...pizzas].sort((a, b) => a.name.localeCompare(b.name));  
  }

  renderPizzas(sortedPizzas);
}

function addToCart(id) {
  const pizza = pizzas.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ ...pizza, quantity: 1 });
  }

  // LocalStorage-ga saqlash
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartUI();
}

function updateCartUI() {
  const cartDiv = document.getElementById("cart");
  if (!cartDiv) return;

  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const el = document.createElement("div");
    el.innerHTML = `
      <p>${item.name} x${item.quantity} — ${item.price.toLocaleString()} so‘m</p>
    `;
    cartDiv.appendChild(el);
  });

  const totalEl = document.createElement("h4");
  totalEl.textContent = `Jami: ${total.toLocaleString()} so‘m`;
  cartDiv.appendChild(totalEl);
}

function showOrderConfirmation() {
  alert("Sizning pizzangiz muvaffaqiyatli sotib olindi! Tez orada yetkazib beriladi.");
}


function showOrderConfirmation() {
  alert("Sizning pizzangiz muvaffaqiyatli sotib olindi! Tez orada yetkazib beriladi.");
};


function addToCart(id) {
  const pizza = pizzas.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ ...pizza, quantity: 1 });
  }

  // LocalStorage-ga saqlash
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartUI();


  showOrderConfirmation();
}


function showOrderConfirmation() {
  alert("Sizning pizzangiz muvaffaqiyatli sotib olindi! Tez orada yetkazib beriladi.");
  sendSMS(); 
}


function sendSMS() {

  console.log("SMS yuborilmoqda...");  
}

