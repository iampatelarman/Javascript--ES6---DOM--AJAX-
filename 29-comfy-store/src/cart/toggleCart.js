import { getElement } from "../utils.js";

const toggleCart = document.querySelector(".toggle-cart");
const cartCloseBtn = document.querySelector(".cart-close");
const cartOverlay = document.querySelector(".cart-overlay");

toggleCart.addEventListener("click", () => {
  cartOverlay.classList.add("show");
});
cartCloseBtn.addEventListener("click", () => {
  cartOverlay.classList.remove("show");
});

export const openCart = () => {
  cartOverlay.classList.add("show");
};
