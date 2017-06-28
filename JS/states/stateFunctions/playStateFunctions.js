function createWeapon(object, bullets, bulletGraphic, weaponSprite, bulletSpeed, fireRate, angleVar, soundFunction, extraFunction) {

    //__*new* Weapon creation_________
    //c   eate local weapon sprite
    var weapon = game.add.sprite(26, 16, weaponSprite);
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
    // angle variance in Shots [angleVar]
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
    //*new* push weapon to weaponSpriteGroup
    weaponSpriteGroup.push(weapon);

}

//kills enemy on collision with bullet
function collisionHandler(bullet, enemy) {
    enemyHit.play();
    score += 10;
    bullet.kill();
    enemy.kill();

}

//moves world of the game
function moveWorld() {
    wall1.tilePosition.x -= 0.25 * velocityVector;
    wall2.tilePosition.x -= 0.5 * velocityVector;
    wall3.tilePosition.x -= 2 * velocityVector;
    wall4.tilePosition.x -= 2 * velocityVector;
    //move every weapon drop
    weaponDropGroup.forEachAlive(function (weapon) {
        weapon.position.x -= 2 * velocityVector + 1;

    });
    //move every enemy
    enemies.forEachAlive(function (enemy) {
        enemy.position.x -= 2 * velocityVector + 2;

    });
    //move every groundling
    groundlings.forEachAlive(function (g) {
        g.position.x -= 2 * velocityVector;

    });
}

/**
 * spawns an enemy.
 * Checks if time allows to spawn
 * saves new time as random value
 * random value is influenced by veolcity vector
 * so spawn interval gets shorter
 * */
function spawnEnemy() {
    var current_time = game.time.time;
    if (current_time - last_spawn_time > time_til_spawn) {
        time_til_spawn = (Math.random() * 3000 + 1000) - (velocityVector * 100);
        last_spawn_time = current_time;

        enemy_height = Math.random() * 400 + 200;


        var textureRandomizer = Math.random() * 5 + 1;
        //checks which groundling grapic to use
        if (textureRandomizer < 3) {
            var enemy = enemies.create(game.world.width, enemy_height, 'enemy2');
        } else {
            var enemy = enemies.create(game.world.width, enemy_height, 'enemy1');
        }



        enemy.anchor.setTo(0.5, 0.5);
        enemy.rotation = 0;
        enemy.scale.setTo(1.6, 1.6);
        enemy.animations.add('move', [0, 1, 2, 3], 8, true);
        enemy.play('move');
        enemy.body.moves = false;

        enemies.add(enemy);
    }
}

/**
 * spawns groundling the same way an enemy is spawned*/
function spawnGroundling() {
    var current_time = game.time.time;
    if (current_time - last_spawn_time_g > time_til_spawn_g) {
        time_til_spawn_g = (Math.random() * 20000 + 8000) - velocityVector;
        last_spawn_time_g = current_time;
        groundling_height = 587;

        //randomizes graphic of groundling
        var textureRandomizer = Math.random() * 5 + 1;
        //checks which groundling grapic to use
        if (textureRandomizer < 3) {
            var groundling = groundlings.create(game.world.width, groundling_height, 'spikes');
            groundling.scale.setTo(1.6, 1.6);
        } else {
            var groundling = groundlings.create(game.world.width, groundling_height, 'spikes2');
            groundling.scale.setTo(1.8, 1.8);
        }

        groundling.anchor.setTo(0.5, 0.5);
        groundling.rotation = 0;

        groundling.animations.add('move', [0, 1, 2, 3], 8, true);
        groundling.play('move');
        groundling.body.moves = false;

        groundlings.add(groundling);
    }
}

//jumps the player a maximum of 2 times before a ground contact is required
function jump() {
    if (playerChar.body.touching.down) {
        jumps = 0;
    }
    if (jumppressed && !jumpwaspressed) {
        if (jumps <= 1) {
            playerChar.body.velocity.y = -400;
        }
        jumps++;
    }

}

//play repeating animations every update
function playAnimations() {
    if (!playerChar.body.touching.down) {
        playerChar.play('jump');

    } else {
        playerChar.play('right');
    }
}

//switches weapon to a weapon that is owned (ided by number)
function weaponSwitch(number) {
    //only switches is weapon is owned, or number not undefined
    if (number != undefined && (ownedWeapons[number - 1] == 1)) {
        //saves current weapon id
        currentWeaponID = number - 1;
        //changes the frame of the gun which is switched to
        guns.frame = number - 1;
        //*new*
        //currentWeaponSprite = weaponSpriteGroup[number];
        //currentWeaponSprite.visible = true;

    }
}

