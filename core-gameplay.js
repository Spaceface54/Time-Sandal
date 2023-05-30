class playscene extends Phaser.Scene {
    cursors;
    constructor(){
        super("playscene");
        this.player;
        this.w;
        this.h;
    }
    preload(){
        this.load.path ="./assets/";
        this.load.image('guy', 'guy.png');
    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;

        this.player = this.physics.add.sprite(this.w*0.5, this.h*0.5, 'guy');
        this.player.setScale(0.3);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on("pointerdown", (pointer) =>{
            if(pointer.y < this.h*0.5){ //&& this.player.body.touching.down){
                this.player.setVelocityY(-360);
            }
        })


    }
    update(){
        let {x,y,isDown} = this.input.activePointer;
        if (x<this.w*0.4)
        {
            this.player.setVelocityX(-180);

        }
        else if (x>this.w*0.6)
        {
            this.player.setVelocityX(180);

        }
        else
        {
            this.player.setVelocityX(0);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1040,
    height: 612,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug:true
        }
    },
    backgroundColor: 0xbbbbbb,
    scene: [playscene]
};
const game = new Phaser.Game(config);