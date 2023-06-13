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
        let game = this.add.image(-260, this.h / 2 - 10, 'game');
        let flop = this.add.image(this.w + 260, this.h / 2, 'flop');
        let gameflop = this.add.image((this.w / 2) + 1, (this.h / 2) - 1, 'gameflop')
            .setVisible(false);

        this.tweens.add({
            targets: game,
            x: this.w / 2 - 190,
            scale: 1,
            duration: 1000,
            ease: 'circ.in'
        });

        const chain = this.tweens.chain({
            tweens: [
                {
                    targets: flop,
                    x: this.w / 2 + (1040 - 770),
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
            flop.setPosition(this.w / 2 + 120, this.h / 2 + 75);
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
        this.w;
        this.h;
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
        this.load.image('sandy', 'sandy2.png');
    }

    create() {
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        let t = this.sound.add('title_song', { loop: true, volume: 0.05 });
        t.play();
        let title1 = this.add.image(this.w / 2, 280, 'title1')
            .setScale(1.3)
            .setDepth(10);
        let title2 = this.add.image(this.w / 2, 280, 'title2')
            .setScale(1.3)
            .setDepth(10)
            .setVisible(false);
        let title3 = this.add.image(this.w / 2, 280, 'title3')
            .setScale(1.3)
            .setDepth(10)
            .setVisible(false);
        let title4 = this.add.image(this.w / 2, 280, 'title4')
            .setScale(1.3)
            .setDepth(10)
            .setVisible(false);
        let sandal = this.add.image(this.w - 500, 900, 'sandal')
            .setDepth(10)
            .setAngle(20)
            .setScale(0.9);
        let sandy = this.add.image((this.w / 2) - 100, 1050, 'sandy')
            .setDepth(11);


        // this.tweens.add({
        //     targets: sandal,
        //     angle: 3600,
        //     duration: 2000,
        //     ease: 'Quint.inOut'
        // });

        let start = this.add.text(this.w / 2, 650, "Start")
            .setFontSize(40)
            .setColor(0xffffff)
            .setOrigin(0.5)
            .setInteractive()
            .setScale(1.6)
            .setShadow(2, 2, '#000', 5)
            .on('pointerover', () => {
                start.setScale(2);
            })
            .on('pointerdown', () => {
                t.stop();
                this.cameras.main.fadeOut(1250, 255, 250, 205);
                this.time.delayedCall(1250, () => {
                    this.scene.start('playscene');
                });
            })
            .on('pointerout', () => {
                start.setScale(1.6);
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
            lifespan: 7000,
            gravityX: 150,
            frequency: 110,
            rotate: () => { return Phaser.Math.Between(-180, 180) },
            maxVelocityX: 400,
            maxVelocityY: 200,
            blendMode: 'SUBTRACT',
            alpha: 0.5
        });

        let rightEmitter = this.add.particles(0, 0, 'sandal', {
            scale: 0.1,
            lifespan: 7000,
            gravityX: -150,
            frequency: 110,
            rotate: () => { return Phaser.Math.Between(-180, 180) },
            maxVelocityX: 400,
            maxVelocityY: 200,
            blendMode: 'SUBTRACT',
            alpha: 0.5
        });

        //Particle spawn box (xcoordstart,ycoordstart,xlength,ylength)
        const shape1 = new Phaser.Geom.Rectangle(200, 50, 600, 270);
        const shapeLeft = new Phaser.Geom.Rectangle(-30, 20, 0, 450);
        const shapeRight = new Phaser.Geom.Rectangle(this.w + 30, 20, 0, 450);

        //sandEmitter.addEmitZone({type:'random',source: shape1});
        leftEmitter.addEmitZone({ type: 'random', source: shapeLeft });
        rightEmitter.addEmitZone({ type: 'random', source: shapeRight });

        const backGround = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        const map = this.make.tilemap({ data: backGround, tileWidth: 378, tileHeight: 303 });
        const tiles = map.addTilesetImage('backTile');
        const layer = map.createLayer(0, tiles, 0, 0);
        layer.setDepth(-1);

    }

}




class playscene extends gamescene {
    cursors;
    sprites = [];
    constructor() {
        super("playscene");

    }
    images() {
        this.load.image('firebarrel', 'Barrel.png');
        this.load.image('ash', 'ashpile.png');
        this.load.image('wood', 'Log.png');
        this.load.image('firewood', 'flamingwood.png');
        this.load.image('floor', 'floor.png');
        this.load.image('flag', 'Door.png');
        this.load.image('sand', 'sandpile.png');
        this.load.image('wind', 'wind.png');
        this.load.image('flooredit', 'Floor Box.png');
        this.load.image('box_on', 'BoxOn.png');
        this.load.image('box_off', 'BoxOff.png');
        this.load.image("floor2", "GroundPlatform.png");
        this.load.image('fan', 'Fan1.png');
        this.load.image("glasspast", "GlassPast.png");
        this.load.image("glassfuture", "GlassFuture.png");
        this.load.image("backTile", "Background.png");
        this.load.image("button", "Button.png");
        this.load.image("dude", "guy.png");
    }
    onEnter() {


    }

    level1() {
        let wall = new wood(this, this.w * 0.5, this.h * 0.6, false, "wood", "ash");
        //wall.unburnt.setScale();
        this.makeUnjumpapable(wall.unburnt);
        let burningbarrel = new wood(this, this.w * 0.65, this.h * 0.7, true, "firebarrel", "ash");
        burningbarrel.burn();
        burningbarrel.unburnt.setScale(0.5);
        //console.log(this.unjumpable[2].id);

        new flag(this, this.w * 0.2, this.h * 0.70, "flag", this.player, "winscene", this.levelnum, this.completed);

        this.floorplacer(this.w * 0.5, this.h * 0.91, this.w, "flooredit");

        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            //console.log(bodyB.velocity.y);
            if (bodyB === burningbarrel.unburnt.body && bodyA === wall.unburnt.body) {
                wall.burn();
                if (wall.fire == null) {
                    wall.fire = this.add.image(wall.unburnt.x, wall.unburnt.y, "firewood");
                    wall.fire.setDepth(2);
                    wall.fire.setScale(2);
                }
            }
        });
        this.addUpdates(wall, burningbarrel);
        if (!this.completed) {
            this.add.text(this.w * 0.05, this.h * 0.4, 'Tap and hold here to move left').setFontSize(34)
                .setTintFill(0xffffff)
              //  .preFX.addGlow();
            this.add.text(this.w * 0.65, this.h * 0.4, 'Tap and hold here to move right').setFontSize(34)
                .setTintFill(0xffffff)
                //.preFX.addGlow();
            this.add.text(this.w * 0.4, this.h * 0.2, 'Tap here to jump straight up').setFontSize(34)
                .setTintFill(0xffffff)
                //.preFX.addGlow();
            this.add.text(this.w * 0.4, this.h * 0.8, 'Tap here to switch state of time').setFontSize(34).setDepth(10)
                .setTintFill(0xffffff)
                //.preFX.addGlow();
        }
    }

    level2() {
        this.player.y = this.h * 0.16;
        let floors = this.floorplacer(this.w * 0.5, this.h * 0.91, this.w, "flooredit");
        floors[0].y += 150;

        let floors2 = this.floorplacer(this.w * 0.12, this.h * 0.3, 576, "floor2");
        this.floorplacer(this.w * (1 - 0.12), this.h * 0.3, 576, "floor2");

        //new nonobox(this, this.w*(1-0.12)-408, this.h*0.3,0.1, 0.8, "floor2");
        //new nonobox(this, this.w*0.2+408, this.h*0.3, 0.1, 0.8, "floor2");

        let hourglass = new swappingsand(this, this.w * 0.5, this.h * 0.5, "glasspast", "glassfuture");
        let button = this.matter.add.image(this.w * 0.5, this.h * 0.88, "button");
        button.setScale(0.5);
        button.setStatic(true);
        let box = this.matter.add.image(this.w * 0.3, this.h * 0.7, "box_off");
        let wall = this.matter.add.image(this.w * 0.5, this.h * 0.05, "floor2");
        wall.angle = 90;
        wall.setStatic(true);
        //console.log(hourglass.bottomsand.body.id);
        //console.log(hourglass.topsand);

        new flag(this, this.w * 0.1, this.h * 0.17, "flag", this.player, "winscene", this.levelnum, this.completed);
        let pressed = false
        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            //console.log(bodyA.id);
            if (bodyB == box.body && bodyA == button.body && !pressed) {
                button.setScale(0.5, 0.25);
                button.y += 10;
                this.add.tween({
                    targets: floors2[1],
                    y: floors2[1].y + 150,
                    ease: "Sine",
                    duration: 1000,
                });
                pressed = true;
            }
        });

        this.addUpdates(hourglass);

    }
    level3() {
        let TopGround = this.matter.add.image(this.w * 0.1, this.h * 0.25, 'floor2');
        TopGround.setScale(1.1).setStatic(true);

        this.player.x = this.w * 0.1;
        this.player.y = this.h * 0.1;

        let LGround = this.matter.add.image(193, this.h, 'flooredit');
        LGround.setStatic(true);
        let LGround2 = this.matter.add.image(193, this.h * 0.9, 'flooredit');
        LGround2.setStatic(true);
        let LGround3 = this.matter.add.image(193, this.h * 0.8, 'flooredit');
        LGround3.setStatic(true);

        let LGround4 = this.matter.add.image(this.w * 0.3, this.h, 'flooredit');
        LGround4.setStatic(true);
        let LGround5 = this.matter.add.image(this.w * 0.3, this.h * 0.9, 'flooredit');
        LGround5.setStatic(true);
        let LGround6 = this.matter.add.image(this.w * 0.3, this.h * 0.8, 'flooredit');
        LGround6.setStatic(true);

        let RGround = this.matter.add.image(this.w * 0.7, this.h, 'flooredit');
        RGround.setStatic(true);
        let RGround2 = this.matter.add.image(this.w * 0.7, this.h * 0.9, 'flooredit');
        RGround2.setStatic(true);
        let RGround3 = this.matter.add.image(this.w * 0.7, this.h * 0.8, 'flooredit');
        RGround3.setStatic(true);

        let BGround = this.matter.add.image(this.w * 0.5, this.h, 'flooredit').setScale(1);
        BGround.setStatic(true);

        //USE THE BUTTON SPRITE INSTEAD
        let Button = this.matter.add.image(this.w * 0.5, this.h * 0.793, 'button');
        Button.setTintFill(0xff0000).setStatic(true)

        this.box_check = false;
        this.Boxes = new boxes(this, 'box_on', 'box_off');

        this.Fan = new fan(this, 'fan', 'wind')

        this.addUpdates(this.Boxes, this.Fan);
        let pressed = false;
        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if (bodyB == this.Boxes.box1.body && bodyA == Button.body && !this.state) {
                this.Fan.turn_on();
                this.box_check = true;

            }
            if ((bodyB == this.Boxes.box1.body || bodyB == this.Boxes.futurebox1.body) && bodyA == Button.body && !pressed) {
                Button.setScale(1, 0.5);
                Button.y += 35;
                pressed = true;
            }
            //restart scene because box electrocuted you
            if (bodyB == this.Boxes.box1.body && bodyA == this.player.body && !this.state) {
                this.scene.start('playscene', { levelnum: 3 })
            }
        })

        this.FGround = this.matter.add.image(this.w, this.h * 0.2, 'floor2');
        this.FGround.setStatic(true);

        let move = this.add.tween({
            targets: this.FGround,
            x: { from: this.w * 0.9, to: this.w * 0.7 },
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'cubic.inout',
        });
        this.completed = true;
        this.l3_flag = new flag(this, 200, 400, "flag", this.player, "endscene", this.levelnum, this.completed);
        this.l3_flag.flagimg.setScale(0.45)
    }

    updates() {
        //console.log("box_x: "+ this.Boxes.box1.x+"\nboxy: "+ this.Boxes.box1.y);
        if (this.levelnum == 3) {
            // this.box_check = false;
            // console.log('it be level 3')
            //gonna need another check to see if we are in the future and the fan is active
            if (this.player.x > this.w * 0.8 && this.player.y > this.h * 0.2 && !this.state && this.Boxes.box1.y > this.h * 0.5 && this.Boxes.box1.x < this.w * 0.7 && this.box_check) {
                console.log('fan zone');
                this.player.thrustLeft(0.01);
            }
            //keep updating the flag's position
            this.l3_flag.flagimg.x = this.FGround.x;
            this.l3_flag.flagimg.y = this.FGround.y - 135;
        }
    }

    floorplacer(x, y, width, texture) {
        let templist = []
        let temp = this.matter.add.image(x, y, texture);
        temp.setDepth(4);
        templist.push(temp);
        let dist = temp.width - 5;
        temp.setStatic(true);
        for (let i = dist; i < width; i = i + dist) {
            temp = this.matter.add.image(x + i, y, texture);
            temp.setStatic(true);
            templist.push(temp);
            temp = this.matter.add.image(x - i, y, texture);
            temp.setStatic(true);
            temp.setDepth(4);
            templist.push(temp);
        }
        return templist;
    }
}

