
var Robot = function(tank) {
  //enemy info
  this.ePos;
  this.eAngle;
  this.eCannonAngle;
  this.eLife;
  this.eBearing;
  
  // general data
  this.arenaCenter = {x:tank.arenaWidth/2,y:tank.arenaHeight/2};
  this.zero = {x:0,y:0};
};

var Tank = Robot.prototype;

Tank.onIdle = function(ev) {    
  var tank = ev.robot;
 
  var cannonAngle = tank.cannonAbsoluteAngle;
  var tankAngle = tank.angle;
	var bearing = Utils.getAngle(tank.position,this.arenaCenter);

  tank.move(1)
  tank.turn(1)
	//var i = (tank.position.x * tank.position.y % 100 / 100).toFixed(1)
  tank.log(Utils.randNum(tank.position))



/* WORKS DONT DELETE   
  var cannonAngle = tank.cannonAbsoluteAngle;
  var tankAngle = tank.angle;
	this.eBearing = getAngle(tank.position,this.arenaCenter);  
  var cannonDelta = getSignedAngle(cannonAngle,this.eBearing);
  var dir = cannonDelta > 0 ? 1 : -1;   
  tank.rotateCannon(dir);            
  //tank.log("enemyBearing: " + bearing + " MyBearing: " + cannonAngle + " delta: " + delta + " rotDir: " + rot); 
*/
  
/* WORKS DONT DELETE                                   
  if (this.ePos == null) {
    tank.rotateCannon(dir);
  }
  else
  {
  	var cannonAngle = tank.cannonAbsoluteAngle;
  	var bearing = getAngle(tank.position,this.ePos);     
  	var angle = bearing-cannonAngle;

		tank.log(angle); 
  	tank.rotateCannon(angle);    
  }
*/    
}


Tank.onScannedRobot = function(ev) {
	var tank = ev.robot;
	var scan = ev.scannedRobot;

  if(isEnemy(tank,scan)) {
  	this.ePos = scan.position;

    //angle = getAngle(tank.position, scan.position);
    //tank.log(scan.position.x);
    //tank.log(Utils.rotateToTarget(tank.position,scan.position))
  }
}





// Utility Functions
//------------------------------------------------------------------------------

class Utils {
  // convert radians to degrees
  static radToDeg(rad)
  {
    return rad * (180/Math.PI);
  }
  
  // get angle between two points
  static getAngle(p1,p2)
  {
    var angle = Math.atan2(-p2.y + p1.y,-p2.x + p1.x); 
    angle = angle > 0 ? angle : Math.PI * 2 + angle;
		return this.radToDeg(angle);    
  }

  // get smallest angle
  static getSignedAngle(source,target)
  {
    var angle = target-source;
    angle += (angle > 180) ? -360 : (angle < -180) ? 360 : 0;
    return angle;
  }  

  // random number between 0-1.  Requires an x/y position as a random seed
  static randNum(pos)
  {
    return (pos.x * pos.y % 100 / 100).toFixed(1)
  }
  
  // random number in a range. Requires an x/y position as a random seed
  static randRange(min, max, pos) {
    return Math.floor(this.randNum(pos) * (max - min + 1)) + min;
	}
}

/* TANK UTILITIES */
// scanned tank is the enemy parent
function isEnemy(tank,scan)
{
	return scan.parentId == null && scan.id != tank.parentID
}

/*
// return angle of two points
function getAngle(pt1,pt2) 
{
	var angle = Math.atan2(-pt2.y + pt1.y,-pt2.x + pt1.x); 
  var angle = angle > 0 ? angle : Math.PI * 2 + angle;     
  return radToDeg(angle);
}

// convert radians to degrees
function radToDeg(rad)
{
	return rad * (180/Math.PI);  
}

//signed smallest angle
function getSignedAngle(source,target)
{
  var angle = target-source;
	angle += (angle > 180) ? -360 : (angle < -180) ? 360 : 0;
  return angle;
}

// dot product
function dot(v1, v2) {
	return (v1.x * v2.x) + (v1.y * v2.y);
}

// return distance between two points
function getDist(pt1,pt2)
{
  return Math.sqrt(Math.pow(pt1.x-pt2.x,2) + Math.pow(pt1.y-pt2.y,2))
}


// calculate rotation angle delta
function getRotDelta(a1,a2)
{
    var rot = a2 - a1;
  	while (rot > 180) rot -= 360;
    while (rot < -180) rot += 360;
    return rot;
}

// rotate to target angle
function rotToAngle(a1,a2)
{
  var rot = getRotDelta(a1,a2);
  return rot;
}

// rotate to target angle
//var rotToAngle = function(source, target)
//{
//	var angle = Utils.getAngle(source,target);
// var rot = Utils.getRotDelta(robot.cannonAbsoluteAngle,angle);
//  return rot;
//}
*/
