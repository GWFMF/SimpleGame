/* Defeine the scene for the game.  It's called example beacuse I ripped the bones
 * of the script from a phaser 3 example.  We should rename it*/
var donut1;

class Example extends Phaser.Scene
{
    /*I don't really know what this does.  I get a constructor() and that super() 
     * allows access of the parent attributes, but I don't get this.*/
    constructor()
    {
        super();
    }

    //Get the map file from phaser's free assets
    preload ()
    {
        this.load.image('map', 'http://labs.phaser.io/assets/tests/camera/earthbound-scarab.png');
        this.load.image('donut', 'http://labs.phaser.io/assets/sprites/donut.png');

    }

    //Ok this is the meat, time to create the scene
    create ()
    {
        var zoomLevel = 1;//Set starting zoom level        
        //const text = this.add.text(304, 230).setText('Click to move').setScrollFactor(0);//Put some UI on the screen that isn't part of the world.

        //Set up the camera
        this.cameras.main.setBounds(0, 0, 1024, 2048);//Set the limits of the world the camera can cover.
        this.add.image(0, 0, 'map').setOrigin(0);//add the map to the scene (any background is cool)
        this.cameras.main.setZoom(zoomLevel);//Set the zoom on the camera
        this.cameras.main.centerOn(0, 0);//Set where the camera is centered        
        const cam = this.cameras.main;//Get a variabile holding the camera to manipulate listern events defined below
        //On key press mess with the zoom (right now only 4 steps)
        this.input.keyboard.on('keydown', function (event) {
            zoomLevel = zoomLevel - 1;
            if (zoomLevel <= 0){
                zoomLevel = 4;
            }               
            cam.setZoom(zoomLevel);            
        });
        //On mouse click, recenter the camera directly over the mouseclick in the world space.
        this.input.on('pointerdown', pointer => {
            let duder = new Unit(pointer.x,pointer.y,10)
            //let p = cam.getWorldPoint(pointer.x, pointer.y);//This translates between game world and screen position
            //cam.centerOn(p.x, p.y);
            //console.log(p);
        });

        //Draw a sprite that is interactive
        //var text = this.add.text(10, 10, 'words', { font: '16px Courier', fill: '#00ff00' });
        var text = this.add.text(10, 10).setText('words', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);
        donut1 = this.add.image(150, 300, 'donut').setInteractive();
        donut1.on('pointerdown', function () { text.setText('Donut Selected'); });
    }
}

class Unit {//Define a unit prototype
    preload() {
        this.load.image('dude', 'http://labs.phaser.io/assets/sprites/orange-cat1.png');
    }

    constructor(x, y, h) {
        this.xPos = x;
        this.yPos = y;
        this.health = h;
        this.speed = 1;
        this.goingToX = x;//Later replace with an array of positions the unit is going to move through
        this.goingToY = y;
        dude1 = this.add.image(x, y, 'dude').setInteractive();
        donut1.on('pointerdown', function () { console.log('Dude clicked'); });
    }

    
    
    goTo(x, y){
        goingToX = x;
        goingToY = y;
    }

    move() {
        if (goingToX < xPos) {
            xPos = xPos - speed;
            //If speed is too high will need to test for overshooting
        }
        if (goingToX > xPos) {
            xPos = xPos + speed;
        }
        if (goingToY < yPos) {
            yPos = yPos - speed;
        }
        if (goingToY > yPos) {
            yPos = yPos + speed;
        }
        //Update transform to match xPos.  Also may need to update animation
    }   
}



const config = {
    type: Phaser.AUTO,
    //parent: 'phaser-example',//Had this before to make things work, not needed now...
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
    },
    scene: [ Example ]//Set the scene as the scene defined above.
};

const game = new Phaser.Game(config);//Actual generate the scene.

function update() {
    camera.main.setZoom(zoomLevel);
};