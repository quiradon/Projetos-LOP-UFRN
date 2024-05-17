function preload() {
    cenarios = [loadImage('assets/cenarios/1.png'), loadImage('assets/cenarios/2.png'), loadImage('assets/cenarios/3.png'), loadImage('assets/cenarios/4.png'), loadImage('assets/cenarios/5.png'), loadImage('assets/cenarios/6.png'), loadImage('assets/cenarios/7.png'), loadImage('assets/cenarios/8.png'), loadImage('assets/cenarios/9.png'), loadImage('assets/cenarios/10.png'), loadImage('assets/cenarios/11.png'), loadImage('assets/cenarios/12.png'), loadImage('assets/cenarios/13.png')]
    personagem = [loadImage('assets/personagem/1.png'),loadImage('assets/personagem/2.png'),loadImage('assets/personagem/3.png'),loadImage('assets/personagem/4.png'),loadImage('assets/personagem/5.png'),loadImage('assets/personagem/6.png'),loadImage('assets/personagem/7.png'),loadImage('assets/personagem/8.png'),loadImage('assets/personagem/9.png'),]
    assets = [loadImage('assets/ui/textCard.png')]
    fonts = [loadFont('assets/fonts/NerkoOne-Regular.ttf'),loadFont('assets/fonts/Neucha-Regular.ttf')]
}

//* Util
let x = 0;
let y = 0;


function gerarDialogo(texto, nome, idPersonagem) {
    image(assets[0], 92, 732);
    image(personagem[idPersonagem], 1198, 102);
    textSize(40);
    textFont(fonts[1]);
    textLeading(30);
    fill("#310E10")
    text(nome, 140, 785);
    
let tamanhoFonte = 35;
let larguraMaxima = 1700; 

textFont(fonts[0]);
fill("#310E10");
textSize(tamanhoFonte);
textLeading(30);

if (texto.length >= 400) {
while (textWidth(texto) > larguraMaxima) {
    tamanhoFonte--;
    textSize(tamanhoFonte);
}
}
text(texto, 140, 830, larguraMaxima, 150);
}

function setup() {
    createCanvas(1920, 1000);
}
  
function draw() {
    image(cenarios[11],0,0);
    gerarDialogo("Boa noite esse é um teste, e melito compre comission da Lily", "Zé da Manga", 8);

}

function mouseReleased(event) {

}