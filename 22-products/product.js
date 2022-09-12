const url = "https://course-api.com/javascript-store-single-product";

const productDOM = document.querySelector(".product");

const fetchProduct = async () => {
  try {
    productDOM.innerHTML = `<div class="loading"> </div>`;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    productDOM.innerHTML = `There was an error`;
  }
};

const displayProduct = (product) => {
  const { url: img } = product.fields.image[0];
  const {
    name: title,
    price,
    colors,
    company,
    description: info,
  } = product.fields;
  const colorList = colors
    .map((color) => {
      return `<span class="product-color" style="background:${color}"></span>`;
    })
    .join(" ");
  document.title = title.toUpperCase();
  productDOM.innerHTML = `<div class="product-wrapper">
            <img src="${img}" alt="${title}" class="img">
            <div class="product-info">
                <h3>${title}</h3>
                <h5>${company}</h5>
                <span>$${price / 100}</span>
                <div class="colors">
                    ${colorList}
                </div>
                <p>${info}</p>
                <button class="btn">add to cart</button>
            </div>
        </div>`;
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
