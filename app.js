class Example extends Phaser.Scene
{   

    constructor()
    {
        super();
    }

    preload ()
    {
        this.load.image('map', 'http://labs.phaser.io/assets/tests/camera/earthbound-scarab.png');
    }

    create ()
    {
        var zoomLevel = 4;
        var camera = this.cameras.main;
        this.cameras.main.setBounds(0, 0, 1024, 2048);

        this.add.image(0, 0, 'map').setOrigin(0);

        this.cameras.main.setZoom(zoomLevel);
        this.cameras.main.centerOn(0, 0);
        

        const text = this.add.text(304, 230).setText('Click to move').setScrollFactor(0);
        //text.setShadow(1, 1, '#000000', 2);

        let pos = 0;
        //var keyObj = scene.input.keyboard.addKey('W');  // Get key object
        //keyObj.on('down', function (event) { /* ... */ });
        //keyObj.on('up', function (event) { /* ... */ });
        this.input.keyboard.on('keydown', function (event) {            
            zoomLevel = zoomLevel - 1;
            if (zoomLevel <= 0){
                zoomLevel = 4;
            }               
            //camera.main.setZoom(zoomLevel);
            console.log(camera);
        });
        //this.cameras.main.setZoom(zoomLevel);

        this.input.on('pointerdown', pointer => {

            const cam = this.cameras.main;
            let p = cam.getWorldPoint(pointer.x, pointer.y);//This translates between game world and screen position
            cam.centerOn(p.x, p.y);
            console.log(p);
        });//, this);
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
    },
    scene: [ Example ]
};

const game = new Phaser.Game(config);
