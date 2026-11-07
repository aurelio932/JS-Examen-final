// Galería dinámica: se genera desde un array, con filtros por categoría y visor ampliado
const fotos = [
  {src:'../galeria/foto1.svg', alt:'Canapés variados', cat:'Cóctel'},
  {src:'../galeria/foto2.svg', alt:'Brochetas de verduras', cat:'Cóctel'},
  {src:'../galeria/foto3.svg', alt:'Mesa de banquete', cat:'Banquete'},
  {src:'../galeria/foto4.svg', alt:'Pastel nupcial', cat:'Postres'},
  {src:'../galeria/foto5.svg', alt:'Tartaletas de fruta', cat:'Postres'},
  {src:'../galeria/foto6.svg', alt:'Brunch de empresa', cat:'Brunch'}
];
const categorias = ['Todas', 'Cóctel', 'Banquete', 'Postres', 'Brunch'];

const galeria = document.getElementById('galeria');
const filtros = document.getElementById('filtros');
const visor = document.getElementById('visor');
const visorImg = document.getElementById('visor-img');

// Muestra las fotos de la categoría elegida
function pintar(cat) {
  galeria.innerHTML = '';
  for (const f of fotos) {
    if (cat !== 'Todas' && f.cat !== cat) continue;
    const img = document.createElement('img');
    img.src = f.src;
    img.alt = f.alt;
    img.onclick = () => {
      visorImg.src = f.src;
      visorImg.alt = f.alt;
      visor.showModal();
    };
    galeria.appendChild(img);
  }
}

// Crea un botón por categoría
for (const cat of categorias) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = cat;
  b.className = cat === 'Todas' ? 'activo' : 'sec';
  b.onclick = () => {
    filtros.querySelectorAll('button').forEach(x => x.className = 'sec');
    b.className = 'activo';
    pintar(cat);
  };
  filtros.appendChild(b);
}

document.getElementById('cerrar').onclick = () => visor.close();
pintar('Todas');
