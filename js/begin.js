var begin = function(game) {}

var map;
var tileset;
var layer;

var oldX = 0;
var oldY = 0;
var currentX = 0;
var currentY =0;
var key;
var cursors;
var locsWall = [];
var locsAnimal = [];

var wall;
var wallIndex;
var wallNum = 0;
var walls;

var animal;
var animalIndex;
var speed = 64;
var animalNum = 0;
var animalEscapedNum = 0;
var animalName;
var animals;

begin.prototype = {
	preload: function() {
		game.load.tilemap('desert', 'assets/images/wall.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('ground_1x1', 'assets/images/ground_1x1.png');
//		game.load.spritesheet('trees', 'assets/images/walls_1x2.png', 32, 64);
		game.load.image('trees','assets/images/flower_wall.png');
		game.load.audio('sfx', 'assets/audios/fx_mixdown.ogg');
		game.load.spritesheet('button', 'assets/images/flixel-button.png', 80, 20);
   		game.load.bitmapFont('nokia', 'assets/fonts/nokia16black.png', 'assets/fonts/nokia16black.xml');
		game.load.spritesheet('animal1', 'assets/images/pikachu.png', 48, 48, 16);
		game.load.spritesheet('animal2', 'assets/images/bear.png', 48, 48, 16);
		game.load.spritesheet('animal3', 'assets/images/bull.png', 48, 48, 16);
		game.load.spritesheet('animal4', 'assets/images/dog.png', 48, 48, 16);
		game.load.spritesheet('animal5', 'assets/images/duck.png', 48, 48, 16);
		game.load.spritesheet('animal6', 'assets/images/sheep.png', 48, 48, 16);
		game.load.spritesheet('animal7', 'assets/images/fox.png', 48, 48, 16);
	},

	create: function() {
//		game.physics.startSystem(Phaser.Physics.ARCADE);
		//  Create our tilemap to walk around
		map = game.add.tilemap('desert');
		map.addTilesetImage('ground_1x1');
		layer = map.createLayer('Tile Layer 1');
		
		//音效组
		fx = game.add.audio('sfx');
    		fx.allowMultiple = true;
//  		fx.addMarker('alien death', 1, 1.0);
//	    fx.addMarker('boss hit', 3, 0.5);
//	    fx.addMarker('escape', 4, 3.2);
//	    fx.addMarker('meow', 8, 0.5);
//	    fx.addMarker('numkey', 9, 0.1);
	    fx.addMarker('ping', 10, 1.0);
//	    fx.addMarker('death', 12, 4.2);
//	    fx.addMarker('shot', 17, 1.0);
	    fx.addMarker('squit', 19, 0.3);
		
		//墙组
		walls = game.add.group();
		walls.z = 2;
		walls.enableBody = true;
		walls = game.add.physicsGroup(Phaser.Physics.ARCADE);
		
		//动物组
		animals = game.add.group();
		animals.z = 1;
		animals.enableBody = true;
   		animals = game.add.physicsGroup(Phaser.Physics.ARCADE);
   		animals.setAll('checkWorldBounds',true);
   		animals.setAll('outOfBoundsKill',true);
   		
//		animals.setAll('body.collideWorldBounds', true);
//		animals.setAll('body.bounce.x', 1);
//  		animals.setAll('body.bounce.y', 1);
		wallNum = game.rnd.integerInRange(150, 200);
		for(var i = 0; i < wallNum; i++) {createWall();}
		walls.sort();
		
		animalNum = game.rnd.integerInRange(4, 10);
		for(var i = 0; i < animalNum; i++) {
			createAnimals();
			animal.name = key;
		}
		animals.sort();
		animals.callAll('animations.add', 'animations', 'down',[0, 1, 2, 3], 5, true);
		animals.callAll('animations.add', 'animations', 'left',[4, 5, 6, 7], 5, true);
		animals.callAll('animations.add', 'animations', 'right',[8, 9, 10, 11], 5, true);
		animals.callAll('animations.add', 'animations', 'up',[12, 13, 14, 15], 5, true);
		
		//按钮组
		makeButton('Normal', 620, 80);
		makeButton('Speed up', 620, 120);
	},

	update: function() {
 		game.physics.arcade.collide(animals, walls, collisionHandler);
		walls.sort('x', Phaser.Group.SORT_ASCENDING);
		walls.sort('y', Phaser.Group.SORT_ASCENDING);
		animals.sort('x', Phaser.Group.SORT_ASCENDING);
		animals.sort('y', Phaser.Group.SORT_ASCENDING);
		
//		currentX = animals.x;
//		currentY = animals.y;
//		console.log("currentX" + currentX);
//		console.log("oldX" + oldX);
//			if(currentX > oldX){
//				animals.callAll('animations.play', 'animations', 'right');
//			}else if(currentX < oldX){
//				animals.callAll('animations.play', 'animations', 'left');
//			}else if(currentY > oldY){
//				animals.callAll('animations.play', 'animations', 'down');
//			}else if(currentY < oldY){
//				animals.callAll('animations.play', 'animations', 'up');
//			}
		animals.callAll('animations.play', 'animations', 'down');
	},

	render: function() {
//		game.debug.spriteInfo(animal, 20, 20);
		game.debug.text('Escape Seconds: ' + this.game.time.totalElapsedSeconds().toFixed(3) + ' s', 568, 20);
		game.debug.text('Existing Animal Num: ' +  (animalNum - animalEscapedNum), 568 , 40);
		game.debug.text('Escaped Animal Num: ' + animalEscapedNum, 568 , 60);
	}
}

//functions
function makeButton(name, x, y) {

    var button = game.add.button(x, y, 'button', click, this, 0, 1, 2);
    button.z = 3;
    button.name = name;
    button.scale.set(2, 1.5);
    button.smoothed = false;

    var text = game.add.bitmapText(x, y + 7, 'nokia', name, 16);
    text.x += (button.width / 2) - (text.textWidth / 2);

}

function click(button) {
	if(button.name == "Normal"){
		speed = 64;
		console.log("normal" + speed);
	}
	if(button.name == "Speed up"){
		speed = 128;
		console.log("speed up" + speed);
	}
}        

function collisionHandler(a,w){
//	fx.play('squit');
	console.log("碰到了");
//	a.kill();
//	w.kill();
}

function animalEscaped (animal) {
		animalName = animal.name;
    		animal.kill();
    		fx.play('ping');
    		animalEscapedNum ++;
    		
    		if(animalName == 'animal1'){
    			animalName = "Mouse";
    		}else if(animalName == 'animal2'){
    			animalName = "Bear";
    		}else if(animalName == 'animal3'){
    			animalName = "Bull";
    		}else if(animalName == 'animal4'){
    			animalName = "Dog";
    		}else if(animalName == 'animal5'){
    			animalName = "Duck";
    		}else if(animalName == 'animal6'){
    			animalName = "Sheep";
    		}else if(animalName == 'animal7'){
    			animalName = "Fox";
    		}
    		alert("Escaped Animal Id: " + animalEscapedNum  + "\n" +"Escaped Animal Type: " + animalName + "\n" + "Escaped Time: " + this.game.time.totalElapsedSeconds().toFixed(3) + "s");
	}

function createWall() {
	do {
		var x = game.math.snapTo(game.world.randomX, 32) / 32;
		var y = game.math.snapTo(game.world.randomY, 32) / 32;
		if(y > 18) {
			y = 18;
		}
		if(x > 23){
			x = 24;
		}
		wallIndex = (y * 19) + x;
		console.log('wallIndex:' + wallIndex);
	}
	while (locsWall.indexOf(wallIndex) !== -1){
		locsWall.push(wallIndex);
		wall = walls.create(x * 32, y * 32, 'trees');//, game.rnd.integerInRange(0, 7)
		wall.body.immovable = true;
		game.physics.arcade.enable(wall);
	}
}

function createAnimals() {
	do{
		key = 'animal' + (game.rnd.integerInRange(0, 6) + 1);
		var x = game.math.snapTo(game.world.randomX, 32) / 32;
		var y = game.math.snapTo(game.world.randomY, 32) / 32;
		if(y > 16) {
			y = 16;
		}
		if(x > 22){
			x = 22;
		}
		animalIndex = (y * 19) + x;
	}
//	while (IsInArray(locsWall,animalIndex)){
	while (locsWall.indexOf(animalIndex) !== -1){
//	for(var i=0;i<locsWall.length;i++){
//		if(locsWall.in_array(animalIndex)){
			oldX = x * 32;// 
			oldY = y * 32;// 
			animal = animals.create(oldX, oldY, key, 0);
			animal.scale.setTo(0.66667, 0.666667);
			game.physics.arcade.enable(animal);
//			animal.body.collideWorldBounds = true;
			animal.body.velocity.set(game.rnd.integerInRange(-speed, speed), game.rnd.integerInRange(-speed, speed));
//			game.add.tween(animal).to({ y: animal.y - 100 }, 2000, Phaser.Easing.Elastic.InOut, true, 0, 1000, true);
//			game.add.tween(animal).to({ x: animal.x + 200 }, 4000, Phaser.Easing.Elastic.InOut, true, 0, 1000, true);
			animal.body.bounce.set(1);
			animal.gravity = game.rnd.integerInRange(-20,20);
			animal.checkWorldBounds = true;
			animal.events.onOutOfBounds.add(animalEscaped, this);
//			animal.animations.add('down', [0, 1, 2, 3], 6, true);
//			animal.animations.add('left', [4, 5, 6, 7], 6, true);
//			animal.animations.add('right', [8, 9, 10, 11], 6, true);
//			animal.animations.add('up', [12, 13, 14, 15], 6, true);
//			animal.body.bounce.setTo(1, 1);
//		}
	}
}

function IsInArray(arr,val){  
　　var testStr=','+arr.join(",")+",";  
　　return testStr.indexOf(","+val+",") != -1;  
}  

/**
 *               ii.                                       ;9ABH,          
 *              SA391,              No  Bug!             .r9GG35&G          
 *              &#ii13Gh;                               i3X31i;:,rB1         
 *              iMs,:,i5895,                         .5G91:,:;:s1:8A         
 *               33::::,,;5G5,                     ,58Si,,:::,sHX;iH1        
 *                Sr.,:;rs13BBX35hh11511h5Shhh5S3GAXS:.,,::,,1AG3i,GG        
 *                .G51S511sr;;iiiishS8G89Shsrrsh59S;.,,,,,..5A85Si,h8        
 *               :SB9s:,............................,,,.,,,SASh53h,1G.       
 *            .r18S;..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,....,,.1H315199,rX,       
 *          ;S89s,..,,,,,,,,,,,,,,,,,,,,,,,....,,.......,,,;r1ShS8,;Xi       
 *        i55s:.........,,,,,,,,,,,,,,,,.,,,......,.....,,....r9&5.:X1       
 *       59;.....,.     .,,,,,,,,,,,...        .............,..:1;.:&s       
 *      s8,..;53S5S3s.   .,,,,,,,.,..      i15S5h1:.........,,,..,,:99       
 *      93.:39s:rSGB@A;  ..,,,,.....    .SG3hhh9G&BGi..,,,,,,,,,,,,.,83      
 *      G5.G8  9#@@@@@X. .,,,,,,.....  iA9,.S&B###@@Mr...,,,,,,,,..,.;Xh     
 *      Gs.X8 S@@@@@@@B:..,,,,,,,,,,. rA1 ,A@@@@@@@@@H:........,,,,,,.iX:    
 *     ;9. ,8A#@@@@@@#5,.,,,,,,,,,... 9A. 8@@@@@@@@@@M;    ....,,,,,,,,S8    
 *     X3    iS8XAHH8s.,,,,,,,,,,...,..58hH@@@@@@@@@Hs       ...,,,,,,,:Gs   
 *    r8,        ,,,...,,,,,,,,,,.....  ,h8XABMMHX3r.          .,,,,,,,.rX:  
 *   :9, .    .:,..,:;;;::,.,,,,,..          .,,.               ..,,,,,,.59  
 *  .Si      ,:.i8HBMMMMMB&5,....                    .            .,,,,,.sMr
 *  SS       :: h@@@@@@@@@@#; .                     ...  .         ..,,,,iM5
 *  91  .    ;:.,1&@@@@@@MXs.                            .          .,,:,:&S
 *  hS ....  .:;,,,i3MMS1;..,..... .  .     ...                     ..,:,.99
 *  ,8; ..... .,:,..,8Ms:;,,,...                                     .,::.83
 *   s&: ....  .sS553B@@HX3s;,.    .,;13h.                            .:::&1
 *    SXr  .  ...;s3G99XA&X88Shss11155hi.                             ,;:h&,
 *     iH8:  . ..   ,;iiii;,::,,,,,.                                 .;irHA  
 *      ,8X5;   .     .......                                       ,;iihS8Gi
 *         1831,                                                 .,;irrrrrs&@
 *           ;5A8r.                                            .:;iiiiirrss1H
 *             :X@H3s.......                                .,:;iii;iiiiirsrh
 *              r#h:;,...,,.. .,,:;;;;;:::,...              .:;;;;;;iiiirrss1
 *             ,M8 ..,....,.....,,::::::,,...         .     .,;;;iiiiiirss11h
 *             8B;.,,,,,,,.,.....          .           ..   .:;;;;iirrsss111h
 *            i@5,:::,,,,,,,,.... .                   . .:::;;;;;irrrss111111
 *            9Bi,:,,,,......                        ..r91;;;;;iirrsss1ss1111
 */