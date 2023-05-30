class playscene extends Phaser.Scene {
    cursors;
    constructor(){
        super("playscene");
        this.player;
        this.w;
        this.h;
        this.state = false;
    }
    preload(){
        this.load.path ="./assets/";
        this.load.image('guy', 'guy.png');
        this.load.image('firebarrel', 'burningbarrel.png');
        this.load.image('ash', 'ash.png');
        this.load.image('wood', 'wood.png');
        this.load.image('firewood', 'flamingwood.png');
        this.load.image('floor', 'floor.png');
        this.load.image('forwardback', 'forwardback.png');
    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;

        this.player = this.physics.add.sprite(this.w*0.5, this.h*0.5, 'guy');
        this.player.setScale(0.3);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        let wall = new wood(this, this.w*0.5,  this.h*0.5, "wood", "firewood", 1, "ashpile", this.player);
        this.input.on("pointerdown", (pointer) =>{
            if(pointer.y < this.h*0.5){ //&& this.player.body.touching.down){
                this.player.setVelocityY(-360);
                wall.burn();
            }
            else{
                this.state = !this.state;
                wall.futureswap(this.state);
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

        //impliment friction
    }
}
class wood {
    constructor(scene, x, y, img, onfireimg, scale = 1, changedimg = "ash", player){
        this.displayed;
        this.scale = scale;
        this.img = img;
        this.onfireimg = onfireimg;
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.onfire = false;
        this.future = false;
        this.fire = null;
        this.changedimg = changedimg;
        this.player = player;
        this.displaywall();
        this.woods = [];
    }
    burn(){
        this.onfire = true;
        if(this.fire == null != this.future){
            this.fire = this.scene.add.image(this.x, this.y, this.onfireimg);
        }
        this.fire.setDepth(2);
    }
    futureswap(state){
        if(this.onfire && state){
            this.displayed.destroy();
            this.displayed = this.scene.physics.add.sprite(this.x, this.y, this.changedimg);
            this.displayed.setCollideWorldBounds(true);
            this.fire.destroy();
            this.fire = null;
            this.scene.physics.add.collider(this.displayed, this.player);
        }
        else if(this.onfire && !state){
            this.x = this.displayed.x;
            this.y = this.displayed.y;
            this.displayed.destroy();
            this.displaywall();
            this.burn();
        }
    }
    displaywall(){
        this.displayed = this.scene.physics.add.sprite(this.x, this.y, this.img);
        this.displayed.setImmovable(true);
        this.displayed.body.allowGravity = false;
        this.displayed.setScale(this.scale);
        this.init();
    }
    init(){
        this.scene.physics.add.collider(this.displayed, this.player);
        if(this.woods != null){
            for(let i = 0; i < this.woods.length; i++){
                this.scene.physics.add.collider(this.displayed, this.woods[i], (displayed, wood) => {
                    if(wood.onfire){
                        this.onfire = true;
                        this.burn();
                    }
                });
            }
        }
    }
    friction(){
        return;
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