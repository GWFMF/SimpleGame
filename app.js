/* Basic Game JavaScript Code
 * Written by M.G.Clark
 * Makes some garfields on the screen that you can click on and when you let go of the mouse they move to that location
 * Until you click on them again they will keep moving to your mouse clicks.
 *  You can click on multiple and they will all chace the mouse clicks.
 */ 

class Unit {//Define a unit prototype    
    constructor(x, y, h) {
        this.xPos = x;
        this.yPos = y;
        this.health = h;
        this.speed = 1;
        this.isSelected = false;
        this.owner = 0;
        this.goingToX = x;//Later replace with an array of positions the unit is going to move through
        this.goingToY = y;
        this.obj = null;//This holds the gameobject created when the sprite is drawn on the screen.    
        this.isMoving = false;
    }
    //Setup a function that will reassign the new coordiance (later with pathfinding it will be something else)
    goTo(x, y) {
        this.goingToX = x;
        this.goingToY = y;
        console.log('This unit is going to ' + this.goingToX + ',' + this.goingToY);
    }

    //This is the function that will need to be called on every game tic, probably some detlaTime() function I have yet to define in the scene
    move() {
        //Right now this only moves by pixels, will need to move it to a grid format for the world map.
        var moveFlag = false;
        if (this.goingToX < this.xPos) {
            this.xPos = this.xPos - this.speed;
            this.moveFlag = true;
            //If speed is anything but 1 I will need to test for overshooting
        }
        if (this.goingToX > this.xPos) {
            this.xPos = this.xPos + this.speed;
            this.moveFlag = true;
        }
        if (this.goingToY < this.yPos) {
            this.yPos = this.yPos - this.speed;
            this.moveFlag = true;
        }
        if (this.goingToY > this.yPos) {
            this.yPos = this.yPos + this.speed;
            this.moveFlag = true;
        }

        //Right now I'm thinking only stationary units can attack, so I need some way to check for that.
        if (this.moveFlag) {
            this.isMoving = true;
        }
        else {
            this.isMoving = false;
        }
                
    }

    //This will later need to interact with some UI so unit info can be analyzed by the player and options can be selected
    clickedOn() {
        if (this.isSelected) {
            console.log('Unselected this unit at ' + this.xPos + ',' + this.yPos)
            this.isSelected = false;
        }
        else {
            console.log('Selected this unit at ' + this.xPos + ',' + this.yPos)
            this.isSelected = true;
        }
    }
}


//Load unitData from a json file (later to be pushed out by the server)
var unitData = [new Unit(30, 30, 10),
    new Unit(200, 200, 10),
    new Unit(200, 500, 10)];


var BasicGame = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function BasicGame() {    
        Phaser.Scene.call(this, { key: 'basicgame' });
        this.units = [];
        this.map;
        this.extraStuffNotUsed;
    },

    preload: function() {
        this.load.image('dude', 'http://labs.phaser.io/assets/sprites/orange-cat1.png');
        //unitdata = JSON.parse('UnitData.json');
    },

    create: function () {    
        this.physics.world.setBoundsCollision(true, true, true, true);//Not really needed, but this makes the edges of the canvas rigid bodies
        /*
         * EXAMPLES ON HOW TO ADD SPRITES:
         * this.physics.add.image(x,y,key);
         * this.physics.add.sprite(x,y,key,frame);
         * this.units = this.physics.add.group({
         *     key
         * });
         * 
         */
        for (let i = 0; i < unitData.length; i++) {
            unitData[i].obj = this.physics.add.image(unitData[i].xPos, unitData[i].yPos, 'dude').setInteractive();
            unitData[i].obj.on('pointerdown', function () { unitData[i].clickedOn()});
        }

        this.input.on('pointerup', function (pointer) {
            for (let i = 0; i < unitData.length; i++) {
                if (unitData[i].isSelected) {
                    unitData[i].goTo(pointer.x,pointer.y);
                }
            }
        })
    },

    update: function () {
        for (let i = 0; i < unitData.length; i++) {
            unitData[i].move();
            unitData[i].obj.x = unitData[i].xPos;
            unitData[i].obj.y = unitData[i].yPos;
        }
    }
});


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    //parent: 'phaser-example',
    scene: [BasicGame],
    physics: {
        default: 'arcade'
    }
};

var game = new Phaser.Game(config);

function update() {

}