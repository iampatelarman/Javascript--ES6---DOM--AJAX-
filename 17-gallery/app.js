function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery(element) {
  this.container = element;
  this.list = [...element.querySelectorAll(".img")];
  // target
  this.modal = getElement(".modal");
  this.modalImg = getElement(".main-img");
  this.modalImages = getElement(".modal-images");
  this.imgName = getElement(".image-name");
  this.closeBtn = getElement(".close-btn");
  this.nextBtn = getElement(".next-btn");
  this.prevBtn = getElement(".prev-btn");
  // event listeners
  this.closeModal = this.closeModal.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.chooseImg = this.chooseImg.bind(this);
  //open modal
  this.container.addEventListener(
    "click",
    function (e) {
      if (e.target.classList.contains("img")) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
}
Gallery.prototype.openModal = function (selectedImage, list) {
  this.modal.classList.add("open");
  this.setModalImg(selectedImage);
  this.modalImages.innerHTML = list
    .map(function (image) {
      return `<img src="${
        image.src
      }" title="${image.title}" data-id="${image.dataset.id}"
    class="${
      selectedImage.dataset.id === image.dataset.id
        ? "modal-img selected"
        : "modal-img"
    }">`;
    })
    .join("");
  this.closeBtn.addEventListener("click", this.closeModal);
  this.nextBtn.addEventListener("click", this.nextImage);
  this.prevBtn.addEventListener("click", this.prevImage);
  this.modalImages.addEventListener("click", this.chooseImg);
};
Gallery.prototype.setModalImg = function (selectedImage) {
  this.modalImg.src = selectedImage.src;
  this.imgName.textContent = selectedImage.title;
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove("open");
  this.closeBtn.removeEventListener("click", this.closeModal);

  this.nextBtn.removeEventListener("click", this.nextImage);
  this.prevBtn.removeEventListener("click", this.prevImage);
  this.modalImages.removeEventListener("click", this.chooseImg);
};
Gallery.prototype.nextImage = function () {
  const selected = this.modalImages.querySelector(".selected");
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove("selected");
  next.classList.add("selected");
  this.setModalImg(next);
};
Gallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector(".selected");
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove("selected");
  prev.classList.add("selected");
  this.setModalImg(prev);
};
Gallery.prototype.chooseImg = function (e) {
  if (e.target.classList.contains("modal-img")) {
    const selected = this.modalImages.querySelector(".selected");
    selected.classList.remove("selected");
    this.setModalImg(e.target);
    e.target.classList.add("selected");
  }
};

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