class boxes {
    constructor(scene, box_on, box_off) {
        this.h = scene.game.config.height;
        this.box1 = scene.matter.add.image(500, this.h * 0.6, box_on);
        // this.box2 = scene.matter.add.image(400, this.h*0.6, box_on);
        // this.box3 = scene.matter.add.image(900, this.h*0.6, box_on);


        this.futurebox1 = scene.matter.add.image(this.box1.x, this.box1.y + 5000, box_off);
        // this.futurebox2 = scene.matter.add.image(this.box2.x,this.box2.y+5000, box_off);
        // this.futurebox3 = scene.matter.add.image(this.box3.x,this.box3.y+5000, box_off);
    }

    futureswap(state) {
        if (state) {
            this.futurebox1.x = this.box1.x;
            this.futurebox1.y = this.box1.y;
            this.box1.y = 5000;
        }
        if (!state) {
            this.box1.x = this.futurebox1.x;
            this.box1.y = this.futurebox1.y;

            this.futurebox1.y = 5000;
        }
    }
}

class fan {
    constructor(scene, fan, particle) {
        this.h = scene.game.config.height;
        this.w = scene.game.config.width;
        this.fan = scene.matter.add.image(this.w * 0.9, this.h * 0.9, fan).setInteractive().setStatic(true);
        this.wind = scene.add.particles(0, 0, particle, {
            scale: { start: 0.3, end: 0 },
            x: { min: this.w * 0.81, max: this.w * 0.99 },
            y: { start: this.h * 0.85, end: 400, ease: 'linear' },
            lifespan: 1000
        });
        this.wind.stop();
    }
    //state: true = future, false = past/present
    futureswap(state) {
        if (state) {
            this.wind.stop();
        }
    }

