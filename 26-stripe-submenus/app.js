import sublinks from "./data.js";

const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const sidebar = document.querySelector(".sidebar-links");
const hero = document.querySelector(".hero");
const linkBtns = document.querySelectorAll(".link-btn");
const submenu = document.querySelector(".submenu");
const nav = document.querySelector(".nav");

// show/hide sidebar

toggleBtn.addEventListener("click", () => {
  sidebarWrapper.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  sidebarWrapper.classList.remove("show");
});
// sidebar

sidebar.innerHTML = sublinks
  .map((item) => {
    const { page, links } = item;
    return `<article>
    <h4>${page}</h4>
    <div class="sidebar-sublinks">
    ${links
      .map((link) => {
        return `<a href="${link.url}">
        <i class="${link.icon}"></i>${link.label}
        </a>`;
      })
      .join("")}
    </div>
    </article>`;
  })
  .join(" ");

//   submenu
linkBtns.forEach((btn) => {
  btn.addEventListener("mouseover", function (e) {
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;

    const tempPage = sublinks.find(({ page }) => page === text);
    if (tempPage) {
      const { page, links } = tempPage;
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;
      let column = "col-2";
      if (links.length === 3) {
        column = "col-3";
      }
      if (links.length > 3) {
        column = "col-4";
      }
      submenu.innerHTML = `
      <section>
      <h4>${page}</h4>
      <div class="submenu-center ${column}">
      ${links
        .map((link) => {
          return `
        <a href="">
        <i class="${link.icon}"></i>${link.label}
        </a>`;
        })
        .join("")}
      </div>
      </section>
      `;
    }
  });
});
