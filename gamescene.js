class gamescene extends Phaser.Scene {
    init(data){
        this.levelnum = data.levelnum || 1;
    }
    constructor(key){
        super(key);
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
        this.load.image('forwardback', 'forwardback.png');
        this.images();
    }
    images(){
        console.log("has not implimented images");
    }
    create(){
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.player = this.matter.add.image(this.w*0.8, this.h*0.7, 'guy');
        this.player.setScale(0.3);
        this.player.setBounce(0.2);
        this.player.body.inertia = Infinity;

        let switching = false;
        this.input.on("pointerdown", (pointer) =>{
            if(pointer.y < this.h*0.5 && this.touchingground){ //&& this.player.body.touching.down){
                this.player.setVelocityY(-10,0);
            }
            else if(pointer.y > this.h*0.5 && !switching){
                switching = true;
                this.state = !this.state;
                let tempimg = this.add.image(this.w*0.5, this.h*0.3, "forwardback");
                if(!this.state){
                    tempimg.angle = 180;
                }
                this.tweens.add({
                    targets:tempimg,
                    alpha: 0,
                    duration: 200,
                    onComplete: () => {
                        tempimg.destroy();
                        switching = false;
                    }
                })
                this.updatelist.forEach(element => {
                    element.futureswap(this.state);
                });
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
        this.onEnter();

        if(this.levelnum == 1){
            this.level1();
        }
        if(this.levelnum == 2){
            this.level2();
        }
        if(this.levelnum == 3){
            this.level3();
        }
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

        this.updates();
    }

    updates(){

    }


    onEnter(){
        console.log("has not implimented on enter");
    }
    level1(){
        console.log("has not implimented level1");
    }
    level2(){
        console.log("has not implimented level2");
    }  
    level3(){
        console.log("has not implimented level3");
    }

    makeUnjumpapable(...objs){
        objs.map(items => {
            this.unjumpable.push(items);
        })
    };
    
    addUpdates(...objs){
        objs.map(items => {
            this.updatelist.push(items);
        })
    }
}