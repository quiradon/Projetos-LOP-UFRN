function preload() {
    soundFormats('mp3', 'ogg');
    cenarios = [loadImage('assets/cenarios/1.webp'), loadImage('assets/cenarios/2.webp'), loadImage('assets/cenarios/3.webp'), loadImage('assets/cenarios/4.webp'), loadImage('assets/cenarios/5.webp'), loadImage('assets/cenarios/6.webp'), loadImage('assets/cenarios/7.webp'), loadImage('assets/cenarios/8.webp'), loadImage('assets/cenarios/9.webp'), loadImage('assets/cenarios/10.webp'), loadImage('assets/cenarios/11.webp'), loadImage('assets/cenarios/12.webp'), loadImage('assets/cenarios/13.webp')]
    personagem = [loadImage('assets/personagem/0.webp'),loadImage('assets/personagem/1.webp'),loadImage('assets/personagem/2.webp'),loadImage('assets/personagem/3.webp'),loadImage('assets/personagem/4.webp'),loadImage('assets/personagem/5.webp'),loadImage('assets/personagem/6.webp'),loadImage('assets/personagem/7.webp'),loadImage('assets/personagem/8.webp'),loadImage('assets/personagem/9.png')]
    assets = [loadImage('assets/ui/textCard.webp'),loadImage('assets/ui/Vida.png'),loadImage('assets/ui/dead.png'),loadImage('assets/ui/win.png')]
    fonts = [loadFont('assets/fonts/NerkoOne-Regular.ttf'),loadFont('assets/fonts/Neucha-Regular.ttf')]
    buttons = [loadImage('assets/ui/button.png'),loadImage('assets/ui/buttonD.png')]
    sounds = [loadSound('assets/audio/pop'),loadSound('assets/audio/loop.mp3'),loadSound('assets/audio/fail.mp3'), loadSound('assets/audio/extra.mp3'),loadSound('assets/audio/dead.mp3'),loadSound('assets/audio/scribble-6144.mp3'),loadSound('assets/audio/timer.mp3'),loadSound('assets/audio/caixaMisteriosa.mp3')]
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
        'nome' : 'O Bardo',
        'imagem' : 7
    },
    {
        nome: 'Zé da Manga sem chapéu',
        imagem: 8
    },
    {
        nome: 'Narrador',
        imagem:9
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
        "texto": "Seja bem vindo a Masmorra do Conhecimento! Você é um aventureiro em busca de respostas e conhecimento. Bem saiba que aqui você terá que responder perguntas e desafios para prosseguir. Boa sorte!",
        "personagem": 0,
        "dica": "Você deve aceitar a proposta",
        "alternativas": ["Fazer o que né", "", "", ""],
        "timer": false,
        "correta": 0,
        "ambiente" : 7
    },
    {
        "texto": "Durante sua jornada, você encontra duas poções mágicas. Se você misturar uma poção que concede 2 de poder e outra que concede 2 de sabedoria usando o feitiço `console.log(2 + 2);`, quantos pontos de atributo você receberá no total?",
        "personagem": 0,
        "dica": "Você deve somar os poderes mágicos de forma simples!",
        "alternativas": ["22", "4", "5", "3"],
        "timer": true,
        "correta": 1,
        "ambiente" : 7
    },
    {
        "texto": "No coração da Floresta Encantada, você encontra um sábia goblin que fala sobre os mistérios das trilhas mágicas. Ele pergunta: 'As estruturas de repetição são como os caminhos sinuosos da floresta. Será que elas alteram o fluxo do código mágico?'",
        "personagem": 4,
        "dica": "Imagine o código como um fluxograma encantado, onde cada decisão leva a uma nova trilha.",
        "alternativas": ["Não.", "Pergunta no Posto Ipiranga.", "Sim.", "Nenhuma das alternativas."],
        "timer": true,
        "correta": 2,
        "ambiente" : 6
    },
    {
        "texto": "Enquanto atravessa a Floresta dos Feitiços, você encontra uma árvore antiga com uma inscrição misteriosa guardadas por um goblin. Se você decifrar o enigma 'typeof 'Hello World'', que segredo da floresta será revelado?",
        "personagem": 3,
        "dica": "As palavras antigas da árvore, retorna o tipo!",
        "alternativas": ["string", "number", "object", "boolean"],
        "timer": true,
        "correta": 0,
        "ambiente" : 6
    },
    {
        "texto": "Ao decifrar você encontra um antigo tomo encantado intitulado 'Os Segredos da Magia'. Ao abri-lo, uma voz sussurra suavemente: 'O comando \"prompt()\" é como um espelho mágico que:'",
        "personagem": 3,
        "dica": "Alguém precisa ouvir o que esta sendo dito...",
        "alternativas": ["Transforma os números em reais.", "Arredonda para a casa decimal escolhida;", "Capta as informações repassadas.", "Cria variáveis para o código."],
        "timer": true,
        "correta": 2,
        "ambiente" : 6
    },
    {
        "texto" : "Caraca, você é muito bom! Você conseguiu passar por todos os desafios da Floresta! Te acompanharei até a entrada da Gruta!",
        "personagem" : 3,
        "dica" : "",
        "alternativas" : ["Agradeço!", "", "", ""],
        "timer" : false,
        "correta" : 0,
        "ambiente" : 6
    },
    {
        'texto': ' ',
        'personagem': 100,
        'dica' : "",
        'alternativas': ["", "", "", ""],
        'timer' : false,
        'correta' : 1,
        "ambiente" : 8
    },
    {
        "texto" : "Eu me disperso aqui, boa jornada!",
        "personagem" : 3,
        "dica" : "",
        "alternativas" : ["Até a proxima!", "", "", ""],
        "timer" : false,
        "correta" : 0,
        "ambiente" : 8
    },
    {
        "texto": "Ao explorar as Ruínas do Conhecimento, você encontra um pergaminho encantado. Nele está escrito: 'Para adicionar uma nova lição à sua jornada, use o encantamento conhecido como...?'",
        "personagem": 9,
        "dica": "O pergaminho ensina o método frequentemente usado para manipular arrays!",
        "alternativas": ["pop()", "shift()", "push()", "unshift()"],
        "timer": true,
        "correta": 2,
        "ambiente" : 8
    },
    {
        "texto": "Ao lançar o feitiço `console.log('5' == 5);` em seu mapa mágico, que revelação é trazida à luz?",
        "personagem": 9,
        "dica": "Contemple os mistérios das comparações entre diferentes essências.",
        "alternativas": ["Uma true harmonia entre mundos", "Uma false nas essências", "A aura do número 5", "O eco da essência '5'"],
        "timer": true,
        "correta": 0,
        "ambiente": 9
    },
    {
        "texto": "Prazer eu sou o Bardo, e não posso permitir que você passe sem responder a minha charada!",
        "personagem": 7,
        "dica": "",
        "alternativas": ["Fazer o que né", "", "", ""],
        "timer": false,
        "correta": 0,
        "ambiente": 9
    },
    {
        "texto": "No Vale dos Elementos, onde a terra encontra o céu, surge a necessidade de unir os elementos dispersos. Qual encantamento você conjuraria para combinar dois elementos em um só?",
        "personagem": 7,
        "dica": "Poder dos métodos que criam uma nova entidade.",
        "alternativas": ["concat()", "join()", "push()", "slice()"],
        "timer": true,
        "correta": 0,
        "ambiente": 9
    },
    {
        "texto": "Mas assim, tão rápido? não vou te fazer mais uma pergunta então!",
        "personagem": 7,
        "dica": "",
        "alternativas": ["É Serio isso?", "", "", ""],
        "timer": false,
        "correta": 0,
        "ambiente": 9
    },
    {
        "texto": "É a ultima eu prometo! Depois disso te levarei ao proximo andar!",
        "personagem": 7,
        "dica": "",
        "alternativas": ["Tá bom!", "", "", ""],
        "timer": false,
        "correta": 0,
        "ambiente": 9
    },
    {
        "texto": "Você está combinando poderosos artefatos em uma jornada mágica. Qual seria o resultado quando você tenta combinar os artefatos `[1, 2, 3]` e `[4, 5, 6]`?",
        "personagem": 7,
        "dica": "Pense em como a linguagem JavaScript lida com a combinação de dois conjuntos de elementos.",
        "alternativas": ["[1, 2, 3, 4, 5, 6]", "1,2,34,5,6", "TypeError", "123456"],
        "timer": false,
        "correta": 3,
        "ambiente": 10
    },
    {
        "texto" : "Como prometido, te levarei até a bruxa da masmorra no ultimo andar!",
        "personagem" : 7,
        "dica" : "",
        "alternativas" : ["Obrigado!", "", "", ""],
        "timer" : false,
        "correta" : 0,
        "ambiente" : 10
    },
    {
        'texto': ' ',
        'personagem': 100,
        'dica' : "",
        'alternativas': ["", "", "", ""],
        'timer' : false,
        'correta' : 1,
        "ambiente" : 10
    },
    {
        "texto": "Você começa a descer as escadas da masmorra, e nota um lugar amplo e iluminado como se fosse ao ceu aberto.",
        "personagem": 9,
        "dica": "",
        "alternativas": ["Continuar", "", "", ""],
        "timer": false,
        "correta": 0,
        "ambiente": 3
    },
    {
        "texto" : "Você se depara com uma bruxa, ela te olha com um olhar de desdém e diz: 'O Que você faz em minha masmorra?",
        "personagem" : 5,
        "dica" : "",
        "alternativas" : ["Vim em busca de conhecimento", "", "", ""],
        "timer" : false,
        "correta" : 0,
        "ambiente" : 3
    },
    {
        "texto" : "A bruxa te olha com um olhar de desdém e diz: 'Se você quer o conhecimento, responda a mim 3 perguntas!",
        "personagem" : 5,
        "dica" : "",
        "alternativas" : ["Estou pronto!", "", "", ""],
        "timer" : false,
        "correta" : 0,
        "ambiente" : 3
    },
    {
        "texto": "Em uma jornada pela Terra dos Vetores, Zé da Manga se depara com um desafio: 'Se deparando com um enigma. Qual é o índice do valor mágico que você busca dentro do vetor? Se o valor aparecer mais de uma vez, todos os índices serão revelados!'",
        "personagem": 5,
        "dica": "Desbrave os segredos dos vetores e descubra o poder da busca.",
        "alternativas": ["Os índices onde o valor é encontrado", "A soma dos índices onde o valor é encontrado", "O maior índice onde o valor é encontrado", "O menor índice onde o valor é encontrado"],
        "timer": true,
        "correta": 0,
        "ambiente" : 3
    },
    {
        'texto': 'O explorador estava com sua mochila cheia e precisava depositar mais um item que havia conseguido, mas não sabia o que tirar dela, sabendo que sua mochila pode carregar um total de 75Kg e que o novo item pesa 7kg quantos por cento ele precisa tirar da mochila para poder carregar esta item?',
        'personagem': 5,
        'dica' : "",
        'alternativas': ["90,6", "89,8", "75", "70"],
        'timer' : true,
        'correta' : 0  ,
        "ambiente" : 3  
    },
    {
        'texto': 'Em uma taverna existem 40 exploradores, sabendo que 30% gostam de materiais radioativos, quantos exploradores não gostam desse tipo de material?',
        'personagem': 5,
        'dica' : "É um numero multiplo de 3 e 4",
        'alternativas': ["16", "14", "12", "10"],
        'timer' : false,
        'correta' : 2    ,
        "ambiente" : 3
    },
    {
        'texto' : 'A Bruxa então te entrega um frasco com um liquido azul e diz: "Este é o liquido da sabedoria',
        'personagem' : 9,
        'dica' : "",
        'alternativas' : ["Sair daqui!", "", "", ""],
        'timer' : false,
        'correta' : 0,
        "ambiente" : 3
    },
    {
        'texto' : 'Já distante da sala da bruxa, você decide abrir o frasco e ver se a poção realmente funciona!',
        'personagem' : 9,
        'dica' : "",
        'alternativas' : ["Beber!", "", "", ""],
        'timer' : false,
        'correta' : 0,
        "ambiente" : 3
    },
    {
        'texto' : 'Você venceu!',
        'personagem' : 102,
        'dica' : "",
        'alternativas' : ["", "", "", ""],
        'timer' : false,
        'correta' : 0,
        "ambiente" : 3
    }
    

    
]
let indice = 0 // A Fase a qual o jogo inicia
let Alternativas = historia[indice].alternativas
let transition = 0
let transOpacity = 0

