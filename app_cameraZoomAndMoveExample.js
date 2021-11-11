/* Defeine the scene for the game.  It's called example beacuse I ripped the bones
 * of the script from a phaser 3 example.  We should rename it*/

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
    }

    //Ok this is the meat, time to create the scene
    create ()
    {
        var zoomLevel = 4;//Set starting zoom level        
        const text = this.add.text(304, 230).setText('Click to move').setScrollFactor(0);//Put some UI on the screen that isn't part of the world.

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
            let p = cam.getWorldPoint(pointer.x, pointer.y);//This translates between game world and screen position
            cam.centerOn(p.x, p.y);
            //console.log(p);
        });
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

/*update() {
    camera.main.setZoom(zoomLevel);
};*/