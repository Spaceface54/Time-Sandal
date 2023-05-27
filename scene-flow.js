class Studio extends Phaser.Scene{
    constructor(){
        super('studio');
    }
    create(){
        this.add.text(400, 400, "GameFLOP Studio").setFontSize(45);
        this.cameras.main.setBackgroundColor("0xFF0000");
        this.add.text(400, 600, "Click to continue").setFontSize(35);

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('title');
            });
        });
    }
}

class Title extends Phaser.Scene{
    constructor(){
        super('title');
    }
    create(){
        this.cameras.main.fadeIn(50, 0, 0, 0);
        this.add.text(this.game.config.width/4, 200, "TIME SANDAL:\nThe Sandal of Time").setFontSize(65);
        this.add.text(this.game.config.width/4, 500, "CLICK TO PLAY").setFontSize(45);

        this.input.on('pointerdown', () =>{
            this.scene.start('l1')
        })
    }
}

class Level1 extends Phaser.Scene{
    constructor(){
        super('l1');
    }

    create(){
        this.add.text(300, 150, "LEVEL 1").setFontSize(55);
        // this.add.text(300, 300, "press something to complete the level");

    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
    },
    scene: [Studio, Title, Level1],
    title: "Scene Flow Prototype"
});