// Contains the Rule base class and the actual rules that inherit those base elements
// The conditions list is checked through continuously; when a rule's conditions are fulfilled,
// the rule's consequence is fired. The weight of a rule determines its importance relative to
// the rest of the rules. Two rules may have their conditions fulfilled simultaneously, a 
// higher weighted rule will fire first.

/////////////////////////////////////////
//   Rules         //////////////////////
/////////////////////////////////////////

/* 
 *  wantToMoveNorthColder determines whether the tribe wants to move north
 *  above the equator  
 *
 */

var wantToMoveNorthColder = function() {
    // All conditions to choose from for making rules
    var allConditions = pc.fw.Application.getApplication('application-canvas').context.root.findByName('AI').script.Conditions;
    
    this.weight = 1;
    this.conditions = [allConditions.isTileWarmer,
                       allConditions.isAboveEquator];
};

wantToMoveNorthColder.prototype = {
    testConditions: function(tribe){
        for(var i = 0; i < this.conditions.length; i++){
            if(!this.conditions[i](tribe)){
                return false;
            }
        }
        return true;
    },
    
    consequence: function(tribe){
        tribe.setDestination(tribe.tile.getNorthNeighbor());
        //console.log("wantToMoveNorthColder has fired: " + tribe.currTileTemperature);
    }    
};

/* 
 *  wantToMoveSouthWarmer determines whether the tribe wants to move south
 *  above equator
 *    
 */

var wantToMoveSouthWarmer = function() {
    // All conditions to choose from for making rules
    var allConditions = pc.fw.Application.getApplication('application-canvas').context.root.findByName('AI').script.Conditions;
    
    this.weight = 1;
    this.conditions = [allConditions.isTileColder,
                       allConditions.isAboveEquator];
};

wantToMoveSouthWarmer.prototype = {
    testConditions: function(tribe){
        for(var i = 0; i < this.conditions.length; i++){
            if(!this.conditions[i](tribe)){
                return false;
            }
        }
        return true;
    },
    
    consequence: function(tribe){
        tribe.setDestination(tribe.tile.getSouthNeighbor());
        //console.log("wantToMoveSouthWarmer() has fired: " + tribe.currTileTemperature);
    }    
};

/* 
 *  wantToMoveNorthWarmer determines whether the tribe wants to move south
 *  above equator
 *    
 */

var wantToMoveNorthWarmer = function() {
    // All conditions to choose from for making rules
    var allConditions = pc.fw.Application.getApplication('application-canvas').context.root.findByName('AI').script.Conditions;
    
    this.weight = 1;
    this.conditions = [allConditions.isTileColder,
                       allConditions.isBelowEquator];
};

wantToMoveNorthWarmer.prototype = {
    testConditions: function(tribe){
        for(var i = 0; i < this.conditions.length; i++){
            if(!this.conditions[i](tribe)){
                return false;
            }
        }
        return true;
    },
    
    consequence: function(tribe){
        tribe.setDestination(tribe.tile.getSouthNeighbor());
        //console.log("wantToMoveNorthWarmer() has fired: " + tribe.currTileTemperature);
    }    
};

/* 
 *  wantToMoveSouthColder determines whether the tribe wants to move south
 *  above equator
 *    
 */

var wantToMoveSouthColder = function() {
    // All conditions to choose from for making rules
    var allConditions = pc.fw.Application.getApplication('application-canvas').context.root.findByName('AI').script.Conditions;
    
    this.weight = 1;
    this.conditions = [allConditions.isTileWarmer,
                       allConditions.isBelowEquator];
};

wantToMoveSouthColder.prototype = {
    testConditions: function(tribe){
        for(var i = 0; i < this.conditions.length; i++){
            if(!this.conditions[i](tribe)){
                return false;
            }
        }
        return true;
    },
    
    consequence: function(tribe){
        tribe.setDestination(tribe.tile.getSouthNeighbor());
        //console.log("wantToMoveSouthColder() has fired: " + tribe.currTileTemperature);
    }    
};

/* 
 *  wantToMigrate determines whether the tribe wants to move south
 *  above equator. This is a spiteful rule
 *    
 */

var wantToMigrate = function() {
    // All conditions to choose from for making rules
    var allConditions = pc.fw.Application.getApplication('application-canvas').context.root.findByName('AI').script.Conditions;
    
    this.weight = 2;
    this.conditions = [allConditions.isTileTemperatureNotIdeal/*,
                       allConditions.isSpiteful*/];
};

wantToMigrate.prototype = {
    testConditions: function(tribe){
        for(var i = 0; i < this.conditions.length; i++){
            if(!this.conditions[i](tribe)){
                return false;
            }
        }
        return true;
    },
    
    consequence: function(tribe){
        //console.log("Tribe's tile: " + tribe.destinationTile);
        // var bestTile;
        // var idealTemperature = tribe.getIdealTemperature();
        // var tempTemperatureA = Math.abs(idealTemperature - tribe.tile.neighbora.getTemperature());
        // var tempTemperatureB = Math.abs(idealTemperature - tribe.tile.neighborb.getTemperature());
        // var tempTemperatureC = Math.abs(idealTemperature - tribe.tile.neighborc.getTemperature());

        // switch(Math.min(tempTemperatureA, tempTemperatureB, tempTemperatureC)) {
        //     case tempTemperatureA:
        //         bestTile = tribe.tile.neighbora;
        //         break;
        //     case tempTemperatureB:
        //         bestTile = tribe.tile.neighborb;
        //         break;
        //     case tempTemperatureC:
        //         bestTile = tribe.tile.neighborc;
        //         break;
        // }

        // //console.log("Migrate has fired: " + bestTile.center);
        // tribe.isSpiteful = false;
        // tribe.setDestination(bestTile);
        
        tribe.migrate();

        var moveS = pc.fw.Application.getApplication('application-canvas').context.root._children[0];
            moveS.script.send('AudioController', 'sound_TribeMov', 'initialized');
    }    
};

/* 
 *  needTemperatureChange means the tribe will pray to the player for rain or sun
 *  If not fulfilled, they will migrate instead
 *    
 */

var needTemperatureChange = function() {
    // All conditions to choose from for making rules
    var allConditions = pc.fw.Application.getApplication('application-canvas').context.root.findByName('AI').script.Conditions;
    
    this.weight = 3;
    this.conditions = [allConditions.isTileTemperatureNotIdeal,
                       allConditions.isNotSpiteful];
};

needTemperatureChange.prototype = {
    testConditions: function(tribe){
        for(var i = 0; i < this.conditions.length; i++){
            if(!this.conditions[i](tribe)){
                return false;
            }
        }
        return true;
    },
    
    consequence: function(tribe){
        console.log("Need temperature change fired");
        tribe.prayForTemperature(10);
    }    
};