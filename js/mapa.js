const destino = L.latLng(43.2630, -2.9350); // ajusta a la dirección exacta
const mapa = L.map('mapa').setView(destino, 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(mapa);
L.marker(destino).addTo(mapa).bindPopup('Sabor & Sal Catering').openPopup();

const msg = document.getElementById('msg');
let ruta = null;

document.getElementById('calcular').addEventListener('click', () => {
  if (!navigator.geolocation) { msg.textContent = 'Tu navegador no permite geolocalización.'; return; }
  msg.textContent = 'Buscando tu ubicación...';
  navigator.geolocation.getCurrentPosition(pos => {
    msg.textContent = '';
    if (ruta) mapa.removeControl(ruta);
    const origen = L.latLng(pos.coords.latitude, pos.coords.longitude);
    ruta = L.Routing.control({ waypoints: [origen, destino], language: 'es' }).addTo(mapa);
  }, () => msg.textContent = 'No se pudo obtener tu ubicación.');
});