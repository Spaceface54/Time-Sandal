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
        this.load.image("backTile", "Background.png");

    }
    create() {
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        let game = this.add.image(-260, 250, 'game');
        let flop = this.add.image(1240, 260, 'flop');
        let gameflop = this.add.image(504, 258, 'gameflop')
            .setVisible(false);

        this.tweens.add({
            targets: game,
            x: 310,
            scale: 1,
            duration: 1000,
            ease: 'circ.in'
        });

        const chain = this.tweens.chain({
            tweens: [
                {
                    targets: flop,
                    x: 770,
                    scale: 1,
                    duration: 1000,
                    ease: 'circ.in'
                }
            ]
        })

        this.time.delayedCall(1100, () => {
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

        this.time.delayedCall(3570, () => {
            game.setVisible(true);
            flop.setVisible(true);
            gameflop.setVisible(false);
            flop.setOrigin(0.1, 0.9);
            flop.setPosition(622, 335);
        });

        this.tweens.add({
            targets: flop,
            delay: 3700,
            scale: 1,
            angle: 70,
            duration: 2000,
            ease: 'Quint.inOut'
        });

        this.time.delayedCall(5000, () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1100, () => {
                this.scene.start('title');
            });
        })

        //+9pt offset on 'flop' y-coord
        //this.add.image(500,400,'gameflop');
    }
}

class title extends Phaser.Scene {
    constructor() {
        super("title");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image('sand', 'Sand.png');
        this.load.image('title1', 'Title 1.png');
        this.load.image('title2', 'Title 2.png');
        this.load.image('title3', 'Title 3.png');
        this.load.image('title4', 'Title 4.png');
        this.load.audio('title_song', 'Potential_title_song.mp3');
        this.load.image('sandal', 'time sandal.png');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        let t = this.sound.add('title_song', {loop: true, volume: 0.05});
        t.play(); 
        let title1 = this.add.image(520, 180, 'title1')
            .setScale(0.8, 0.8)
            .setDepth(10);
        let title2 = this.add.image(520, 180, 'title2')
            .setScale(0.8, 0.8)
            .setDepth(10)
            .setVisible(false);
        let title3 = this.add.image(520, 180, 'title3')
            .setScale(0.8, 0.8)
            .setDepth(10)
            .setVisible(false);
        let title4 = this.add.image(520, 180, 'title4')
            .setScale(0.8, 0.8)
            .setDepth(10)
            .setVisible(false);
        let sandal = this.add.image(520, 500, 'sandal')
            .setDepth(10)
            .setScale(0.3);


        this.tweens.add({
            targets: sandal,
            angle: 3600,
            duration: 2000,
            ease: 'Quint.inOut'
        });

        let start = this.add.text(520, 350, "Start")
            .setFontSize(40)
            .setColor(0xffffff)
            .setOrigin(0.5)
            .setInteractive()
            .setShadow(2, 2, '#000', 5)
            .on('pointerover', () => {
                start.setScale(1.5);
            })
            .on('pointerdown', () => {
                t.stop();
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => {
                    this.scene.start('intro');
                });
            })
            .on('pointerout', () => {
                start.setScale(1);
            });

        this.time.delayedCall(2000, () => {
            title1.setVisible(false);
            title2.setVisible(true);
        });

        this.time.delayedCall(3000, () => {
            title2.setVisible(false);
            title3.setVisible(true);
        });

        this.time.delayedCall(4000, () => {
            title3.setVisible(false);
            title4.setVisible(true);
        });

        let leftEmitter = this.add.particles(0, 0, 'sandal', {
            scale: 0.1,
             lifespan: 6000,
            gravityX: 150,
            frequency: 110,
            rotate: () => {return Phaser.Math.Between(-180,180)},
            maxVelocityX: 400,
            maxVelocityY: 200,
            blendMode: 'SUBTRACT',
            alpha: 0.5
        });

        let rightEmitter = this.add.particles(0, 0, 'sandal', {
            scale: 0.1,
            lifespan: 6000,
            gravityX: -150,
            frequency: 110,
            rotate: () => {return Phaser.Math.Between(-180,180)},
            maxVelocityX: 400,
            maxVelocityY: 200,
            blendMode: 'SUBTRACT',
            alpha: 0.5
        });

        //Particle spawn box (xcoordstart,ycoordstart,xlength,ylength)
        const shape1 = new Phaser.Geom.Rectangle(200, 50, 600, 270);
        const shapeLeft = new Phaser.Geom.Rectangle(-30, 20, 0, 300);
        const shapeRight = new Phaser.Geom.Rectangle(1070, 20, 0, 300);

        //sandEmitter.addEmitZone({type:'random',source: shape1});
        leftEmitter.addEmitZone({ type: 'random', source: shapeLeft });
        rightEmitter.addEmitZone({ type: 'random', source: shapeRight });

        const backGround = [
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
            ];
    
            const map = this.make.tilemap({data: backGround, tileWidth: 378, tileHeight: 303 });
            const tiles = map.addTilesetImage('backTile');
            const layer = map.createLayer(0, tiles,0 ,0);
            layer.setDepth(-1);
        
    }

}

const config = {
    type: Phaser.AUTO,
    width: 1040,
    height: 612,
    backgroundColor: 0xbbbbbb,
    scene: [logo, title]
    //scene: [title]
};
const game = new Phaser.Game(config);