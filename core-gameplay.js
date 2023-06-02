class playscene extends Phaser.Scene {
    cursors;
    constructor(){
        super("playscene");
        this.player;
        this.w;
        this.h;
        this.state = false;
        this.updatelist = [];
        this.playerspeed = 7;
        this.touchingground = false; //for jumping
        this.unjumpable = [] //list of things that can't be jumped on
        
    }
    preload(){
        this.load.path ="./assets/";
        this.load.image('guy', 'guy.png');
        this.load.image('firebarrel', 'burningbarrel.png');
        this.load.image('ash', 'ashpile.png');
        this.load.image('wood', 'wood.png');
        this.load.image('firewood', 'flamingwood.png');
        this.load.image('floor', 'floor.png');
        this.load.image('forwardback', 'forwardback.png');
    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;

        this.player = this.matter.add.image(this.w*0.8, this.h*0.7, 'guy');
        this.player.setScale(0.3);
        this.player.setBounce(0.2);
        this.player.body.inertia = Infinity;
        console.log(this.player.body.inertia);

        let wall = new wood(this, this.w*0.5,  this.h*0.6, false, "wood", "ash");
        wall.unburnt.setScale(2);
        this.unjumpable.push(wall.unburnt);
        let burningbarrel = new wood(this, this.w*0.65,  this.h*0.7, true, "firebarrel", "ash");
        burningbarrel.burn();

        this.updatelist.push(wall);
        this.updatelist.push(burningbarrel);

        let ground = this.matter.add.image(this.w*0.5, this.h, 'floor');
        ground.setScale(10);
        ground.setStatic(true);
        ground.angle = 90;




        this.input.on("pointerdown", (pointer) =>{
            if(pointer.y < this.h*0.5 && this.touchingground){ //&& this.player.body.touching.down){
                this.player.setVelocityY(-10,0);
            }
            else if(pointer.y > this.h*0.5){
                this.state = !this.state;
                this.updatelist.forEach(element => {
                    element.futureswap(this.state);
                });
            }
        })

        this.matter.world.on('collisionstart', (event, bodyA, bodyB) =>{
            console.log(bodyB.velocity.y);
                if(bodyB === burningbarrel.unburnt.body && bodyA === wall.unburnt.body){
                    wall.burn();
                    if(wall.fire == null){
                        wall.fire = this.add.image(wall.unburnt.x, wall.unburnt.y, "firewood");
                        wall.fire.setDepth(2);
                        wall.fire.setScale(2);
                    }
                }
            });
        this.matter.world.on('collisionstart', (event, bodyA, bodyB) =>{
                //is touching ground
                console.log("touching");
                if(bodyA === this.player.body && this.unjumpable.find(element => element.body === bodyB) == undefined){
                    this.touchingground = true;
                }
            });
        this.matter.world.on('collisionend', (event, bodyA, bodyB) =>{
                if(bodyA === this.player.body || bodyB === this.player.body){
                    this.touchingground = false;
                }
            });
        
    }
    update(){
        this.player.setAngularVelocity(0);
        let {x,y,isDown} = this.input.activePointer;
        if (x<this.w*0.4)
        {
            this.player.setVelocityX(-this.playerspeed, 0);

        }
        else if (x>this.w*0.6)
        {
            this.player.setVelocityX(this.playerspeed, 0 );

        }
        else
        {
            this.player.setVelocityX(0);
        }
        //impliment friction
    }
}

class wood {
    constructor(scene, x, y, floppy, texture, ashtexture){
        this.unburnt = scene.matter.add.image(x, y, texture);
        this.floppy = !floppy;
        this.unburnt.setStatic(this.floppy);
        this.onfire = false;
        this.scene = scene;
        this.ashtexture = ashtexture;
        this.ash = scene.matter.add.image(x, y, 'ash');
        this.ash.setFriction(0.05);
        this.ash.setFrictionAir(0.0005);
        this.ash.setBounce(0.9);
        this.ash.y = 3000;
        this.fire = null;
    }
    burn(){
        this.onfire = true;
    }

    futureswap(state){
        if(state && this.onfire){ 
            this.ash.setVelocity(0, 0);
            this.ash.x = this.unburnt.x;
            this.ash.y = this.unburnt.y;
            this.unburnt.y = 3000;
            if(this.fire!=null){
                this.fire.y = 3000;
            }
            console.log(this.unburnt.y);
        }
        if(!state && this.onfire){  
            this.unburnt.setStatic(this.floppy);
            this.unburnt.setOrigin(0.5, 1);
            this.unburnt.x = this.ash.x;
            this.unburnt.y = this.ash.y;
            this.unburnt.setOrigin(0.5, 0.5);
            if(this.fire!=null){
                this.fire.y = this.unburnt.y;
                this.fire.x = this.unburnt.x;
            }
            this.ash.y = 3000;
        }
    }
}
/*
class wood {
    constructor(scene, x, y, img, onfireimg = null, scale = 1, changedimg = "ash", player){
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
        this.notstatic = false;
        this.debug = 0;
        ashpile = ;
    }
    burn(){
        this.onfire = true;
        if(this.fire == null != this.future && this.onfireimg != null){
            this.fire = this.scene.add.image(this.x, this.y, this.onfireimg);
            this.fire.setDepth(2);
        }
    }
    futureswap(state){
        if(this.onfire && state){
            this.displayed.destroy();
            this.displayed = this.scene.physics.add.sprite(this.x, this.y, this.changedimg);
            this.displayed.setCollideWorldBounds(true);
            if(this.onfireimg != null){
                this.fire.destroy();
                this.fire = null;
            }
            this.scene.physics.add.collider(this.displayed, this.player);
        }
        else if(this.onfire && !state){
            this.x = this.displayed.x;
            this.y = this.displayed.y;
            this.displayed.destroy();
            this.displaywall();
            this.burn();
            if(this.notstatic){
                this.moving();
            }
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
                let thatonfire = this.woods[i].displayed.onfire
                this.scene.physics.add.collider(this.displayed, this.woods[i].displayed, (displayed, wood) => {
                    if( thatonfire && !this.onfire){
                        console.log("fire!");
                        this.onfire = true;
                        this.burn();
                    }
                    if(this.debug == 0){
                        console.log(wood);
                        this.debug++;
                    }
                });
            }
        }
    }
    moving(){
        this.notstatic = true;
        this.displayed.setImmovable(false);
        this.displayed.body.allowGravity = true;
        this.displayed.setCollideWorldBounds(true);
    }
    updateloc(){
        this.x = this.displayed.x;
        this.y = this.displayed.y;
        if(this.notstatic && this.fire!= null && this.onfire){
            this.fire.x = this.x;
            this.fire.x = this.x;
        }
    }
    friction(){
        return;
    }
    
}*/

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'matter',
        matter: {
            debug:true,
        }
    },
    backgroundColor: 0xbbbbbb,
    scene: [playscene]
};
const game = new Phaser.Game(config);