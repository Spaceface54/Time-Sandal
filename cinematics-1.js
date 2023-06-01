class logo extends Phaser.Scene {
    constructor() {
        super("logo");
        this.w;
        this.h;
        this.state = false;
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image('game', 'Game.png');
        this.load.image('flop', 'Flop.png');
        this.load.image('gameflop', 'Gameflop.png');

    }
    create() {
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        let game = this.add.image(-260, 250, 'game');
        let flop =  this.add.image(1240, 259, 'flop');
        
        this.tweens.add({
            targets: game,
            x: 300,
            scale: 1,
            duration: 1000,
            ease: 'circ.in'
        });

        this.tweens.add({
            targets: flop,
            x: 770,
            scale: 1,
            duration: 1000,
            ease: 'circ.in'
        });

        this.tweens.add({
            targets: game,
            scale: 1,
            delay: 1500,
            angle: 3240,
            duration: 1000,
            ease: 'cubic.inOut'
        });

        this.tweens.add({
            targets: flop,
            delay: 1500,
            scale: 1,
            angle:-3240,
            duration: 1000,
            ease: 'cubic.inOut'
        });

        //+9pt offset on 'flop' y-coord
        this.add.text(500, 500, "Company logo")
            .setColor(0xffffff);
        //this.add.image(500,400,'gameflop');

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('title');
            });
        });
    }
}

class title extends Phaser.Scene {
    constructor() {
        super("title");
    }

    preload() { }

    create() { 
        this.add.text(500, 500, "Title Screen")
        .setColor(0xffffff);

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('intro');
            });
        });
    }

}

class intro extends Phaser.Scene {
    constructor() {
        super("intro");
    }

    preload() { }

    create() {
        this.add.text(500, 500, "Story intro")
            .setColor(0xffffff);

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('end');
            });
        });
     }

}

class end extends Phaser.Scene {
    constructor() {
        super("end");
    }

    preload() { }

    create() { 
        this.add.text(500, 500, "Story ending.")
            .setColor(0xffffff);
    }

}




const config = {
    type: Phaser.AUTO,
    width: 1040,
    height: 612,
    backgroundColor: 0xbbbbbb,
    scene: [logo,title,intro,end]
};
const game = new Phaser.Game(config);