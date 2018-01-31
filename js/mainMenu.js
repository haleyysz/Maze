/**************************************************************
 * MENU
 *************************************************************/

var mainMenu = function(game) {}

mainMenu.prototype = {
	init: function() {
		if(this.game.isDebug) {
			this.time.advancedTiming = true;
		} else {
			this.time.advancedTiming = false;
		}
	},

	create: function() {
		this.game.allAudios.play('menu');
		var bg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg');
		bg.anchor.setTo(0.5);

		var title = game.add.text(this.game.world.centerX, this.game.world.centerY - 160, "Animal Maze", {
			font: "74px Arial Black",
			fill: "#c51b7d"
		});
		title.stroke = "#de77ae";
		title.anchor.setTo(0.5, 0.5);
		title.strokeThickness = 16;
		title.setShadow(2, 2, "#333333", 2, true, true);

		var author = game.add.text(this.game.world.centerX - 140, this.game.world.centerY + 280	, "- Author: Shizheng Yang -", {
			font: "20px Arial Black",
			fill: "#c51b7d"
		});
		title.stroke = "#de77ae";
		title.anchor.setTo(0.5, 0.5);
		title.strokeThickness = 16;
		title.setShadow(2, 2, "#333333", 2, true, true);
		
//		addText(this.game, this.game.world.centerX,
//			this.game.world.height - 30, "Author: Shizheng Yang", "14px Arial");

		var btn_start = this.game.add.sprite(this.game.world.centerX,
			this.game.world.centerY + 20, 'defaultRes', 'btn_start.png');

		btn_start.anchor.set(0.5);
		btn_start.inputEnabled = true;
		btn_start.events.onInputDown.add(this.startGame, this);
	},

	startGame: function() {
		this.state.start('Begin');
//		this.game.allAudios.stop();
	},

	render: function() {
		if(this.game.isDebug) {
			this.game.debug.text("FPS:" + this.game.time.fps, 10, 20, "#ffffff");
		}
	}
}