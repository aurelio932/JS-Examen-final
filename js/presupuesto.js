// Hacemos un calculo sencillo del presupuesto y validacion del formulario
const $ = id => document.getElementById(id);
const form = $('formulario');

function calcular() {
  const plazo = Number($('plazo').value) || 0;
  const producto = Number($('producto').value) || 0;
  let extras = 0;

  document.querySelectorAll('.extra:checked').forEach(extra => {
    extras += Number(extra.value) || 0;
  });

  let descuento = 0;
  if (plazo >= 60) descuento = 0.15;
  else if (plazo >= 30) descuento = 0.10;
  else if (plazo >= 15) descuento = 0.05;

  $('total').value = ((producto + extras) * (1 - descuento)).toFixed(2) + ' €';
}

// Reglas de validación de los datos de contacto
const reglas = {
  nombre:    [/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{1,15}$/, 'Solo letras, máximo 15 caracteres.'],
  apellidos: [/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{1,40}$/, 'Solo letras, máximo 40 caracteres.'],
  telefono:  [/^\d{9}$/, 'Solo números, 9 dígitos.'],
  email:     [/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/, 'Introduce un correo válido (ej. nombre@dominio.com).']
};
function validar(id) {
  const patron = reglas[id][0];
  const mensaje = reglas[id][1];
  const valido = patron.test($(id).value.trim());
  $('err-' + id).textContent = valido ? '' : mensaje;
  return valido;
}

Object.keys(reglas).forEach(id => {
  $(id).addEventListener('input', () => validar(id));
});
form.addEventListener('input', calcular);
form.addEventListener('change', calcular);

form.addEventListener('submit', evento => {
  evento.preventDefault();
  const datosValidos = Object.keys(reglas).every(id => validar(id));
  const faltaPresupuesto = !$('producto').value || Number($('plazo').value) < 1;
  const faltaPrivacidad = !$('privacidad').checked;
  const faltanDatos = faltaPresupuesto || faltaPrivacidad;

  $('err-general').textContent = faltaPresupuesto
    ? 'Elige un producto e indica el plazo de entrega.'
    : '';
  $('err-privacidad').textContent = faltaPrivacidad
    ? 'Debes aceptar las condiciones del servicio.'
    : '';
  $('resultado').textContent = datosValidos && !faltanDatos
    ? 'Solicitud enviada. Te responderemos en 24 horas.'
    : '';
});

form.addEventListener('reset', () => {
  setTimeout(() => {
    calcular();
    document.querySelectorAll('.err').forEach(error => error.textContent = '');
    $('resultado').textContent = '';
  });
});

calcular();
