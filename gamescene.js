class gamescene extends Phaser.Scene {
    sprite = [];
    init(data) {
        this.levelnum = data.levelnum || 3;
    }
    constructor(key) {
        super(key);
        this.player;
        this.w;
        this.h;
        this.state = false;
        this.updatelist = [];
        this.playerspeed = 7;
        this.touchingground = false; //for jumping
        this.unjumpable = [] //list of things that can't be jumped on
        this.borderwalls;
        this.message;
        this.forwardsound;
        this.backsound;
        this.looping
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image('guy', 'guy.png');
        this.load.image('forwardback', 'forwardback.png');
        this.load.audio("loop", "loopingsoundt.mp3");
        this.load.image("backTile", "Background.png");
        this.load.audio("forward", "forwardwarp.mp3");
        this.load.audio("back", "backwarp.mp3");
        this.images();
    }
    images() {
        console.log("has not implimented images");
    }
    create() {
        this.backgroundTiles();
        if(this.looping == null){
            this.looping = this.sound.add("loop");
        }
        if(localStorage.getItem("soundplaying") == null){
            localStorage.setItem("soundplaying", "y");
        }
        console.log(localStorage.getItem("soundplaying") == "y");
        if(!this.looping.isPlaying && localStorage.getItem("soundplaying") == "y"){
            this.looping.play();
            this.looping.loop = true;
            this.looping.volume = 0.45;
        }
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.borderwalls = this.matter.world.setBounds().getAllBodies();
        this.player = this.matter.add.sprite(this.w * 0.8, this.h * 0.7, 'guy');
        this.player.setScale(0.3);
        this.player.setBounce(0.2);
        this.player.body.inertia = Infinity;
        this.forwardsound = this.sound.add("forward");
        this.forwardsound.volume = 0.1;
        this.backsound = this.sound.add("back");
        this.backsound.volume = 0.1;
        this.message = this.add.text(this.w*0.5, this.h*0.05, "");
        this.message.setOrigin(0.5, 0.5);
        this.message.setDepth(20);
        //this.message.setFill(0x000000);
        this.message.setTint(0x000000);
        this.message.setAlpha(1);
        this.message.setScale(2);
        console.log(this.message.x);

        this.add.text(this.w*0.95, this.h*0.9, "📺")
            .setScale(4)
            .setDepth(12)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });
        let sound;
        if(localStorage.getItem("soundplaying") == "y"){
            sound = this.add.text(this.w*0.95, this.h*0.8, "🔊");
        }
        else if(localStorage.getItem("soundplaying") == "n"){
            sound = this.add.text(this.w*0.95, this.h*0.8, "🔇");
        }
        sound
            .setScale(4)
            .setDepth(12)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (localStorage.getItem("soundplaying") == "y") {
                    sound.setText("🔇");
                    this.looping.stop();
                    localStorage.setItem("soundplaying", "n");
                } else if(localStorage.getItem("soundplaying") == "n"){
                    sound.setText("🔊");
                    this.looping.play();
                    localStorage.setItem("soundplaying", "y");
                }
            });

        let switching = false;

        let tintbox = this.add.rectangle(this.w*0.5, this.h*0.5, this.w, this.h, 0xb46a06);
        tintbox.setAlpha(0);
        tintbox.setDepth(10);

        this.input.on("pointerdown", (pointer) => {
            if (pointer.y < this.h * 0.5 && this.touchingground) { //&& this.player.body.touching.down){
                this.player.setVelocityY(-10, 0);
            }
            else if (pointer.y > this.h * 0.5 && !switching) {
                switching = true;
                this.state = !this.state;
                let tempimg = this.add.image(this.w * 0.5, this.h * 0.3, "forwardback");
                if (!this.state) {
                    tempimg.angle = 180;
                }
                this.tweens.add({
                    targets: tempimg,
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
                
                if(this.state){
                    this.playsound(this.forwardsound, "*Whoosh*", 200);
                    console.log(tintbox.alpha);
                    this.add.tween({
                        targets: tintbox,
                        alpha: {from: 0, to: 0.5},
                        duration: 200,
                        repeat: 0
                    });
                }
                else{
                    this.playsound(this.forwardsound, "*Hsoohw*", 200);
                    this.add.tween({
                        targets: tintbox,
                        alpha: 0,
                        duration: 200,
                        repeat: false
                    });
                }
            }
        });

        this.matter.world.on('collisionactive', (event, bodyA, bodyB) => {
            //is touching ground
            if (this.findunjumpable(event.pairs)) {
                this.touchingground = true;
            }
        });
        this.matter.world.on('collisionend', (event, bodyA, bodyB) => {
            //console.log(this.findplayer(event.pairs));
            if (this.findplayer(event.pairs)) {
                this.touchingground = false;
            }
        });
        this.onEnter();
        if (this.levelnum == 1) {
            this.updatelist = [];
            this.unjumpable = [];
            this.state = false;
            this.level1();
        }
        if (this.levelnum == 2) {
            this.updatelist = [];
            this.unjumpable = [];
            this.state = false;
            this.level2();
        }
        if (this.levelnum == 3) {
            this.updatelist = [];
            this.unjumpable = [];
            this.state = false;
            this.level3();
        }
    }

    update() {
        this.player.setAngularVelocity(0);
        let { x, y, isDown } = this.input.activePointer;
        if (x < this.w * 0.4 && isDown) {
            this.player.setVelocityX(-this.playerspeed, 0);

        }
        else if (x > this.w * 0.6 && isDown) {
            this.player.setVelocityX(this.playerspeed, 0);

        }
        else {
            this.player.setVelocityX(0);
        }
        this.updates();
    }

    updates() {

    }


    onEnter() {
        console.log("has not implimented on enter");
    }
    level1() {
        console.log("has not implimented level1");
    }
    level2() {
        console.log("has not implimented level2");
    }
    level3() {
        console.log("has not implimented level3");
    }

    makeUnjumpapable(...objs) {
        objs.map(items => {
            this.unjumpable.push(items);
        })
    };

    addUpdates(...objs) {
        objs.map(items => {
            this.updatelist.push(items);
        })
    }

    findunjumpable(...objs) {
        let found = false;
        //console.log((objs[0][0].bodyA == this.player.body || objs[0][0].bodyB == this.player.body));
        objs.map(pairs => {
            pairs.map(items => {
                if ((items.bodyA == this.player.body || items.bodyB == this.player.body) && ((this.unjumpable.find(element => element.body === items.bodyA) == undefined) && this.unjumpable.find(element => element.body === items.bodyB) == undefined) && ((this.borderwalls.find(element => element === items.bodyA) == undefined) && this.borderwalls.find(element => element === items.bodyB) == undefined)) {
                    found = true;
                }
            });

        });
        return found;
    }
    findplayer(...objs) {
        let found = false;
        //console.log(objs[0][0] == this.player.body || objs[0][1] == this.player.body);
        objs.map(pairs => {
            pairs.map(items => {
                //console.log(items.bodyB.id + ", ");
                if (items.bodyA == this.player.body || items.bodyB == this.player.body) {
                    if (found) {
                        return false;

                    }
                    found = true;
                }
            });
        })
        return found;
    }
    playsound(audio, text, duration){
        this.message.setText(text);
        audio.play();
        this.time.addEvent({
            delay: duration,
            loop: false,
            callback: () =>{
                audio.stop();
            }
        });
        this.tweens.add({
            targets: this.message,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            duration: duration
        });

    }

    backgroundTiles(){
        const backGround = [
            [0,0,0,0,0,0,0,0,0,0]
        ];

        const map = this.make.tilemap({key: 'level3', tileWidth: 379, tileHeight: 304 });
        const tiles = map.addTilesetImage('backTile');
        const layer = map.createLayer(0, tiles, 0, 0);
    }
}