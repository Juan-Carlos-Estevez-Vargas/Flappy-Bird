// Capturando el canvas a dibujar y controlar.
let contexto = document.getElementById("lienzo-juego").getContext("2d");
contexto.canvas.width = 300;
contexto.canvas.height = 530;

const FPS = 60;
let gravedad = 1.5;

let tuberias = new Array();
tuberias[0] = {
  x: contexto.canvas.width,
  y: 0,
};

// Posición y tamaño de nuestro personaje.
let personaje = {
  x: 50,
  y: 150,
  width: 50,
  height: 50,
};

// Variables imágenes
let bird = new Image();
bird.src = "imagenes/bird.png";

let background = new Image();
background.src = "imagenes/background.png";

let tuberiaNorte = new Image();
tuberiaNorte.src = "imagenes/tuberiaNorte.png";

let tuberiaSur = new Image();
tuberiaSur.src = "imagenes/tuberiaSur.png";

let suelo = new Image();
suelo.src = "imagenes/suelo.png";

/**
 * Se encarga de restar posiciones en y cada que se presione una tecla.
 */
function presionar() {
  personaje.y -= 35;
}

// Ejecuta la función loop cada cierto tiempo.
setInterval(loop, 1000 / FPS);

/**
 * Se encarga de dibujar el personaje y los objetos y hacer caer
 * lentamente al personaje.
 */
function loop() {
  contexto.clearRect(0, 0, 300, 530);

  // Construcción del fondo y suelo
  contexto.drawImage(background, 0, 0);
  contexto.drawImage(suelo, 0, contexto.canvas.height - suelo.height);

  // Construcción del personaje
  contexto.drawImage(bird, personaje.x, personaje.y);

  // Construcción de las tuberías
  for (let i = 0; i < tuberias.length; i++) {
    let constante = tuberiaNorte.height + 80;
    contexto.drawImage(tuberiaNorte, tuberias[i].x, tuberias[i].y);
    contexto.drawImage(
      tuberiaSur,
      tuberias[i].x,
      tuberiaNorte[i].y + constante
    ); 
    tuberias[i].x--;
  }

  personaje.y += gravedad;
}

// Evento que al presionar una tecla el personaje vaya subiendo.
window.addEventListener("keydown", presionar);