function pageTransition() {
    fill(0, 0, 0, transOpacity);
    rect(0, 0, width, height);
    textSize(50);
    textFont(fonts[0]);
    fill(255, 255, 255, transOpacity);
    textAlign(CENTER, CENTER);
    text("Carregando...", width / 2, height / 2);

    if (transition > 0 && transition < 150) {
        transOpacity += 10;
    } else if (transition > 150 && transOpacity > 0) {
        transOpacity -= 10;
    }
    if (transition <= 300) {
        transition += 1;
    }

    
}


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

    if (nome == undefined) {
        nome = 'null';
    }
    if (idPersonagem == 100) {
        transition = 1;
        indice++;
        return
    }

    texto = texto_input;
    image(assets[0], 92, 732);
    image(personagem[idPersonagem], 1198, 102);
    textSize(40);
    textFont(fonts[1]);
    textLeading(30);
    fill("#310E10")
    textAlign(LEFT,BASELINE);
    text(nome ?? 'null', 140, 785);
    
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

        DrawPowerUps(PowerUps[0], 'caixaMisteriosa', 330, 78,PowerUpsSelect.includes(3) ? 1.15 : 1,!PowerUpsSelect.includes(3));
        DrawPowerUps(PowerUps[3], 'tempoExtra', 100, 90, PowerUpsSelect.includes(0) ? 1.15 : 1,!PowerUpsSelect.includes(0));
        DrawPowerUps(PowerUps[4], 'eliminaAlternativa', 220, 75, PowerUpsSelect.includes(1) ? 1.15 : 1,!PowerUpsSelect.includes(1));
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
    textAlign (LEFT, BASELINE);
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
    tempo = defaultTime;
    Pontos++;
    indice++;
    Respostas = [];
}

function failResponse(id) {
    lostLife();
    Respostas.push(id);
}

function draw() {
    image(cenarios[historia[indice].ambiente],0,0,1920,1080); 

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
        if (historia[indice]?.personagem == 102) {
            console.log("Você venceu!");
            image(assets[3], 0, 0);
            return
        }

        previousDialog = indice
        
        if ( transition == 0 || transition > 300) {

        gerarDialogo(historia[indice]?.texto,personagens[historia[indice]?.personagem]?.nome ?? 'null', personagens[historia[indice]?.personagem]?.imagem ?? 100)
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
    if (transition > 0) {
    pageTransition();
    }
}

function mouseReleased(event) {
    if (Vidas > 0) {

    //? Power Ups


    if ( transition == 0 || transition > 300) {
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
    }
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

    trackButtonAction('caixaMisteriosa', () => {
        if (PowerUpsSelect.includes(3)) { 
            sounds[7].play();
            indice++;
            PowerUpsSelect.splice(PowerUpsSelect.indexOf(3),1);
        }
    }
    );
    }




if (Vidas == 0) {
    trackButtonAction('reset', () => {
        window.location.href = "/index.html"
    })};

}