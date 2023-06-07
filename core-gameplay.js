class playscene extends gamescene {
    cursors;
    constructor(){
        super("playscene");
        
    }
    images(){
        this.load.image('firebarrel', 'burningbarrel.png');
        this.load.image('ash', 'ashpile.png');
        this.load.image('wood', 'wood.png');
        this.load.image('firewood', 'flamingwood.png');
        this.load.image('floor', 'floor.png');
        this.load.image('flag', 'flag.png');
        this.load.image('sand', 'sandpile.png');
        this.load.image('wind', 'wind.png');
    }
    onEnter(){
        
        
    }

    level1(){
        let wall = new wood(this, this.w*0.5,  this.h*0.6, false, "wood", "ash");
        wall.unburnt.setScale(2);
        this.makeUnjumpapable(wall.unburnt);
        let burningbarrel = new wood(this, this.w*0.65,  this.h*0.7, true, "firebarrel", "ash");
        burningbarrel.burn();

        this.addUpdates(wall, burningbarrel);

        new flag(this, this.w*0.2, this.h*0.682, "flag", this.player, "winscene", this.levelnum);
        

        let ground = this.matter.add.image(this.w*0.5, this.h, 'floor');
        ground.setScale(10);
        ground.setStatic(true);
        ground.angle = 90;
        
        this.matter.world.on('collisionstart', (event, bodyA, bodyB) =>{
            //console.log(bodyB.velocity.y);
                if(bodyB === burningbarrel.unburnt.body && bodyA === wall.unburnt.body){
                    wall.burn();
                    if(wall.fire == null){
                        wall.fire = this.add.image(wall.unburnt.x, wall.unburnt.y, "firewood");
                        wall.fire.setDepth(2);
                        wall.fire.setScale(2);
                    }
                }
            });
    }

    level2(){
        this.matter.world.setBounds();
        let ground1 = this.matter.add.image(this.w*0.5, this.h, 'floor');
        ground1.setScale(10);
        ground1.setStatic(true);
        ground1.angle = 90;

        let ground2 = this.matter.add.image(this.w*0.2, this.h*0.3, 'floor');
        ground2.setScale(3);
        ground2.setStatic(true);
        ground2.angle = 90;
        ground2.setScale(3);

        let ground3 = this.matter.add.image(this.w*0.8, this.h*0.3, 'floor');
        ground3.setScale(3);
        ground3.setStatic(true);
        ground3.angle = 90;

        new nonobox(this, ground3.x-410, ground3.y, 0.8, 0.53, ground3);
        new nonobox(this, ground2.x+410, ground3.y, 0.8, 0.53, ground2);

        let hourglass = new swappingsand(this, this.w*0.5, this.h*0.5, "sand");
        //console.log(hourglass.bottomsand.body.id);
        //console.log(hourglass.topsand);

        new flag(this, this.w*0.2, this.h*0.682, "flag", this.player, "winscene", this.levelnum);

        this.addUpdates(hourglass);
        
    }
    level3(){
        this.matter.world.setBounds();
        let TopGround = this.matter.add.image(this.w*0.1, this.h*0.25, 'floor');
        TopGround.setScale(2).setStatic(true);
        TopGround.angle = 90;
        this.player.x = this.w*0.1;
        this.player.y = this.h*0.1;

        let LGround = this.matter.add.image(0, this.h, 'floor');
        LGround.setScale(30, 3).setStatic(true);
        //LGround.angle = 90;

        let RGround = this.matter.add.image(this.w - 600, this.h, 'floor');
        RGround.setScale(16.5, 2).setStatic(true);
        RGround.angle = 90;
        
        let Button = this.matter.add.image(this.w*0.467, this.h*0.8, 'floor');
        Button.setTintFill(0xff0000).setStatic(true).setScale(2, 1.063); //(y, x)
        Button.angle = 90;

        let f = this.add.ellipse(this.w*0.915, this.h*0.9, 300, 175, 0xffffff).setInteractive();
        let fan = this.matter.add.gameObject(f).setStatic(true);
        
        //ONLY STARTS IF ROBOTS OR BOXES ARE ON THE BUTTON AND WE ARE IN THE PAST
        let wind = this.add.particles(0, 0, 'wind', {
            scale: { start: 0.3, end: 0 },
            x: { min: this.w*0.85, max: this.w*0.97 },
            y: { start: this.h*0.8, end: 400, ease: 'cubic.inout' },
            //gravityY: -100,
            lifespan: 1000
        });

        wind.stop();
        f.on('pointerover', ()=>{
            wind.start(); 
        });

        f.on('pointerout', ()=>{
            wind.stop();
        });


        let FGround = this.matter.add.image(this.w, this.h*0.2, 'floor');
        FGround.setScale(1.2);
        FGround.angle = 90;
        FGround.setStatic(true);
        
        //should only move and be electrified if in the past
       let move = this.add.tween({
            targets: FGround,
            x: {from: this.w*0.9, to: this.w*0.8},
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'cubic.inout',
        });

        move.on('start', () => FGround.setTintFill(0xffff00));

        //NEED TO FIGURE OUT A WAY FOR THE FAN TO WORK TO RAISE THE PLAYER. 

        //CONTEMPLATING REPLACING THE ROBOTS WITH TWO ELECTRICAL BOXES THAT NEED TO BE MOVED ONTO THE BUTTON (WILL STILL HARM YOU IN THE PAST
        //BECAUSE THEY ARE ELECTRIFIED IN THE PAST). WILL ASK GROUP MEMBERS ABOUT THIS.

        //IN GENERAL, FIGURE OUT THE PAST & FUTURE BUSINESS, SO THAT THE OBJECTS ARE ACTIVE OR INACTIVE WHEN THEY ARE SUPPOSED TO BE

    
    }  
    updates(){
    }
}

