const botones = document.querySelectorAll('.btn-sonido');
const sonidos = {
  sonido1: document.getElementById('sonido1'),
  sonido2: document.getElementById('sonido2'),
  sonido3: document.getElementById('sonido3'),
  sonido4: document.getElementById('sonido4'),
  sonido5: document.getElementById('sonido5')
};

let sonidoActual = null;
let animacionID = null;

botones.forEach(boton => {
  // Crear barra de progreso interna si no existe
  if (!boton.querySelector('.barra-progreso')) {
    const barra = document.createElement('div');
    barra.classList.add('barra-progreso');
    boton.appendChild(barra);
  }

  boton.addEventListener('click', () => {
    const id = boton.dataset.sonido;
    const sonido = sonidos[id];

    // Pausar el anterior si está activo
    if (sonidoActual && sonidoActual !== sonido) {
      sonidoActual.pause();
      sonidoActual.currentTime = 0;
      cancelarAnimacion();
      resetearBarraProgreso();
    }

    // Si se hace click en el mismo botón, reinicia el sonido
    if (sonido === sonidoActual && !sonido.paused) {
      sonido.pause();
      sonido.currentTime = 0;
      resetearBarraProgreso();
      return;
    }

    sonido.play();
    sonidoActual = sonido;

    const barra = boton.querySelector('.barra-progreso');

    // Actualizar la barra
    function actualizarProgreso() {
      const porcentaje = (sonido.currentTime / sonido.duration) * 100;
      barra.style.width = porcentaje + '%';
      if (!sonido.paused && !sonido.ended) {
        animacionID = requestAnimationFrame(actualizarProgreso);
      }
    }

    sonido.onended = () => {
      resetearBarraProgreso();
    };

    actualizarProgreso();
  });
});

function resetearBarraProgreso() {
  document.querySelectorAll('.barra-progreso').forEach(barra => {
    barra.style.width = '0%';
  });
}

function cancelarAnimacion() {
  if (animacionID) {
    cancelAnimationFrame(animacionID);
    animacionID = null;
  }
}
