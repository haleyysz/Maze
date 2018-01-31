var start = function(game){}

var wall;
var walls;
var flower;
var animal;
var animals;
var cursors;

var wallNum = 0;
var flowerNum = 0;
var animalNum = 0;

start.prototype = {
	preload : function(){
		game.load.image('wall','assets/images/wall.png')
		game.load.spritesheet('flower','assets/images/flower.png', 20, 20, 4);
		game.load.spritesheet('animal1','assets/images/pikachu.png', 48, 48 ,16);
		game.load.spritesheet('animal2','assets/images/bear.png', 48, 48 ,16);
		game.load.spritesheet('animal3','assets/images/bull.png', 48, 48 ,16);
		game.load.spritesheet('animal4','assets/images/dog.png', 48, 48 ,16);
		game.load.spritesheet('animal5','assets/images/duck.png', 48, 48 ,16);
		game.load.spritesheet('animal6','assets/images/sheep.png', 48, 48 ,16);
		game.load.spritesheet('animal7','assets/images/fox.png', 48, 48 ,16);
	},

	create : function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.tileSprite(0, 0, game.width, game.height, 'ground');
   			
		for(var i=0;i<100;i++){
			createFlowers();
		}
		
		for(var i=0;i<100;i++){
			createWall();
		}
		
		for(var i=0;i<10;i++){
			createAnimals();
		}
		
	},
	
	update : function(){
		//碰撞检测
		game.physics.arcade.collide(animals, walls);
		
   		if(cursors.up.isDown){
   			animal.body.velocity.y = -200;
   			animal.animations.play('up');
   		}else if(cursors.down.isDown){
   			animal.body.velocity.y = 200;
   			animal.animations.play('down');
   		}
   		if(cursors.left.isDown){
   			animal.body.velocity.x = -200;
   			animal.animations.play('left');
   		}else if(cursors.right.isDown){
   			animal.body.velocity.x = 200;
   			animal.animations.play('right');
   		}
	},
	
	render : function() {
   		game.debug.text('Escape seconds: ' + this.game.time.totalElapsedSeconds().toFixed(3) + ' s', 16, 20);
	}
}

//functions
 function createWall(){
	 		walls = game.add.group();
	 		walls.enableBody = true;
	   		walls.physicsBodyType = Phaser.Physics.ARCADE;
 			var x = game.rnd.integerInRange(0,game.width - 32);
	   		var y = game.rnd.integerInRange(0,game.height - 64);
			wall = walls.create(x, y, 'wall');
			wallNum ++;
 }

 function createFlowers(){
	 		var x = game.rnd.integerInRange(0,game.width - 20);
	   		var y = game.rnd.integerInRange(0,game.height - 20);
			flower = game.add.sprite(x, y, 'flower');
			flower.animations.add('swing', [0,1,2,3], 6, true);
			flower.animations.play('swing');
			flowerNum ++;
	}
 
 function createAnimals(){
	 		animals = game.add.group();
	 		animals.enableBody = true;
	   		animals.physicsBodyType = Phaser.Physics.ARCADE;
	   		animals.setAll('inputEnabled', true);
//	   		animals.callAll('events.onInputDown.add', 'events.onInputDown', removeCoin);

 			var animalIndex = game.rnd.integerInRange(0,6);
 			var key = 'animal' + (animalIndex+1);
   			var x = game.rnd.integerInRange(0,game.width - 48);
   			var y = game.rnd.integerInRange(0,game.height - 48);
 			console.log(key, x, y);
 			animal = animals.getFirstExists(false, true, x, y, key);
 			animal = game.add.sprite(x, y, key);
 			animal.animations.add('down', [0, 1, 2, 3], 6, true);
			animal.animations.add('left', [4, 5, 6, 7], 6, true);
			animal.animations.add('right', [8, 9, 10, 11], 6, true);
			animal.animations.add('up', [12, 13, 14, 15], 6, true);
    			
    			cursors = game.input.keyboard.createCursorKeys();
    			
			animalNum ++;
			
			
// 			game.physics.arcade.enable(animal);
// 			pikachu = game.add.sprite(Math.random()*952, Math.random()*652, 'pikachu');
//			game.physics.arcade.enable(pikachu);
//			pikachu.body.collideWorldBounds = true;
//			pikachu.animations.add('down', [0, 1, 2, 3], 10, true);
//			pikachu.animations.add('left', [4, 5, 6, 7], 10, true);
//			pikachu.animations.add('right', [8, 9, 10, 11], 10, true);
//			pikachu.animations.add('up', [12, 13, 14, 15], 10, true);
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