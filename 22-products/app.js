const url = "https://course-api.com/javascript-store-products";

const productsDOM = document.querySelector(".products-center");

const fetchProducts = async () => {
  productsDOM.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    productsDOM.innerHTML = `<p class="error">There was an error</p>`;
  }
};
const displayProducts = (list) => {
  const productList = list
    .map((product) => {
      const { id } = product;
      const { price, name: title } = product.fields;
      const { url: img } = product.fields.image[0];

      return `<a href="product.html?id=${id}" class="single-product">
          <img src="${img}" alt="${title}" class="img single-product-img">
          <footer>
            <h5 class="name">${title}</h5>
            <span class="price">$${price / 100}</span>
          </footer>
        </a>`;
    })
    .join(" ");
  productsDOM.innerHTML = ` <div class="products-container">
                ${productList}
      </div>`;
};

const start = async () => {
  const data = await fetchProducts();
  displayProducts(data);
};
start();
