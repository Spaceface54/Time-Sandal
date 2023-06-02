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
        let flop =  this.add.image(1240, 260, 'flop');
        let gameflop = this.add.image(504,258,'gameflop')
        .setVisible(false);
        
        this.tweens.add({
            targets: game,
            x: 310,
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
        
        this.time.delayedCall(1500,() => {
            game.setVisible(false);
            flop.setVisible(false);
            gameflop.setVisible(true);

        })

        this.tweens.add({
            targets: gameflop,
            scale: 1,
            delay: 1600,
            angle: 6480,
            duration: 2000,
            ease: 'cubic.inOut'
        });
       
        this.time.delayedCall(4000,() => {
            game.setVisible(true);
            flop.setVisible(true);
            gameflop.setVisible(false);
            flop.setOrigin(0.1,0.9);
            flop.setPosition(622,335);
        });

        this.tweens.add({
            targets: flop,
            delay: 4200,
            scale: 1,
            angle: 70,
            duration: 2000,
            ease: 'Quint.inOut'
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