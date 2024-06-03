function preload() {
    soundFormats('mp3', 'ogg');
    cenarios = [loadImage('assets/cenarios/1.webp'), loadImage('assets/cenarios/2.webp'), loadImage('assets/cenarios/3.webp'), loadImage('assets/cenarios/4.webp'), loadImage('assets/cenarios/5.webp'), loadImage('assets/cenarios/6.webp'), loadImage('assets/cenarios/7.webp'), loadImage('assets/cenarios/8.webp'), loadImage('assets/cenarios/9.webp'), loadImage('assets/cenarios/10.webp'), loadImage('assets/cenarios/11.webp'), loadImage('assets/cenarios/12.webp'), loadImage('assets/cenarios/13.webp')]
    personagem = [loadImage('assets/personagem/0.webp'),loadImage('assets/personagem/1.webp'),loadImage('assets/personagem/2.webp'),loadImage('assets/personagem/3.webp'),loadImage('assets/personagem/4.webp'),loadImage('assets/personagem/5.webp'),loadImage('assets/personagem/6.webp'),loadImage('assets/personagem/7.webp'),loadImage('assets/personagem/8.webp'),]
    assets = [loadImage('assets/ui/textCard.webp'),loadImage('assets/ui/Vida.png'),loadImage('assets/ui/dead.png')]
    fonts = [loadFont('assets/fonts/NerkoOne-Regular.ttf'),loadFont('assets/fonts/Neucha-Regular.ttf')]
    buttons = [loadImage('assets/ui/button.png'),loadImage('assets/ui/buttonD.png')]
    sounds = [loadSound('assets/audio/pop'),loadSound('assets/audio/loop.mp3'),loadSound('assets/audio/fail.mp3'), loadSound('assets/audio/extra.mp3'),loadSound('assets/audio/dead.mp3'),loadSound('assets/audio/scribble-6144.mp3'),loadSound('assets/audio/timer.mp3')]
    PowerUps = [loadImage('assets/ui/powerups/caixa0.png'),loadImage('assets/ui/powerups/caixa1.png'),loadImage('assets/ui/powerups/Tempo0.png'),loadImage('assets/ui/powerups/Tempo1.png'),loadImage('assets/ui/powerups/Espada.png'),loadImage('assets/ui/powerups/Espada2.png'),loadImage('assets/ui/powerups/Dica.png'),loadImage('assets/ui/powerups/Dica2.png')]

}
/**
 * *  Power Ups
 * ? Tempo Extra
 * ? Elimina 1 Alternativa Errada
 * ? Dica
 * ? Caixa Misteriosa (Pega um Power Up Aleatório) [Bau]
 */

// ? Definição de variáveis
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
let Respostas = []
let Vidas = 3
let previousVidas = Vidas
let numChars = 0
let texto = ''
let previousDialog
let defaultTime = 30
let tempo = defaultTime
let timer;
let TimeIsEnable = false
let historia = [
    {
        'texto': 'Animação do texto aparecendo, parece mágia eu sei mas é apenas javascript',
        'personagem': 3,
        'dica' : "Dica do Zé da Manga",
        'alternativas': ["Próximo", "Não Valeu", "Eu te amo!", "Eu te Odeio!"],
        'timer' : false,
        'correta' : 0
    },
    {
        'texto': 'Uwu Senpai, você é tão kawaii, me nota por favor',
        'personagem': 4,
        'dica' : "Dica do Zé da Manga",
        'alternativas': ["Qual foi Truta", "Tá de cao né?", "", ""],
        'timer' : true,
        'correta' : 0
    }
]
let indice = 0
let Alternativas = historia[indice].alternativas




let PowerUpsSelect = [0,1,2,3]

let Pontos = 0

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
        text("Tempo: " + tempo+"s", 1454, 70);
    }
}

function lostLife() {
    Vidas--;
    if (Vidas == 0) {
        console.log("Game Over");
    }
}

function gerarPontos() {
    textSize(40);
    textFont(fonts[0]);
    fill("#FFFFFF");
    text("Pontos: " + Pontos, 1280, 70);

}

function gerarPowerUps() {

        DrawPowerUps(PowerUps[0], 'caixaMisteriosa', 461, 85,PowerUpsSelect.includes(3) ? 1.15 : 1,!PowerUpsSelect.includes(3));
        DrawPowerUps(PowerUps[3], 'tempoExtra', 100, 90, PowerUpsSelect.includes(0) ? 1.15 : 1,!PowerUpsSelect.includes(0));
        DrawPowerUps(PowerUps[4], 'eliminaAlternativa', 220, 75, PowerUpsSelect.includes(1) ? 1.15 : 1,!PowerUpsSelect.includes(1));
        DrawPowerUps(PowerUps[6], 'dica', 330, 78, PowerUpsSelect.includes(2) ? 1.15 : 1,!PowerUpsSelect.includes(2));

}

