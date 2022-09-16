// Capturando el canvas a dibujar y controlar.
let contexto = document.getElementById("lienzo-juego").getContext("2d");
contexto.canvas.width = 300;
contexto.canvas.height = 700;

const FPS = 60;
let gravedad = 1.5;

// Posición y tamaño de nuestro personaje.
let personaje = {
  x: 100,
  y: 150,
  width: 50,
  height: 50,
};

/**
 * Se encarga de restar posiciones en y cada que se presione una tecla.
 */
function presionar() {
  personaje.y -= 35;
}

// Ejecuta la función loop cada cierto tiempo.
setInterval(loop, 1000 / FPS);

/**
 * Se encarga de dibujar el personaje y hacerlo caer lentamente.
 */
function loop() {
  contexto.clearRect(0, 0, 300, 700);
  contexto.fillStyle = "rgba(100, 0, 0, 1)";
  contexto.fillRect(
    personaje.x,
    personaje.y,
    personaje.width,
    personaje.height
  );
  personaje.y += gravedad;
}

// Evento que al presionar una tecla el personaje vaya subiendo.
window.addEventListener("keydown", presionar);
