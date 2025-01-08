const ecran = document.getElementById("ecran");
const historiqueListe = document.getElementById("historique-liste");

function ajouterCaractere(caractere) {
  ecran.innerText += caractere;

}
function effacer() {
  ecran.innerText = "";
}
function effacerDernier() {
  ecran.innerText = ecran.innerText.slice(0, -1);
}

function calculer() {
  try {
    const resultat = eval(ecran.innerText);
    ajouterHistorique(ecran.innerText + " = " + resultat);
    ecran.innerText = resultat;
  } catch (error) {
    ecran.innerText = "Erreur";
  }
}

function ajouterHistorique(calcul) {
  const historique = JSON.parse(localStorage.getItem("historique")) || [];
  historique.push(calcul);
  localStorage.setItem("historique", JSON.stringify(historique));
  afficherHistorique();
}

function afficherHistorique() {
  const historique = JSON.parse(localStorage.getItem("historique")) || [];
  historiqueListe.innerHTML = "";
  historique.forEach((calcul) => {
    const li = document.createElement("li");
    li.innerText = calcul;
    historiqueListe.appendChild(li);
  });
}

document.getElementById("btn-effacer-historique").addEventListener("click", effacerHistorique);

function effacerHistorique() {
  localStorage.removeItem("historique");
  afficherHistorique();
}

document.getElementById("btn-effacer").addEventListener("click", effacer);
document
  .getElementById("btn-parenthese-ouvrante")
  .addEventListener("click", () => ajouterCaractere("("));
document
  .getElementById("btn-parenthese-fermant")
  .addEventListener("click", () => ajouterCaractere(")"));
document
  .getElementById("btn-division")
  .addEventListener("click", () => ajouterCaractere("/"));
document
  .getElementById("btn-7")
  .addEventListener("click", () => ajouterCaractere("7"));
document
  .getElementById("btn-8")
  .addEventListener("click", () => ajouterCaractere("8"));
document
  .getElementById("btn-9")
  .addEventListener("click", () => ajouterCaractere("9"));
document
  .getElementById("btn-multiplication")
  .addEventListener("click", () => ajouterCaractere("*"));
document
  .getElementById("btn-4")
  .addEventListener("click", () => ajouterCaractere("4"));
document
  .getElementById("btn-5")
  .addEventListener("click", () => ajouterCaractere("5"));
document
  .getElementById("btn-6")
  .addEventListener("click", () => ajouterCaractere("6"));
document
  .getElementById("btn-soustraction")
  .addEventListener("click", () => ajouterCaractere("-"));
document
  .getElementById("btn-1")
  .addEventListener("click", () => ajouterCaractere("1"));
document
  .getElementById("btn-2")
  .addEventListener("click", () => ajouterCaractere("2"));
document
  .getElementById("btn-3")
  .addEventListener("click", () => ajouterCaractere("3"));
document
  .getElementById("btn-addition")
  .addEventListener("click", () => ajouterCaractere("+"));
document
  .getElementById("btn-0")
  .addEventListener("click", () => ajouterCaractere("0"));
document
  .getElementById("btn-point")
  .addEventListener("click", () => ajouterCaractere("."));
document
  .getElementById("btn-effacer-dernier")
  .addEventListener("click", effacerDernier);
document.getElementById("btn-egale").addEventListener("click", calculer);

document.getElementById("theme-button").addEventListener("click", changeTheme);
function changeTheme() {
  var element = document.body;
  element.classList.toggle("dark");
  element.classList.toggle("light");
  if (element.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}
const savedTheme = localStorage.getItem("theme");
console.log(savedTheme);
if (savedTheme === "dark") {
  document.body.classList.remove("light");
  document.body.classList.add(savedTheme);
} else {
  document.body.classList.remove("dark");
  document.body.classList.add("light");
}

document.addEventListener("keyup", (event) => {
  const key = event.key;
  const button = document.querySelector(`[data-key="${key}"]`);
  if (/[0-9+\-*/().]/.test(key)) {
    ajouterEffetHover(button)
    ajouterCaractere(key);
    if (button) ajouterEffetHover(button);
  } else if (key === "Enter") {
    calculer();
    if (button) ajouterEffetHover(button);
  } else if (key === "Backspace") {
    effacerDernier();
    if (button) ajouterEffetHover(button);
  } else if (key === "Escape") {
    effacer();
    if (button) ajouterEffetHover(button);
  }
});

function ajouterEffetHover(element) {
  element.classList.add("button-hover");
  setTimeout(() => {
    element.classList.remove("button-hover");
  }, 200);
}

function ajouterEffetHover2(element) {
  element.classList.add("button-hover2");
  setTimeout(() => {
    element.classList.remove("button-hover2");
  }, 200);
}

document.querySelectorAll("button").forEach(button => {
  const key = button.textContent.trim();
  button.setAttribute("data-key", key);
});

afficherHistorique();