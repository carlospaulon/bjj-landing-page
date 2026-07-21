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

// CEP + GoogleMaps
const cepForm = document.getElementById("cepForm");
const cepInput = document.getElementById("cep");
const cepStatus = document.getElementById("cepStatus");
const enderecoEncontrado = document.getElementById("enderecoEncontrado");
const cidadeEncontrada = document.getElementById("cidadeEncontrada");
const mapaPlaceholder = document.getElementById("mapaPlaceholder");
const mapaFrame = document.getElementById("mapaFrame");
const abrirMapsLink = document.getElementById("abrirMapsLink");

cepInput.addEventListener("input", () => {
  const digits = cepInput.value.replace(/\D/g, "").slice(0, 8);
  cepInput.value =
    digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
});

cepForm.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const cep = cepInput.value.replace(/\D/g, "");
  enderecoEncontrado.hidden = true;

  if (cep.length !== 8) {
    cepStatus.textContent = "Digite um CEP válido (8 dígitos).";
    cepStatus.className = "cep-status error";
    return;
  }

  cepStatus.textContent = "Buscando seu endereço...";
  cepStatus.className = "cep-status";

  //consumo api
  try {
    const respostaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dadosCep = await respostaCep.json();

    if (dadosCep.erro) {
      cepStatus.textContent = "CEP não encontrado.";
      cepStatus.className = "cep-status error";
      return;
    }

    const cidade = dadosCep.localidade;
    const uf = dadosCep.uf;
    const bairro = dadosCep.bairro || "";

    cidadeEncontrada.textContent = `${bairro ? bairro + ", " : ""}${cidade} - ${uf}`;
    enderecoEncontrado.hidden = false;

    // pesquisa do maps
    const consulta = encodeURIComponent(
      `academia de jiu-jitsu em ${bairro} ${cidade} ${uf}`,
    );
    const mapsEmbedUrl = `https://www.google.com/maps?q=${consulta}&output=embed`;
    const mapsLinkUrl = `https://www.google.com/maps/search/${consulta}`;

    mapaFrame.src = mapsEmbedUrl;
    mapaFrame.hidden = false;
    mapaPlaceholder.hidden = true;

    abrirMapsLink.href = mapsLinkUrl;
    abrirMapsLink.hidden = false;

    cepStatus.textContent = "Academias encontradas! Veja o mapa ao lado.";
    cepStatus.className = "cep-status ok";
  } catch (erro) {
    cepStatus.textContent =
      "Não foi possível buscar agora. Tente novamente em instantes.";
    cepStatus.className = "cep-status error";
  }
});

//formulario inscrição
const inscrevaForm = document.getElementById("inscrevaForm");
const inscrevaObrigado = document.getElementById("inscrevaObrigado");
const inscrevaNome = document.getElementById("inscrevaNome");

inscrevaForm.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("inscNome").value.trim();

  inscrevaForm.hidden = true;
  inscrevaObrigado.hidden = false;
  inscrevaNome.textContent = nome || "guerreiro(a)";
});
