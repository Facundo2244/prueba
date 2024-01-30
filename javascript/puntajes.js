const listaPuntajes = document.getElementById("listaPuntajes");
const puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];

listaPuntajes.innerHTML = puntajes
  .map(puntaje => {
    return `<li class="puntajes">${puntaje.nombre} - ${puntaje.puntaje}</li>`;
  })
  .join("");