//fires weapon
function fireWeapon(currentWeapon, currentWeaponSprite) {
    currentWeapon.fire();
    //*new*
    currentWeaponSprite.play('shoot');
    //TODO add animations!
}

function readInput() {
    if (key.isDown(Phaser.Keyboard.SPACEBAR)) {
        fireWeapon(weapons[currentWeaponID], weaponSpriteGroup[currentWeaponID]);
    }
    game.input.keyboard.onDownCallback = function () {
        var tmp = game.input.keyboard.event.keyCode - 48;
        if (tmp < weapons.length + 1 && tmp > 0) {
            weaponSwitch(tmp);
        }
    }
    if (game.input.activePointer.isDown) {
        if (game.input.activePointer.x < 500 || shootVar) {
            fireWeapon(weapons[currentWeaponID], weaponSpriteGroup[currentWeaponID]);
            shootVar = false;

        }
        if (game.input.activePointer.x > 500 || jumpVar) {
            jump();
            shootVar = false;

        }
    }
    if (cursors.up.isDown) {
        jump();

    }
    if (cursors.down.isDown) {}
    if (cursors.left.isDown) {}
    if (cursors.right.isDown) {}
}

function toggleMusic() {
    musicPlaying = !musicPlaying;

    if (!musicPlaying) {
        backgroundMusic.stop();
        musicToggleButton.setFrames(1);

    } else {
        backgroundMusic.play();
        musicToggleButton.setFrames(0);
    }
}

function timerHandler() {
    //changes the global velocity and spawn rates on every execution
    velocityVector += 0.3;
    //console.log(velocityVector);
}

function changeLife(direction) {

    //boolean direction true/false
    if (direction) {
        livesCount + 1;
        lives[livesCount - 1].frame(0);
        liveChanged = true;


    }
    else {
        livesCount -= 1;
        lives[livesCount].frame = 1
        liveChanged = true;
    }

}

//takes live from player on execution, kills him if lives are below threshold
function hitPlayer() {

    liveChanged = true;

    if (liveChanged && !liveWasChanged) {
        //hit but not dead yet
        changeLife(false);
        playerBlink();
    }

    if (livesCount < 1) {
        //kill player Function
        playerChar.kill();
        game.state.start('gameOverState');
    }
}

function playerBlink() {
    blinkTimer = game.time.create(false);
    blinkSound.play();
    blinkTimer.loop(100, blinkAnim, this);
    blinkTimer.start();
}

function blinkAnim() {


    blinkBool = !blinkBool;
    playerChar.alpha = blinkBool;
    blinkCounter++;

    if (blinkCounter > 9) {
        blinkTimer.stop();
        blinkCounter = 0;
    }

}

function spawnWeaponDrop() {
    var dropBox = weaponDropGroup.create(game.world.width, Math.random() * 400 + 200, 'dropBox');
    dropBox.anchor.setTo(0.5, 0.5);
    dropBox.body.moves = false;
    weaponDropGroup.add(dropBox);
    weaponSpawnTimer = Math.floor(Math.random() * (40)) + 10;
}

function dropWeapon() {

    weaponDropped = true;
    if (weaponDropped && !weaponWasDropped) {
        var weaponTemp = Math.floor(Math.random() * (weapons.length - 1)) + 2;
        console.log(weaponTemp);
        ownedWeapons[weaponTemp - 1] = 1;

        weaponSwitch(weaponTemp);
        score += 20;
        weaponBreakTimer = game.time.create(true);
        weaponBreakTimer.loop(Phaser.Timer.SECOND * 8, function e() {
            breakWeapon(weaponTemp)
        }, this);
        weaponBreakTimer.start();
    }
}

function breakWeapon(weaponTemp) {
    weaponBreakTimer.stop();
    console.log("killed " + weaponTemp);
    ownedWeapons[weaponTemp - 1] = 0;
    weaponSwitch(1);

}

function loadMusic() {

}

function addEventListenerButton() {

    document.getElementById('shootButton').addEventListener('onDown', shootMan, false);
    document.getElementById('jumpButton').addEventListener('click', jumpMan, false);

    //$('.jumpButton').click(function e() {jumpMan;});

}

function shootMan() {

    fireWeapon(weapons[currentWeaponID], weaponSpriteGroup[currentWeaponID]);

}

function jumpMan() {

    jumppressed = true;
    jump();

}


function godMode() {

    ownedWeapons = [1, 1, 1, 1, 1];

}

