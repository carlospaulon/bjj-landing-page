document.getElementById("ano").textContent = new Date().getFullYear();

// modal + cor do nav
const overlay = document.getElementById("overlay");
const siteHeader = document.getElementById("siteHeader");
const heroBemVindo = document.getElementById("heroBemVindo");
const trocarFaixaBtn = document.getElementById("trocarFaixaBtn");

const NOME_FAIXA = {
  branca: "faixa branca",
  azul: "faixa azul",
  roxa: "faixa roxa",
  marrom: "faixa marrom",
  preta: "faixa preta",
};

function aplicarFaixa(belt, cor, corTexto) {
  document.documentElement.style.setProperty("--belt-color", cor);
  document.documentElement.style.setProperty("--belt-text", corTexto);

  siteHeader.style.borderBottom =
    belt === "branca" ? "1px solid rgba(0,0,0,0.15)" : "none";

  heroBemVindo.textContent = `bem-vindo(a), ${NOME_FAIXA[belt] || ""}`;
}

document.querySelectorAll(".belt-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const belt = btn.dataset.belt;
    const cor = btn.dataset.cor;
    const corTexto = btn.dataset.texto;
    aplicarFaixa(belt, cor, corTexto);
    overlay.setAttribute("hidden", "");
  });
});

trocarFaixaBtn.addEventListener("click", () => {
  overlay.removeAttribute("hidden");
});