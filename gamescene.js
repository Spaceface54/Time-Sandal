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
        this.matter.world.setBounds();

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

        this.matter.world.on('collisionactive', (event, bodyA, bodyB) =>{
                //is touching ground
                if(this.findunjumpable(event.pairs)){
                    this.touchingground = true;
                }
            });
        this.matter.world.on('collisionend', (event, bodyA, bodyB) =>{
            //console.log(this.findplayer(event.pairs));
                if(this.findplayer(event.pairs)){
                    this.touchingground = false;
                }
            });
        this.onEnter();
        if(this.levelnum == 1){
            this.updatelist = [];
            this.unjumpable = [];
            this.state = false;
            this.level1();
        }
        if(this.levelnum == 2){
            this.updatelist = [];
            this.unjumpable = [];
            this.state = false;
            this.level2();
        }
        if(this.levelnum == 3){
            this.updatelist = [];
            this.unjumpable = [];
            this.state = false;
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

    findunjumpable(...objs){
        let found = false;
        //console.log((objs[0][0].bodyA == this.player.body || objs[0][0].bodyB == this.player.body));
        objs.map(pairs => {
            pairs.map(items => {
                if((items.bodyA == this.player.body || items.bodyB == this.player.body) && ((this.unjumpable.find(element => element.body === items.bodyA) == undefined) && this.unjumpable.find(element => element.body === items.bodyB) == undefined)){
                    found = true;
                }
            });

        });
        return found;
    }
    findplayer(...objs){
        let found = false;
        //console.log(objs[0][0] == this.player.body || objs[0][1] == this.player.body);
        objs.map(pairs => {
            pairs.map(items => {
                //console.log(items.bodyA.id +", ");
                if(items.bodyA == this.player.body || items.bodyB == this.player.body){
                    if(found){
                        return false;
                        
                    }
                    found = true;
                }
            });
        })
        return found;
    }
}