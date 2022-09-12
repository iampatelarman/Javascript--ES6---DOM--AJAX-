import get from "./getElement.js";

const img = get(".user-img");
const title = get(".user-title");
const value = get(".user-value");
const icons = [...document.querySelectorAll(".icon")];

const displayUser = (person) => {
  img.src = person.image;
  title.textContent = "My name is";
  value.textContent = person.name;
  icons.forEach((icon) => icon.classList.remove("active"));
  icons[0].classList.add("active");

  icons.forEach((icon) => {
    const label = icon.dataset.label;
    icon.addEventListener("click", () => {
      title.textContent = `My ${label} is`;
      value.textContent = person[label];
      icons.forEach((icon) => icon.classList.remove("active"));
      icon.classList.add("active");
    });
  });
};

export default displayUser;
