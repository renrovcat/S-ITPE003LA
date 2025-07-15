function addToCartFromCard(book, price) {
  cart.push({ book, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${book} added to cart.`);
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function addToCart() {
  const select = document.getElementById('bookSelect');
  const selected = select.value.split('|');
  const book = selected[0];
  const price = parseFloat(selected[1]);

  cart.push({ book, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${book} added to cart.`);
}

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const list = document.getElementById('cartItems');
  const totalPriceElem = document.getElementById('totalPrice');
  if (!list) return;
  list.innerHTML = '';
  let total = 0;
  cartItems.forEach((item, idx) => {
    let img = '', desc = '', author = '', price = item.price;
    if (item.book === 'Alphabet of Death') {
      img = 'https://a.wattpad.com/cover/17016805-368-k577307.jpg';
      desc = 'A thrilling Wattpad story that explores the mysteries and dangers behind every letter. A must-read for suspense lovers.';
      author = 'John Reni De Castro';
      price = 2200;
    } else if (item.book === 'My Husband is a Mafia Boss') {
      img = 'https://img.wattpad.com/cover/7017775-256-k726753.jpg';
      desc = 'The viral romance that swept Wattpad! Dive into a world of love, danger, and mafia intrigue.';
      author = 'Yanalovesyou';
      price = 1000;
    } else if (item.book === 'The Inheritance Games') {
      img = 'https://cdn2.penguin.com.au/covers/original/9780241476178.jpg';
      desc = 'A bestselling YA mystery about puzzles, secrets, and a life-changing inheritance. Perfect for fans of twists and turns.';
      author = 'Jennifer Lynn Barnes';
      price = 1500;
    } else {
      img = 'images/book_placeholder.png';
      desc = '';
      author = '';
    }
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <img src="${img}" alt="${item.book}" class="book-img">
      <div class="book-info">
        <h4>${item.book}</h4>
        ${author ? `<p class='author'>by ${author}</p>` : ''}
        ${desc ? `<p class='desc'>${desc}</p>` : ''}
        <div class="book-meta">
          <span class="price">₱${price.toLocaleString()}</span>
          <button onclick="deleteCartItem(${idx})" class="shop-btn small" style="background:#ffb300; color:#222;">Remove</button>
        </div>
      </div>
    `;
    list.appendChild(card);
    total += price;
  });
  totalPriceElem.textContent = `Total: ₱${total.toLocaleString()}`;
}



function deleteCartItem(idx) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.splice(idx, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderCart();
}

function buyBooks() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  if (cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Thank you for your purchase!');
  localStorage.removeItem('cart');
  renderCart();
}

if (document.getElementById('cartItems')) {
  renderCart();
}
