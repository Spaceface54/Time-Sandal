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
        this.load.image('gameflop', 'GameFlop.png');

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
        
        this.time.delayedCall(1100,() => {
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
       
        this.time.delayedCall(3570,() => {
            game.setVisible(true);
            flop.setVisible(true);
            gameflop.setVisible(false);
            flop.setOrigin(0.1,0.9);
            flop.setPosition(622,335);
        });

        this.tweens.add({
            targets: flop,
            delay: 3700,
            scale: 1,
            angle: 70,
            duration: 2000,
            ease: 'Quint.inOut'
        });

        this.time.delayedCall(5000,() => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1100, () => {
            this.scene.start('title');
            });
        })

        //+9pt offset on 'flop' y-coord
        this.add.text(500, 500, "Company logo")
            .setColor(0xffffff);
        //this.add.image(500,400,'gameflop');
    }
}

class title extends Phaser.Scene {
    constructor() {
        super("title");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image('sand','Sand.png');
        this.load.image('title1','Title 1.png');
        this.load.image('title2','Title 2.png');
     }

    create() { 
        this.cameras.main.fadeIn(1000,0,0,0);
        this.add.text(500, 500, "Title Screen")
        .setColor(0xffffff);
        let title1 = this.add.image(520,180,'title1')
        .setScale(0.8,0.8);
        let start = this.add.text(520,400,"Start")
        .setFontSize(40)
        .setColor(0xffffff)
        .setOrigin(0.5)
        .setInteractive()
        .setShadow(2,2,'#000',5)
        .on('pointerover', () => {
            start.setScale(1.5);
        })
        .on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('intro');
            });
        })
        .on('pointerout', () => {
            start.setScale(1);
        });
        
        let exit = this.add.text(520,450,"Exit")
        .setFontSize(40)
        .setColor(0xffffff)
        .setOrigin(0.5)
        .setInteractive()
        .setShadow(2,2,'#000',5)
        .on('pointerover', () => {
            exit.setScale(1.5);
        })
        .on('pointerout', () => {
            exit.setScale(1);
        });

        console.log(start.originX);
        let sandEmitter = this.add.particles(0,0,'sand',{
            scale: 0.3,
            lifespan: 10000,
            gravityY: 50,
            frequency: 20,
            maxVelocityX: 200,
            maxVelocityY: 200,
            blendMode: 'ADD',
            alpha: 55
        });

        //Particle spawn box (xcoordstart,ycoordstart,xlength,ylength)
        const shape1 = new Phaser.Geom.Rectangle(200,50,600,270);
        
        sandEmitter.addEmitZone({type:'random',source: shape1});
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
    //scene:[title]
};
const game = new Phaser.Game(config);