function preload() {
    soundFormats('mp3', 'ogg');
    cenarios = [loadImage('assets/cenarios/1.webp'), loadImage('assets/cenarios/2.webp'), loadImage('assets/cenarios/3.webp'), loadImage('assets/cenarios/4.webp'), loadImage('assets/cenarios/5.webp'), loadImage('assets/cenarios/6.webp'), loadImage('assets/cenarios/7.webp'), loadImage('assets/cenarios/8.webp'), loadImage('assets/cenarios/9.webp'), loadImage('assets/cenarios/10.webp'), loadImage('assets/cenarios/11.webp'), loadImage('assets/cenarios/12.webp'), loadImage('assets/cenarios/13.webp')]
    personagem = [loadImage('assets/personagem/0.webp'),loadImage('assets/personagem/1.webp'),loadImage('assets/personagem/2.webp'),loadImage('assets/personagem/3.webp'),loadImage('assets/personagem/4.webp'),loadImage('assets/personagem/5.webp'),loadImage('assets/personagem/6.webp'),loadImage('assets/personagem/7.webp'),loadImage('assets/personagem/8.webp'),]
    assets = [loadImage('assets/ui/textCard.webp'),loadImage('assets/ui/Vida.png'),loadImage('assets/ui/dead.png')]
    fonts = [loadFont('assets/fonts/NerkoOne-Regular.ttf'),loadFont('assets/fonts/Neucha-Regular.ttf')]
    buttons = [loadImage('assets/ui/up.png'),loadImage('assets/ui/down.png'),loadImage('assets/ui/left.png'),loadImage('assets/ui/right.png')]
    sounds = [loadSound('assets/audio/pop'),loadSound('assets/audio/loop.mp3'),loadSound('assets/audio/fail.mp3'), loadSound('assets/audio/extra.mp3'),loadSound('assets/audio/dead.mp3'),loadSound('assets/audio/scribble-6144.mp3'),loadSound('assets/audio/timer.mp3')]
    

}


    // ? Definição de variáveis
let alternativaA = "Próximo"
let alternativaB = "Não Valeu"
let alternativaC = "Eu te amo!"
let alternativaD = "Eu te Odeio!"
let respostaCorreta = 0
let Respostas = []
let Vidas = 3
let previousVidas = Vidas
let numChars = 0
let texto = ''
let dialog
let previousDialog
let defaultTime = 30
let tempo = defaultTime
let timer;
let timeSet = false;
let historia = [
    {
        'texto': 'Animação do texto aparecendo, parece mágia eu sei mas é apenas javascript',
        'personagem': 3,
        'dica' : "Dica do Zé da Manga",
        'alternativas': [
            {
                'texto': 'Próximo',
                'resposta': 0
            },
            {
                'texto': 'Não Valeu',
                'resposta': 1
            },
            {
                'texto': 'Eu te amo!',
                'resposta': 1
            },
            {
                'texto': 'Eu te Odeio!',
                'resposta': 1
            }
        ]
    }
]
let TimeIsEnable = false

let personagens = [
    {
        'nome': 'Guarda da Cidade',
        'imagem': 0
    },
    {
        'nome': 'A Fantasma',
        'imagem': 1
    },
    {
        'nome': 'A Camponesa',
        'imagem': 2
    },
    {
        'nome' : 'O Zé da Manga',
        'imagem' : 3
    },
    {
        'nome' : 'A Goblina da Floresta',
        'imagem' : 4
    },
    {
        'nome' : 'A Feiticeira',
        'imagem' : 5
    },
    {
        'nome' : 'A Fazedora de Pães',
        'imagem' : 6
    },
    {
        'nome' : 'O Barão',
        'imagem' : 7
    },
    {
        nome: 'O Goblin Biscoiteiro',
        imagem: 8
    }
]


//* Util
/**
 * 
 * @param {strig} texto 
 * @param {string} nome 
 * @param {number} idPersonagem 
 */
function gerarDialogo(texto_input, nome, idPersonagem) {
    texto = texto_input;
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

    // Exibe apenas uma parte do texto
    let textoParcial = texto_input.substring(0, numChars);
    text(textoParcial, 140, 830, larguraMaxima, 150);
}

function gerarTimer(){

    if (TimeIsEnable) {
        textSize(40);
        textFont(fonts[0]);
        if (tempo > 10) {
            fill("#FFFFFF");
        } else{
            fill("#FF0000");
        }
        text("Tempo: " + tempo+"s", 1454, 65);
    }
}

function lostLife() {
    Vidas--;
    if (Vidas == 0) {
        console.log("Game Over");
    }
}

