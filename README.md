**MI 2 Project 2017**
running link: [https://sphrases.github.io/supreme-octo-dollop](https://sphrases.github.io/supreme-octo-dollop)


**Useful code snippets:**

**Create weapon function**
example in the playState.js and playStateFunction.js.

*receives parameters:* 
 object - the object of the weapon
 
 bullets - Number of bullets that can exist at the same time
 
 bulletGraphic - phaser `game.load.image` spritesheet for the bullet

 weaponSprite - phaser `game.load.image` spritesheet for the weapon 
 
 bulletSpeed - speed of the bullets

 fireRate - bullets per time  

 angleVar - variance in the bullets angle (spray)
 
 soundFunction - phaser game.load.audio object for the fire sound
 
 extraFunction - if you want to attach some extra function that should be executed on fire


*usage:*
	

    //create the weapon example:m put this in the create function
    createWeapon(weapon5, 40, 'heart', 'deagle', 1000, 100, 0, enemyHit);
    
    //set active weapon to 'var', put this in the create function
    currentWeapon = weapons[currentWeaponID];
    
    //check collision for every weapon, put this in the update loop
    weapons.forEach(  
	    function e(x) {  
            game.physics.arcade.overlap(x.bullets, enemies, collisionHandler, null, this)  
        });

*create weapon function:*

    function createWeapon(object, bullets, bulletGraphic, weaponSprite, bulletSpeed, fireRate, angleVar, soundFunction, extraFunction) {  
    	 //__*new* Weapon creation_________  
    	 //create local weapon sprite  var weapon = game.add.sprite(26, 16, weaponSprite);  
    	 //attach animation  
         weapon.animations.add('shoot', [0, 1, 2, 0], 15, false);  

 
	     //set anchor to the cente  
	     weapon.anchor.setTo(0.5, 0.5);  
     
	     //set scale of the weapon(and bullets)  
	     weapon.scale.setTo(0.4 * scalingFactor, 0.4 * scalingFactor);  
     
	     //sets weapon invisible  
	     weapon.visible = false;  
	     
	     //attach weapon to player position  
	     playerChar.addChild(weapon);  
	     //_______________________________  
      
	    //Old weapon creation 
	    //assign weapon to global var([object] parameter) 
	    //using [bullets](number of bullets) and [bulletGraphic](spritesheet)  
	    object = game.add.weapon(bullets, bulletGraphic);  
      
	    //speed of bullets [bulletSpeed]  
	    object.bulletSpeed = bulletSpeed;  
     
	    //firerate [fireRate]  
	    object.fireRate = fireRate;  
      
	    //angle variance in Shots [angleVar]  
	    object.bulletAngleVariance = angleVar;  
      
	    //kill bullets on world Border contact  
	    object.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;  
      
	    //set angle ofset to 0  
	    object.bulletAngleOffset = 0;  
      
	    //set fire angle to 0  
	    object.fireAngle = 0;  
      
	    //attack weapon object to players position  
	    object.trackSprite(playerChar, 93, 41);  
      
	    //add onfire function to weapon  
	    object.onFire.add(function e() {  
        //play shot sound  
	    soundFunction.play();  
      
	    //play shoot animation  
		    weapon.play('shoot');  
	    });  
      
	    //add some extra functions  
	    if (extraFunction != undefined) {  
		    object.extraFunction;  
	    }  
        
        //push object to weapons array  
	    weapons.push(object);  
	    
      
    }

> Written with [StackEdit](https://stackedit.io/).
