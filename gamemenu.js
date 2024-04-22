function preload() {
    bg = loadImage('assets/game_bg.png');
    title = loadImage('assets/title.png');
    btn_start = loadImage('assets/btn_start.png');
    btn_controls = loadImage('assets/btn_controls.png')
    btn_creditos = loadImage('assets/btn_creditos.png')
    btn_modal = loadImage('assets/Modal.png')
    closeBtn = loadImage('assets/close.png')
  }
  
  function setup() {
    createCanvas(1920, 1000);
    modal = false
  }
  
  
function draw() {
    image(bg, 0, 0);
    image(title, 235, 77)
    image(btn_start, 681,376)
    if (mouseX > 681 && mouseX < 681 + 558 && mouseY > 376 && mouseY < 376 + 178) {
        image(btn_start, 681-5, 376-5, 558+10, 178+10)
        
    }

    image(btn_controls, 681, 520)
    if (mouseX > 681 && mouseX < 681 + 558 && mouseY > 520 && mouseY < 520 + 178) {
        image(btn_controls, 681-5, 520-5, 558+10, 178+10)
    }
    image(btn_creditos, 681, 660)
    if (mouseX > 681 && mouseX < 681 + 558 && mouseY > 660 && mouseY < 660 + 178) {
        image(btn_creditos, 681-5, 660-5, 558+10, 178+10)
    }


    if (modal == true) {
        image(btn_modal, 313, 154)
        
        if (mouseX > 1535 && mouseX < 1535 + 50 && mouseY > 186 && mouseY < 186 + 50) {
            image(closeBtn, 1535-7, 186-7, 50+10, 50+10)
        } else {
            image(closeBtn, 1535,186)
        }
    }
  }

function mouseReleased(event) {
    if (mouseX > 681 && mouseX < 681 + 558 && mouseY > 376 && mouseY < 376 + 178) {
        window.location.href = 'game.html'
    }
    if (mouseX > 681 && mouseX < 681 + 558 && mouseY > 520 && mouseY < 520 + 178) {
        modal = true
    }
    if (mouseX > 681 && mouseX < 681 + 558 && mouseY > 660 && mouseY < 660 + 178) {
        modal = true
    }

    if (modal == true) {
        if (mouseX > 1535 && mouseX < 1535 + 50 && mouseY > 186 && mouseY < 186 + 50) {
            modal = false
        }
    }
}