function DrawPowerUps(file, name, x, y, scaleSelected, grayscale) {
    if (!scaleSelected) {
        scaleSelected = 1;
    }
    if (grayscale) {
        file.filter(GRAY);
    }
    let sx = file.width * scaleSelected;
    let sy = file.height * scaleSelected;
    let diferenceX = (sx - file.width) / 2;
    let diferenceY = (sy - file.height) / 2;
    if (mouseX > x && mouseX < x + file.width && mouseY > y && mouseY < y + file.height) {
        image(file, x-diferenceX, y-diferenceY, sx, sy);
        buttonsMap.set(name, {img:file,x: x-diferenceX, y: y-diferenceY, width: sx, height: sy});
    } else {
        image(file,x,y);
        buttonsMap.set(name, {img:file,x: x, y: y, width: file.width, height: file.height});
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

function buildResponseBTN(img, imgName, x, y,scaleSelected,texto, grayscale) {
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
        if (!grayscale) {
            image(img, x-diferenceX, y-diferenceY, sx, sy);
            textSize(37);
            text(texto, x+30, y+68)
            buttonsMap.set(imgName, {img:img,x: x-diferenceX, y: y-diferenceY, width: sx, height: sy});
        } else {
            image(buttons[1],x,y);
        textSize(35);
        text(texto, x+30, y+68)
        buttonsMap.set(imgName, {img:img,x: x, y: y, width: img.width, height: img.height});
        }
    } else if (grayscale) {
        image(buttons[1],x,y);
        textSize(35);
        text(texto, x+30, y+68)
        buttonsMap.set(imgName, {img:img,x: x, y: y, width: img.width, height: img.height});
    } else {
        image(img,x,y);
        textSize(35);
        text(texto, x+30, y+68)
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
        buildResponseBTN(buttons[0],'reset', 680, 707,1.015,"Reiniciar"); 
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

function sucessResponse() {
    Pontos++;
    indice++;
    Respostas = [];
}

function failResponse(id) {
    lostLife();
    Respostas.push(id);
}

function draw() {
    image(cenarios[11],0,0);



 
    drawLifes();
    if (Vidas > 0) {
        gerarPowerUps()
        let somEscrita = sounds[5]
        if (numChars < texto.length) {
            if (numChars <= texto.length && !somEscrita.isPlaying()) {
                somEscrita.play();
            }
            numChars++;
        }
        if (numChars == texto.length && numChars != 0) {
            if (!historia[indice].timer) {
                tempo = defaultTime;
                TimeIsEnable = false;
            } else {
                TimeIsEnable = true;
            }
        }
        
        if (indice != previousDialog) {
            numChars = 0;
            previousDialog = indice;
            Respostas = [];

        }
        previousDialog = indice
        gerarDialogo(historia[indice].texto,personagens[historia[indice].personagem].nome, personagens[historia[indice].personagem].imagem)
        Alternativas = historia[indice].alternativas
        gerarTimer();
        gerarPontos();

        const buttonNames = ['0', '1', '2', '3'];
        let PosBtns = 605
        for (let i = 0; i < 4; i++) {
            if (Alternativas[i] != "") {
                buildResponseBTN(buttons[0], buttonNames[i], 92, PosBtns, 1.015, Alternativas[i], Respostas.includes(i));
                PosBtns -= 128;
            }
        }
    }

}

function mouseReleased(event) {
    if (Vidas > 0) {

    //? Power Ups


    //Alternativas e respostas
    trackButtonAction('0', () => {
        sounds[0].play(); 
        if(!Respostas.includes(0)) {
            if (0 == historia[indice].correta) {
                sucessResponse();
            } else {
                failResponse(0);
            }
        }

    });
    trackButtonAction('1', () => {
        sounds[0].play(); 
        if(!Respostas.includes(1)) {
            if (1 == historia[indice].correta) {
                sucessResponse();
            } else {
                failResponse(1);
            }
        }

    });
    trackButtonAction('2', () => {
        sounds[0].play(); 
        if(!Respostas.includes(2)) {
            if (2 == historia[indice].correta) {
                sucessResponse();
            } else {
                failResponse(2);
            }
        }
    });
    trackButtonAction('3', () => {
        sounds[0].play(); 
        if(!Respostas.includes(3)) {
            if (3 == historia[indice].correta) {
                sucessResponse();
            } else {
                failResponse(3);
            }
        }
    });

    //* Power Up Tempo Extra = Adiciona 30 segundos ao tempo    
    trackButtonAction('tempoExtra', () => {
        sounds[0].play(); 
        if (PowerUpsSelect.includes(0) && TimeIsEnable == true) {
            tempo = tempo + 30;
            PowerUpsSelect.splice(PowerUpsSelect.indexOf(0),1);
        }
    });

    //* Power Up Eliminar Metade das Arternativas
    trackButtonAction('eliminaAlternativa', () => {
        sounds[0].play(); 
        if (PowerUpsSelect.includes(1)) {
            let correta = historia[indice].correta;
            let alternativas = [0,1,2,3];
            alternativas.splice(correta,1);
            alternativas.splice(Math.floor(Math.random() * alternativas.length),1);
            Respostas = alternativas;
            PowerUpsSelect.splice(PowerUpsSelect.indexOf(1),1);
        }
    
    }
    );
}




if (Vidas == 0) {
    trackButtonAction('reset', () => {
        window.location.href = "/index.html"
    })};

}