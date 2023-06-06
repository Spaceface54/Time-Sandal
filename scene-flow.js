let c = 1;
class Studio extends Phaser.Scene {
    constructor() {
        super('studio');
    }
    create() {
        this.add.text(this.game.config.width/4, 200, "GameFLOP Studio").setFontSize(65);
        this.cameras.main.setBackgroundColor("0xFF0000");
        this.add.text(400, 600, "Click to continue").setFontSize(35);

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('title');
                c = 2; //just wanted to add a global variable that is remembered & updated across scenes
                console.log('c: ' +c);
            });
        });
    }
}

class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    create() {
        this.cameras.main.fadeIn(50, 0, 0, 0);
        this.add.text(this.game.config.width / 4, 200, "TIME SANDAL:\nThe Sandal of Time").setFontSize(65);
        this.add.text(this.game.config.width / 4, 500, "CLICK TO PLAY").setFontSize(45);

        this.input.on('pointerdown', () => {
            this.cameras.main.fadeOut(1250, 255,250,205);
            this.time.delayedCall(1250, () => {
                this.scene.start('l1');
            });
            c = 3;
            console.log('c: ' +c);
        })
    }
}

class Level1 extends Phaser.Scene {
    constructor() {
        super('l1');
    }

    create() {
        this.cameras.main.fadeIn(1250, 255,250,205);
        this.add.text(300, 150, "*LEVEL 1 - tutorial*").setFontSize(55);
        this.add.text(300, 300, "Drag from left to right to \ncomplete the level").setFontSize(40);
        this.g = this.add.circle(this.game.config.width - 400, this.game.config.height - 200, 50, 0x0000ff);
        this.b = this.add.circle(300, this.game.config.height - 200, 30, 0xfffff);

        this.b.setInteractive({ draggable: true });
        //code below taken from https://labs.phaser.io/edit.html?src=src/input/dragging/drag%20horizontally.js
        //~~~~~~~~
        this.input.on('drag', (pointer, gameObject, dragX) => {

            //  By clamping dragX we can keep it within
            //  whatever bounds we need
            dragX = Phaser.Math.Clamp(dragX, 100, this.game.config.width - 400);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.x = dragX;

        });
        //~~~~~~~~~
    }
    update() {
        if (this.b.x == this.g.x) {
            this.scene.start('l2');
            c = 4;
            console.log('c: ' +c);
        }
    }
}


class Level2 extends Phaser.Scene{
    constructor(){
        super('l2');
    }

    create() {
        this.add.text(300, 150, "*LEVEL 2*").setFontSize(55);
        this.add.text(300, 300, "Drag from left to right to \ncomplete the level").setFontSize(40);
        this.g = this.add.circle(this.game.config.width - 400, this.game.config.height - 200, 50, 0x0000ff);
        this.b = this.add.circle(300, this.game.config.height - 200, 30, 0xfffff);

        this.b.setInteractive({ draggable: true });
        //code below taken from https://labs.phaser.io/edit.html?src=src/input/dragging/drag%20horizontally.js
        //~~~~~~~~
        this.input.on('drag', (pointer, gameObject, dragX) => {

            //  By clamping dragX we can keep it within
            //  whatever bounds we need
            dragX = Phaser.Math.Clamp(dragX, 100, this.game.config.width - 400);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.x = dragX;

        });
        //~~~~~~~~~
    }
    update() {
        if (this.b.x == this.g.x) {
            this.scene.start('l3');
            c = 5;
            console.log('c: ' +c);
        }
    }
}

class Level3 extends Phaser.Scene {
    constructor(){
        super('l3')
    }
    create() {
        this.add.text(300, 150, "*LEVEL 3*").setFontSize(55);
        this.add.text(300, 300, "Drag from left to right to \ncomplete the level").setFontSize(40);
        this.g = this.add.circle(this.game.config.width - 400, this.game.config.height - 200, 50, 0x0000ff);
        this.b = this.add.circle(300, this.game.config.height - 200, 30, 0xfffff);

        this.b.setInteractive({ draggable: true });
        //code below taken from https://labs.phaser.io/edit.html?src=src/input/dragging/drag%20horizontally.js
        //~~~~~~~~
        this.input.on('drag', (pointer, gameObject, dragX) => {

            //  By clamping dragX we can keep it within
            //  whatever bounds we need
            dragX = Phaser.Math.Clamp(dragX, 100, this.game.config.width - 400);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.x = dragX;

        });
        //~~~~~~~~~
    }
    update() {
        if (this.b.x == this.g.x) {
            this.scene.start('end');
            c = 6;
            console.log('c: ' +c);
        }
    }
}

class Ending extends Phaser.Scene{
    constructor(){
        super('end');
    }
    create(){
        this.add.text(400, 200, "YOU DID IT!").setFontSize(55);
        this.add.text(400, 400, "THANK YOU FOR PLAYING!").setFontSize(55);
        this.add.text(450, 500, "Click or tap to play again!").setFontSize(35);

        this.input.on('pointerdown', () =>{
            this.scene.start('l1');
            c = 7;
            console.log('c: ' +c);
        })
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
    },
    scene: [Studio, Title, Level1, Level2, Level3, Ending],
    title: "Scene Flow Prototype"
});