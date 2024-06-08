function preload() {
    soundFormats('mp3', 'ogg');
    bg = loadImage('assets/cenarios/4.webp');
    title = loadImage('assets/ui/GameTitle.webp');
    btn_start = loadImage('assets/ui/btn_start.webp');
    btn_controls = loadImage('assets/ui/btn_controls.webp')
    btn_creditos = loadImage('assets/ui/btn_creditos.webp')
    btn_modal = loadImage('assets/ui/modal.webp')
    closeBtn = loadImage('assets/close.png')
    modal_guide = loadImage('assets/ui/guide.png')
    creditos = loadImage('assets/creditos.png')
    pop = loadSound('assets/audio/pop.mp3')
    menuSound = loadSound('assets/audio/loop.mp3')
  }
  function setup() {
    createCanvas(1920, 1000);

    setTimeout(() => {
        menuSound.setVolume(0.1);
        menuSound.play();
            menuSound.loop();
    }, 500);
    modal = 0
  }
let buttonsMap = new Map();

function buildButton(img, imgName, x, y,scaleSelected) {
    if (!scaleSelected) {
        scaleSelected = 1;
    }
    let sx = img.width * scaleSelected;
    let sy = img.height * scaleSelected;
    let diferenceX = (sx - img.width) / 2;
    let diferenceY = (sy - img.height) / 2;
    if (mouseX > x && mouseX < x + img.width && mouseY > y && mouseY < y + img.height) {
        image(img, x-diferenceX, y-diferenceY, sx, sy);
        buttonsMap.set(imgName, {img:img,x: x-diferenceX, y: y-diferenceY, width: sx, height: sy});
    } else {
        image(img,x,y);
        buttonsMap.set(imgName, {img:img,x: x, y: y, width: img.width, height: img.height});
    }
}

function trackButtonAction(imgName, action) {
    let button = buttonsMap.get(imgName);
    if (button) {
        if (mouseX > button.x && mouseX < button.x + button.width && mouseY > button.y && mouseY < button.y + button.height) {
            pop.play();
            action();
        }
    }
}


function draw() {
    image(bg, 0, 0);
    image(title, 235, 77)
    buildButton(btn_start,'btn_start', 681,376,1.05)
    buildButton(btn_controls,'btn_constrols', 681,520,1.05)
    buildButton(btn_creditos,'btn_creditos', 681,660,1.05)

    if (modal >= 1) {
        image(btn_modal, 313, 154)
        buildButton(closeBtn,'closeBtn', 1535,186,1.1)
    }

    if (modal == 1) {
        image(modal_guide, 313, 154)
    }
    if (modal == 2) {
        image(creditos, 313, 154)
    }

  }
function mouseReleased(event) {

        if (modal == 0) {
            trackButtonAction('btn_start', () => {
                window.location.href = "/game.html"
            });
    
            trackButtonAction('btn_constrols', () => {
                modal = 1;
            });
    
            trackButtonAction('btn_creditos', () => {
                modal = 2;
            });
        }

        if (modal >= 1) {
            trackButtonAction('closeBtn', () => {
                modal = 0;
            });
        }

    
}