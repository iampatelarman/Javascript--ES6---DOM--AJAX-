import { allProductsUrl } from "./utils.js";

const fetchProducts = async () => {
  try {
    const response = await fetch(allProductsUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchProducts;
