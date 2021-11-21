// JavaScript source code
class Unit {//Define a unit prototype    
    constructor(x, y, h,plyrNum,idnum) {
        this.xPos = x;
        this.yPos = y;
        this.health = h;
        this.speed = 1;
        this.isSelected = false;
        this.owner = plyrNum;
        this.goingToX = x;//Later replace with an array of positions the unit is going to move through
        this.goingToY = y;
        this.obj = null;//This holds the gameobject created when the sprite is drawn on the screen.    
        this.isMoving = false;
        this.ID = idnum;// Maybe not needed
    }
    //Setup a function that will reassign the new coordiance (later with pathfinding it will be something else)
    goTo(x, y) {
        this.goingToX = x;
        this.goingToY = y;
        //console.log('This unit is going to ' + this.goingToX + ',' + this.goingToY);
    }

    //This is the function that will need to be called on every game tic, probably some detlaTime() function I have yet to define in the scene
    move(allUnits) {
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
        this.obj.x = this.xPos;
        this.obj.y = this.yPos;

        for (let i = 0; i < allUnits.length; i++) {
            //console.log('testing: ' + this.ID + ',' + allUnits[i].ID + ' xdist:' + Math.abs(this.xPos - allUnits[i].xPos));
            
            if (Math.abs(this.xPos - allUnits[i].xPos) < 20 && Math.abs(this.yPos - allUnits[i].yPos) < 20 && this.owner != allUnits[i].owner) {
                //console.log('Boom we fight');
                allUnits[i].combat(this);
            }                
                
        }
    }

    //This will later need to interact with some UI so unit info can be analyzed by the player and options can be selected
    clickedOn(crntPlyr) {
        if (crntPlyr == this.owner) {
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

    //so if something else moves into range, then this is called by the other units movement function
    combat(attackingUnit) {
        while (this.health > 0 & attackingUnit.health > 0) {
            this.health = this.health - 1;
            attackingUnit.health = attackingUnit.health - 2;
            console.log('Attacking unit health: ' + attackingUnit.health + 'Defending unit health: ' + this.health);
        }
        if (this.health <= 0) {
            this.distroy();
        }
        if (attackingUnit.health <= 0) {
            attackingUnit.distroy();
        }
    }

    distroy() {
        console.log(this + 'Distroyed');
        this.obj.disableBody(true, true);//Need to look into docs, there is probably a distroy function.
    }
    
}