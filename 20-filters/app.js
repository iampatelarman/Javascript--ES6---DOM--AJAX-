let filteredProducts = [...products];

const productsContainer = document.querySelector(".products-container");

const displayProducts = () => {
  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `<h6>no items matched</h6>`;
    return;
  }
  productsContainer.innerHTML = filteredProducts
    .map(({ id, title, image, price }) => {
      return `<article class="product" data-id='${id}'>
        <img src='${image}' alt=""
          class="product-img img">
        <footer>
          <h5 class="product-name">${title}</h5>
          <span class="product-price">$${price}</span>
        </footer>
      </article>`;
    })
    .join(" ");
};

displayProducts();

const form = document.querySelector(".input-form");
const search = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  const inputValue = search.value;
  filteredProducts = products.filter(({ title }) => {
    return title.toLowerCase().includes(inputValue);
  });

  displayProducts();
});

const companyDOM = document.querySelector(".companies");

const displaybuttons = () => {
  const buttons = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];

  companyDOM.innerHTML = buttons
    .map((button) => {
      return `<button class="company-btn" data-value="${button}">${button}</button>`;
    })
    .join(" ");
};
displaybuttons();

companyDOM.addEventListener("click", (e) => {
  if (e.target.classList.contains("company-btn")) {
    if (e.target.dataset.value === "all") {
      filteredProducts = [...products];
    } else {
      const value = e.target.dataset.value;
      filteredProducts = products.filter((product) => {
        return product.company === value;
      });
    }

    displayProducts();
    search.value = "";
  }
});
