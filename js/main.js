// Carga de noticias desde un archivo JSON externo
const cont = document.getElementById('noticias');

if (cont) {
  fetch('data/noticias.json')
    .then(respuesta => respuesta.json())
    .then(noticias => {
      for (const n of noticias) {
        cont.innerHTML += `
          <article class="noticia">
            <h3>${n.titulo}</h3>
            <p><small>${n.fecha}</small></p>
            <p>${n.texto}</p>
          </article>`;
      }
    })
    .catch(() => {
      cont.textContent = 'No se pudieron cargar las noticias.';
    });
}
