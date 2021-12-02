
//import MapFile from './assets/BasicFirstMap.json';
//import terrainTilesImport from './assets/sprites/pipo-map001_at.png';


export default class Map extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
        this.load.image("terrainTileLoad", "./src/assets/sprites/4x4OfCellTiles.png");
        this.load.image("stuffToPutOnMap", "./src/assets/sprites/BasicHouseTower.png");
        this.load.tilemapTiledJSON("map", "./src/assets/RoughMap2.json");        
    }

	create() {
        const map = this.make.tilemap({ key: "map" });
        //const map = this.make.tilemap(MapFile);
  
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        //const tileset = map.addTilesetImage("pipo-map001_at", "terrainTiles");
        const tileset = map.addTilesetImage("Crude32Tiles","terrainTileLoad");
        const tileset2 = map.addTilesetImage("CrudeTower", "stuffToPutOnMap");
      
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        
        const worldLayer = map.createLayer("terrainLayer", tileset, 0, 0);
        const aboveLayer = map.createLayer("buildingLayer", tileset2, 0, 0);  
        console.log('bootingMap');  
	}

	update() {		
	}
}

const configMap = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	pixelArt: true,
	//parent: 'phaser-example',
	scene: [Map],
	physics: {
		default: 'arcade',
	},
};

const game = new Phaser.Game(configMap);