class flag{
    constructor(scene, x, y, img, player, key, levelnum){
        this.flagimg = scene.matter.add.image(x, y, img);
        let transitionDuration = 1000;
        this.flagimg.setStatic(true);
        this.flagimg.setScale(0.5);
        
        scene.matter.world.on('collisionstart', (event, bodyA, bodyB) =>{
            if(bodyA === player.body && bodyB === this.flagimg.body){
                scene.cameras.main.fade(transitionDuration, 0, 0, 0);
                scene.time.delayedCall(transitionDuration, () => {
                    scene.scene.start(key, {levelnum: levelnum});
                });
            }
        });

    }
}
class nonobox {
    constructor(scene, x, y, width, height, box){
        this.nono = scene.matter.add.image(x, y, box.texture);
        this.nono.setScale(width, height);
        scene.makeUnjumpapable(this.nono);
        this.nono.setStatic(true);
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
            //console.log(this.unburnt.y);
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

class swappingsand {
    constructor(scene, x, y, sand){
        this.offset = 190;
        this.y = y;
        this.topsand = scene.matter.add.image(x, y -this.offset, sand);
        this.bottomsand = scene.matter.add.image(x, y +this.offset, sand);
        this.topsand.setScale(0.63);
        this.bottomsand.setScale(0.63);
        this.topsand.setTrapezoid(this.topsand.width*0.63,-this.topsand.height*0.63,1);
        this.bottomsand.setTrapezoid(this.topsand.width*0.63, -this.topsand.height*0.63,1);
        this.bottomsand.angle = 180;
        this.topsand.setStatic(true);
        this.bottomsand.setStatic(true);
        

        this.bottomsand.y = 3000;
        
    }
    futureswap(state){
        if(state){
            this.topsand.y = 3000;
            this.bottomsand.y = this.y +this.offset;
        }
        else{
            this.bottomsand.y = 3000;
            this.topsand.y = this.y -this.offset;
        }
    }

}
class winscene extends Phaser.Scene{
    init(data){
        this.levelnum = data.levelnum || 1;
    }

    constructor(){
        super("winscene");
    }
    create(){
        let w = this.game.config.width;
        let h = this.game.config.height;
        let wintext = this.add.text(w*0.5, h*0.5, "YOU WON!");
        wintext.setOrigin(0.5, 0.5);
        wintext.setScale(4);

        let transitionDuration = 1000;
        this.input.on("pointerdown", () =>{
            this.cameras.main.fade(transitionDuration, 0, 0, 0);
            this.time.delayedCall(transitionDuration, () => {
                this.scene.start("playscene", {levelnum: this.levelnum+1});
            });
        });
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
    scene: [playscene, winscene]
};
const game = new Phaser.Game(config);