    turn_on() {
        this.wind.start();
    }
}


class flag {
    constructor(scene, x, y, img, player, key, levelnum, completed) {
        this.flagimg = scene.matter.add.image(x, y, img);
        let transitionDuration = 1000;
        this.flagimg.setStatic(true);
        this.flagimg.setScale(0.5);

        scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if (bodyA === player.body && bodyB === this.flagimg.body) {
                scene.cameras.main.fade(transitionDuration, 0, 0, 0);
                scene.time.delayedCall(transitionDuration, () => {
                    scene.scene.start(key, { levelnum: levelnum, completed: completed });
                });
            }
        });

    }
}
class nonobox {
    constructor(scene, x, y, width, height, texture) {
        this.nono = scene.matter.add.image(x, y, texture);
        this.nono.setScale(width, height);
        scene.makeUnjumpapable(this.nono);
        this.nono.setStatic(true);
        this.nono.alpha = 0;
    }
}
class wood {
    constructor(scene, x, y, floppy, texture, ashtexture) {
        this.unburnt = scene.matter.add.image(x, y, texture);
        this.floppy = !floppy;
        this.unburnt.setStatic(this.floppy);
        this.onfire = false;
        this.scene = scene;
        this.ashtexture = ashtexture;
        this.ash = scene.matter.add.image(x, y, 'ash');
        this.ash.setFriction(0.05);
        this.ash.setFrictionAir(0.0005);
        this.ash.setBounce(0);
        this.ash.y = 3000;
        this.fire = null;
    }
    burn() {
        this.onfire = true;
    }

