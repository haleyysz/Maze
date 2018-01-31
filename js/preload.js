function addText(game, x, y, content, font, otherGroup){
    var newText = game.add.text(x, y, content,{
        font: font,
        fill: "#ffffff",
        align: "center"
    }, otherGroup);
    
    newText.anchor.setTo(0.5, 0.5);

    return newText;
}

var preload = function(game){}

preload.prototype = {
    preload: function(){
    	
		var bg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg');
        bg.anchor.setTo(0.5);
        
        // this add Text if come from addText()
//      addText(this.game, this.game.world.centerX, 
//          this.game.world.centerY - 160, "Farm Maze", "80px Arial");
            
//		    var title = game.add.text(this.game.world.centerX, this.game.world.centerY - 160, "Farm Maze", { font: "74px Arial Black", fill: "#c51b7d" });
//		    title.stroke = "#de77ae";
//		    title.anchor.setTo(0.5, 0.5);
//		    title.strokeThickness = 16;

        this.loadProcess = addText(this.game, 
            this.game.world.centerX, 
            this.game.world.centerY + 40, 
            "Loading 0%","14px Arial");
        
//      addText(this.game, 
//          this.game.world.centerX, 
//          this.game.world.height-30, 
//          "Author: Shizheng Yang","14px Arial");


        var preloadbarBorder = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbarBorder');
        preloadbarBorder.anchor.setTo(0.5);

        this.preloadbar = this.add.sprite(this.game.world.centerX - 83.5, this.game.world.centerY, 'preloadbar');
        this.preloadbar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.preloadbar);

        this.load.onLoadComplete.add(this.loadComplete, this);
        

        // load audio resource
        this.game.load.audiosprite(this.game.customConfig.audioSprite.key,
            this.game.customConfig.audioSprite.urls,
            this.game.customConfig.audioSprite.atlasURL);
        
        this.game.load.atlasJSONArray(this.game.customConfig.imageSprite.key,
            this.game.customConfig.imageSprite.textureURL,
            this.game.customConfig.imageSprite.atlasURL);
    },

    loadUpdate: function(){
        this.loadProcess.setText("Loading " + this.load.progress + "%");
    },

    loadComplete: function(){
        this.ready = true;
    },

    create: function(){
        this.game.allAudios = this.game.add.audioSprite('defaultRes_audio');
        this.game.allAudios.allowMultiple = true;
        this.game.state.start('Main');
    },
}