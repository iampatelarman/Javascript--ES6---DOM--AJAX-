// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";

// set items
const cartItemsCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");
let cart = getStorageItem("cart");

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    let product = findProduct(id);
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    // add to cart DOM
    addToCartDOM(product);
  } else {
    // update cart
    let amount = increaseCount(id);
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")];
    const amountDOM = items.find((value) => value.dataset.id === id);
    amountDOM.textContent = amount;
  }
  // display cart item count
  displayCartItemCount();
  // display cart total
  displayCartTotal();
  // setup storage
  setStorageItem("cart", cart);
  // open cart overlay
  openCart();
};

function increaseCount(id) {
  let newAmount = 0;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem.amount = newAmount;
    }
    return cartItem;
  });
  return newAmount;
}
function decreaseCount(id) {
  let newAmount = 0;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem.amount = newAmount;
    }
    return cartItem;
  });
  return newAmount;
}

function displayCartItemCount() {
  const count = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemsCountDOM.textContent = count;
}
function displayCartTotal() {
  const total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => addToCartDOM(cartItem));
}
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

function setUpCartFunctionality() {
  cartItemsDOM.addEventListener("click", function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const elementId = e.target.dataset.id;
    const parentId = parent.dataset.id;

    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(elementId);
      parent.parentElement.remove();
    }
    if (parent.classList.contains("cart-item-increase-btn")) {
      let newAmount = increaseCount(parentId);
      parent.nextElementSibling.textContent = newAmount;
    }
    if (parent.classList.contains("cart-item-decrease-btn")) {
      let newAmount = decreaseCount(parentId);
      if (newAmount === 0) {
        removeItem(parentId);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    displayCartItemCount();
    displayCartTotal();

    setStorageItem("cart", cart);
  });
}

const init = () => {
  //  display cart count
  displayCartItemCount();
  // display cart total
  displayCartTotal();
  // display cart items in all pages
  displayCartItemsDOM();
  // cart functionality
  setUpCartFunctionality();
};

init();
