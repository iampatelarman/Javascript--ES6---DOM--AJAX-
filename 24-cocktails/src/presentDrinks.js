import fetchDrinks from "./fetchDrinks.js";
import displayDrinks from "./displayDrinks.js";
import setDrink from "./setDrink.js";
const presentDrinks = async (url) => {
  // fetch drinks
  const data = await fetchDrinks(url);
  //   display drinks
  const section = displayDrinks(data);
  // set drinks
  if (section) {
    setDrink(section);
  }
};

export default presentDrinks;
