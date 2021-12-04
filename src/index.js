import Phaser from 'phaser';
import Unit from './Unit';
import Map from './Map';
import unitDataFile from './assets/UnitData.json';

const unitData = [
	new Unit(
		unitDataFile.unitData[0].xPos,
		unitDataFile.unitData[0].yPos,
		unitDataFile.unitData[0].health,
		1,
		0
	),
	new Unit(
		unitDataFile.unitData[1].xPos,
		unitDataFile.unitData[1].yPos,
		unitDataFile.unitData[1].health,
		0,
		1
	),
	new Unit(
		unitDataFile.unitData[2].xPos,
		unitDataFile.unitData[2].yPos,
		unitDataFile.unitData[2].health,
		0,
		2
	),
];

let CurrentPlayer = 0;


/*export class GamesUI extends Phaser.Scene {
	constructor() {
		super({
			//key: "Jazz"
		});
	}

	preload() {
		// this.load.image('logo', logoImg);
		//this.load.image(
		//	'dude',
		//	'http://labs.phaser.io/assets/sprites/orange-cat1.png'
		//);
		this.load.image('dude', './src/assets/sprites/Dude.png');
		// this.load.text('unitDataFile', './assets/UnitData.json');
	}

	create() {
		//this.physics.world.setBoundsCollision(true, true, true, true); //Not really needed, but this makes the edges of the canvas rigid bodies

		for (let i = 0; i < unitData.length; i++) {
			unitData[i].obj = this.physics.add.image(unitData[i].xPos*32, unitData[i].yPos*32, 'dude').setInteractive();
			//this.physics.add.sprite(x,y,key,frame);//Use this syntax if adding animation (sprites are just multiple frames of an image)
			unitData[i].obj.on('pointerdown', function () {
				unitData[i].clickedOn(CurrentPlayer);
			});
		}

		this.input.on('pointerup', function (pointer) {
			for (let i = 0; i < unitData.length; i++) {
				if (unitData[i].isSelected) {
					unitData[i].goTo(pointer.x, pointer.y);
				}
			}
		});
	}

	update() {
		for (let i = 0; i < unitData.length; i++) {
			//There has to be a more efficent way of doing this than looping over every unit
			//but I expect it will be done on the server side so maybe looping over all units wont be as computationally expensive.
			unitData[i].move(unitData);
		}
	}
}*/

export default class MapScene extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
        this.load.image('terrainTileLoad', './src/assets/sprites/4x4OfCellTiles.png');
        this.load.image('stuffToPutOnMap', './src/assets/sprites/BasicHouseTower.png');
        this.load.tilemapTiledJSON('map', './src/assets/RoughMap2.json');  
		this.load.image('dude', './src/assets/sprites/Dude.png');      
    }

	create() {
        const map = this.make.tilemap({ key: 'map' });
        //const map = this.make.tilemap(MapFile);
  
        // Parameters are the name you gave the tileset (not layer) in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        //const tileset = map.addTilesetImage("TileSetNameEmbededInMap.json", "key");
        const terrainTileset = map.addTilesetImage('Crude32Tiles','terrainTileLoad');
        const buildingTileset = map.addTilesetImage('CrudeTower', 'stuffToPutOnMap');
      
        // Parameters: layer name from Tiled.json, tileset, x, y
        
        const worldLayer = map.createLayer('terrainLayer', terrainTileset, 0, 0);
        const aboveLayer = map.createLayer('buildingLayer', buildingTileset, 0, 0);  
        console.log('bootingMap');  

		for (let i = 0; i < unitData.length; i++) {
			unitData[i].obj = this.physics.add.image(unitData[i].xPos*32, unitData[i].yPos*32, 'dude').setInteractive();
			//this.physics.add.sprite(x,y,key,frame);//Use this syntax if adding animation (sprites are just multiple frames of an image)
			unitData[i].obj.on('pointerdown', function () {
				unitData[i].clickedOn(CurrentPlayer);
			});
		}

		this.input.on('pointerup', function (pointer) {
			for (let i = 0; i < unitData.length; i++) {
				if (unitData[i].isSelected) {
					unitData[i].goTo(pointer.x, pointer.y);
				}
			}
		});
	}

	update() {		
	}
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	pixelArt: true,
	//parent: 'phaser-example',
	scene: [MapScene],
	//scene: [GamesUI],
	/*physics: {
		default: 'arcade',
	},*/
};

const game = new Phaser.Game(config);
//const game = new Phaser.Game(configMap);