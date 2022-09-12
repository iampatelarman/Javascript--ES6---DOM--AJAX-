import get from "./getElement.js";
import { hideLoading } from "./toggleLoading.js";

const displayDrinks = ({ drinks }) => {
  const section = get(".section-center");
  const title = get(".title");
  if (!drinks) {
    title.textContent = "Sorry, no such drinks present";
    section.innerHTML = null;
    hideLoading();
    return;
  }
  const newDrinks = drinks
    .map((drink) => {
      const { idDrink: id, strDrink: name, strDrinkThumb: image } = drink;
      return `<a href="drink.html">
        <article class="cocktail" data-id="${id}">
          <img src="${image}" alt="">
          <h3>${name}</h3>
        </article>
      </a>`;
    })
    .join("");
  hideLoading();
  section.innerHTML = newDrinks;
  return section;
};

export default displayDrinks;