/**
 * 
 * @param {number} tipo 
 * @param {string} pergunta 
 * @param {number} x 
 * @param {number} y 
 */

let buttonsMap = new Map();

function buildResponseBTN(img, imgName, x, y,scaleSelected,texto) {
    if (!scaleSelected) {
        scaleSelected = 1;
    }
    let sx = img.width * scaleSelected;
    let sy = img.height * scaleSelected;
    let diferenceX = (sx - img.width) / 2;
    let diferenceY = (sy - img.height) / 2;
    textFont(fonts[0]);
    fill("#310E10");
    if (mouseX > x && mouseX < x + img.width && mouseY > y && mouseY < y + img.height) {
        image(img, x-diferenceX, y-diferenceY, sx, sy);
        textSize(37);
        text(texto, x+75, y+68)
        buttonsMap.set(imgName, {img:img,x: x-diferenceX, y: y-diferenceY, width: sx, height: sy});
    } else {
        image(img,x,y);
        textSize(35);
        text(texto, x+75, y+68)
        buttonsMap.set(imgName, {img:img,x: x, y: y, width: img.width, height: img.height});
    }
}

function trackButtonAction(imgName, action) {
    let button
    if (buttonsMap.has(imgName)) {
        button = buttonsMap.get(imgName);
    }
    if (!button) {
        return;
    }
    if (mouseX > button.x && mouseX < button.x + button.width && mouseY > button.y && mouseY < button.y + button.height) {
        sounds[0].play(); 
        action();
    }
}

function drawLifes() {
    for (let i = 0; i < Vidas; i++) {
    image(assets[1], 1650 + (i * 75), 40);
    }
    let soundLostLive = sounds[2];
    let soundWinLive = sounds[3];
    let Dead = sounds[4];
    if (Vidas == 0) {
        image(assets[2], 0, 0); 
        buildResponseBTN(buttons[2],'reset', 680, 707,1.015,"Reiniciar"); 
    }

    if (Vidas == 0 && !Dead.isPlaying()) {
        Dead.play();       
    }

    if (Vidas < previousVidas && Vidas != 0) {
        soundLostLive.play();
    }
    if (Vidas > previousVidas) {
        soundWinLive.play();
    }
    previousVidas = Vidas;
}

function setup() {
    createCanvas(1920, 1000);
    timer = setInterval(() => {
        if (Vidas !== 0) {
            if (TimeIsEnable == true) {

                if (tempo == 0) {
                    TimeIsEnable = false;
                    lostLife();
                    sounds[6].stop();
                    tempo = defaultTime;
                }
    
                if (tempo == 15 && !sounds[6].isPlaying()) {
                    sounds[6].play();
                }
    
                tempo--;
            }
        }
    }, 1000);
}
  
function draw() {
    image(cenarios[11],0,0);




    drawLifes();
    if (Vidas > 0) {
        let somEscrita = sounds[5]
        if (numChars < texto.length) {
            if (numChars <= texto.length && !somEscrita.isPlaying()) {
                somEscrita.play();
            }
            numChars++;
        }
        if (numChars == texto.length && numChars != 0 && !timeSet) {
            TimeIsEnable = true;
            timeSet = true;
        }
        


        if (dialog != previousDialog) {
            numChars = 0;
            previousDialog = dialog;
        }
        previousDialog = dialog
        if (dialog == 0) {
            gerarDialogo("Animação do texto aparecendo, parece mágia eu sei mas é apenas javascript", "Zé da Manga", 3);
        } else {
            gerarDialogo("Esse é um teste de animações para o jogoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaa", "Zé da Manga", 3);
        }   
        gerarTimer();

        if (alternativaA != "") {
            buildResponseBTN(buttons[0],'up_btn', 92, 598,1.015,alternativaA);
        }
        if (alternativaB != "") {
            buildResponseBTN(buttons[1],'down_btn', 92, 470,1.015,alternativaB);
        }
        if (alternativaC != "") {
            buildResponseBTN(buttons[2],'left_btn', 92, 342,1.015,alternativaC);
        }
        if (alternativaD != "") {
            buildResponseBTN(buttons[3],'right_btn', 92, 214,1.015,alternativaD);
        }
    }

}

function mouseReleased(event) {
    if (Vidas > 0) {
    trackButtonAction('left_btn', () => {
        console.log("Botão esquerda")
    });
    trackButtonAction('right_btn', () => {
        console.log("Botão direita")
    });
    trackButtonAction('down_btn', () => {
        console.log("Botão baixo")
    });
    trackButtonAction('up_btn', () => {
        console.log("Botão cima")
    });
}


if (Vidas == 0) {
    trackButtonAction('reset', () => {
        window.location.href = "/index.html"
    })};

}