    futureswap(state) {
        if (state && this.onfire) {
            this.ash.setVelocity(0, 0);
            this.ash.x = this.unburnt.x;
            this.ash.y = this.unburnt.y;
            this.unburnt.y = 3000;
            this.unburnt.setAngularVelocity(0, 0);
            if (this.fire != null) {
                this.fire.y = 3000;
            }
            //console.log(this.unburnt.y);
        }
        if (!state && this.onfire) {
            this.unburnt.setStatic(this.floppy);
            this.unburnt.setOrigin(0.5, 1);
            this.unburnt.setVelocity(0, 0);
            this.unburnt.x = this.ash.x;
            this.unburnt.y = this.ash.y - 100;
            this.unburnt.setOrigin(0.5, 0.5);
            if (this.fire != null) {
                this.fire.y = this.unburnt.y;
                this.fire.x = this.unburnt.x;
            }
            this.ash.y = 3000;
            this.ash.setAngularVelocity(0, 0);
        }
    }
}

class swappingsand {
    constructor(scene, x, y, pastsand, futuresand) {
        this.y = y;
        this.topsand = scene.matter.add.image(x, y - 150, pastsand);
        this.bottomsand = scene.matter.add.image(x, y, futuresand);
        this.topsand.setScale(0.43);
        this.bottomsand.setScale(0.43);
        this.topsand.setTrapezoid(this.topsand.width * 0.43, -this.topsand.height * 0.20, 0.73);
        this.bottomsand.setTrapezoid(this.topsand.width * 0.43, this.topsand.height * 0.15, 0.57);
        this.topsand.setOrigin(0.5, 0.25);
        this.bottomsand.setOrigin(0.5, 0.84);
        //this.bottomsand.angle = 180;
        this.topsand.setStatic(true);
        this.bottomsand.setStatic(true);


        this.bottomsand.y = 3000;

    }
    futureswap(state) {
        if (state) {
            this.topsand.y = 3000;
            this.bottomsand.y = this.y + 190;
        }
        else {
            this.bottomsand.y = 3000;
            this.topsand.y = this.y - 150;
        }
    }

}
class winscene extends Phaser.Scene {
    init(data) {
        this.levelnum = data.levelnum || 1;
        this.completed = data.completed || false;
    }

