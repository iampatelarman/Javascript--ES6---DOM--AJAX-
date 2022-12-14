import { getStorageItem, setStorageItem } from "./utils.js";
let store = getStorageItem("store");
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      fields: { colors, company, featured, name, price, image: img },
    } = product;
    const image = img[0].thumbnails.large.url;
    return { id, colors, company, featured, name, price, image };
  });
  setStorageItem("store", store);
};

const findProduct = (id) => {
  const product = store.find((item) => item.id === id);
  return product;
};
export { store, setupStore, findProduct };
