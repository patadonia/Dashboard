if (!localStorage.getItem("isUserLogin")) window.location.href = "/index.html";

const toggleMenu = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const logout = document.getElementById("logout");
const userNameH1 = document.getElementById('userName');


logout.addEventListener("click", () => {
  localStorage.removeItem("isUserLogin");
  localStorage.removeItem("userName");
  localStorage.removeItem("group_id");
  window.location.href = "/index.html";
});

toggleMenu.addEventListener("click", () => {
  navMenu.classList.toggle("hiddenMenu");
  if (navMenu.classList.contains("hiddenMenu")) toggleMenu.innerHTML = "→";
  else toggleMenu.innerHTML = "←";
});

if (localStorage.getItem("userName")) userNameH1.innerHTML = 'Привет, ' + localStorage.getItem("userName");