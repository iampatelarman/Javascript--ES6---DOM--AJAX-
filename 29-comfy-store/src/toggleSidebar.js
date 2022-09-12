import { getElement } from "./utils.js";

const toggleSidebar = getElement(".toggle-nav");
const sidebarOverlay = getElement(".sidebar-overlay");
const sidebarClose = getElement(".sidebar-close");

toggleSidebar.addEventListener("click", () => {
  sidebarOverlay.classList.add("show");
});
sidebarClose.addEventListener("click", () => {
  sidebarOverlay.classList.remove("show");
});
