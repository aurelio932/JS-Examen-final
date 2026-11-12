// Galería dinámica: se genera desde un array, con filtros por categoría y visor ampliado
const fotos = [
  {src:'../galeria/foto1.svg', alt:'Canapés variados', cat:'Cóctel',
    desc:'Selección de canapés fríos y calientes, ideales para recepciones y cócteles de bienvenida.'},
  {src:'../galeria/foto2.svg', alt:'Brochetas de verduras', cat:'Cóctel',
    desc:'Brochetas de verduras de temporada a la parrilla, una opción ligera y vegetariana.'},
  {src:'../galeria/foto3.svg', alt:'Mesa de banquete', cat:'Banquete',
    desc:'Montaje completo de mesa para banquetes de boda y celebraciones con servicio a la mesa.'},
  {src:'../galeria/foto4.svg', alt:'Pastel nupcial', cat:'Postres',
    desc:'Pastel nupcial de varios pisos, personalizado según el estilo y los sabores de los novios.'},
  {src:'../galeria/foto5.svg', alt:'Tartaletas de fruta', cat:'Postres',
    desc:'Tartaletas artesanas con crema pastelera y fruta fresca, perfectas para el final del evento.'},
  {src:'../galeria/foto6.svg', alt:'Brunch de empresa', cat:'Brunch',
    desc:'Brunch para eventos corporativos con opciones dulces y saladas, zumos naturales y café.'}
];
const categorias = ['Todas', 'Cóctel', 'Banquete', 'Postres', 'Brunch'];

const galeria = document.getElementById('galeria');
const filtros = document.getElementById('filtros');
const visor = document.getElementById('visor');
const visorImg = document.getElementById('visor-img');
const visorTitulo = document.getElementById('visor-titulo');
const visorDesc = document.getElementById('visor-desc');

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
      visorTitulo.textContent = f.alt;
      visorDesc.textContent = f.desc;
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
