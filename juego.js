// Capturando el canvas a dibujar y controlar.
let contexto = document.getElementById("lienzo-juego").getContext("2d");
contexto.canvas.width = 300;
contexto.canvas.height = 530;

const FPS = 60;
let gravedad = 1.5;
let score = 0;

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

// Variables audios
let punto = new Audio();
punto.src = "audios/punto.mp3";

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
    contexto.drawImage(tuberiaSur, tuberias[i].x, tuberias[i].y + constante);
    tuberias[i].x--;

    // Haciendo que las tuberías no tengan un desface  muy amplio.
    if (tuberias[i].y + tuberiaNorte.height < 80) {
      tuberias[i].y = 0;
    }

    // Condición para que cada ciertos pixeles aparezca una nueva tubería.
    if (tuberias[i].x == 150) {
      tuberias.push({
        x: contexto.canvas.width,
        y:
          Math.floor(Math.random() * tuberiaNorte.height) - tuberiaNorte.height,
      });
    }

    // Detección de colisiones con las tuberías o con el suelo.
    if (
      (personaje.x + bird.width >= tuberias[i].x &&
        personaje.x <= tuberias[i].x + tuberiaNorte.width &&
        (personaje.y <= tuberias[i].y + tuberiaNorte.height ||
          personaje.y + bird.height >= tuberias[i].y + constante)) ||
      personaje.y + bird.height >= contexto.canvas.height - suelo.height
    ) {
      location.reload();
    }

    // Aumentando el score.
    if (tuberias[i].x == personaje.x) {
      score++;
      punto.play();
    }
  }

  // Condiciones
  personaje.y += gravedad;
  contexto.fillStyle = "rgba(0,0,0,1)";
  contexto.font = "25px Arial";
  contexto.fillText("Score: " + score, 10, contexto.canvas.height - 40);
}

// Evento que al presionar una tecla el personaje vaya subiendo.
window.addEventListener("keydown", presionar);