    constructor() {
        super("winscene");
    }
    create() {
        let w = this.game.config.width;
        let h = this.game.config.height;
        let wintext = this.add.text(w * 0.5, h * 0.5, "\t\t\t\t\tYOU WON!\n Tap to continue!");
        wintext.setOrigin(0.5, 0.5);
        wintext.setFontSize(65);
        wintext.setTint(0x000000);

        let transitionDuration = 1000;
        this.input.on("pointerdown", () => {
            this.cameras.main.fade(transitionDuration, 0, 0, 0);
            this.time.delayedCall(transitionDuration, () => {
                this.scene.start("playscene", { levelnum: this.levelnum + 1, completed: this.completed });
            });
        });
    }

}

class endscene extends Phaser.Scene {
    init(data) {
        this.levelnum = data.levelnum || 1;
        this.completed = data.completed || false;
    }
    constructor() {
        super('endscene');
    }
    create() {
        let w = this.game.config.width;
        let h = this.game.config.height;
        let wintext = this.add.text(w * 0.5, h * 0.5, "YOU BEAT THE GAME! Thank you for playing!\n\t\t\t\t\t\t\t\t\t\tClick to play again!!");
        wintext.setOrigin(0.5, 0.5);
        wintext.setFontSize(65);
        wintext.setTint(0x000000);

        this.add.text(w * 0.5, h * 0.7, "Game created by:\nNathaniel Chu (Technology Lead)\nPeter Ampudia (Production Lead)\nIsai Rincon (Testing Lead)")
            .setOrigin(0.5, 0.5)
            .setFontSize(55)
            .setTint(0x000000);

        let transitionDuration = 1000;
        this.input.on("pointerdown", () => {
            this.cameras.main.fade(transitionDuration, 0, 0, 0);
            this.time.delayedCall(transitionDuration, () => {
                this.scene.start("playscene", { levelnum: this.levelnum = 1, completed: this.completed });
            });
        });
    }
}


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
            //debug:true,
        }
    },
    input: {
        gamepad: true
    },
    backgroundColor: 0xffffff,
    scene: [logo, title, playscene, winscene, endscene]
};
const game = new Phaser.Game(config);