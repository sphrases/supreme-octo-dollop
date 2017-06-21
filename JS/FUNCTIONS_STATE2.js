function createWeapon(object, bullets, bulletGraphic, weaponSprite,  bulletSpeed, fireRate, angleVar, soundFunction, extraFunction) {

    var weapon = game.add.sprite(26, 16, weaponSprite);
    weapon.animations.add('shoot', [0, 1, 2, 0], 15, false);
    //weapony.trackSprite(playerChar, 93, 41);
    weapon.anchor.setTo(0.5, 0.5);
    weapon.scale.setTo(0.4*scalingFactor, 0.4*scalingFactor);
    weapon.visible = false;
    playerChar.addChild(weapon);

    object = game.add.weapon(bullets, bulletGraphic);
    object.bulletSpeed = bulletSpeed;
    object.fireRate = fireRate;
    object.bulletAngleVariance = angleVar;
    object.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    object.bulletAngleOffset = 0;
    object.fireAngle = 0;
    object.trackSprite(playerChar, 93, 41);
    object.onFire.add(function e() {
        soundFunction.play()
        weapon.play('shoot');

    });

    if (extraFunction != undefined) {
        object.extraFunction;
    }
    weapons.push(object);
    weaponSpriteGroup.push(weapon);

}

function collisionHandler(bullet, enemy) {
    enemyHit.play();
    score += 10;
    bullet.kill();
    enemy.kill();

}

function moveWorld(game) {
    wall1.tilePosition.x -= 0.25 * velocityVector;
    wall2.tilePosition.x -= 0.5 * velocityVector;
    wall3.tilePosition.x -= 2 * velocityVector;
    wall4.tilePosition.x -= 2 * velocityVector;
    weaponDropGroup.forEachAlive(function (weapon) {
        weapon.position.x -= 2 * velocityVector + 1;

    });
    enemies.forEachAlive(function (enemy) {
        enemy.position.x -= 2 * velocityVector + 2;

    });
    groundlings.forEachAlive(function (g) {
        g.position.x -= 2 * velocityVector;

    });
}

function spawnEnemy() {
    var current_time = game.time.time;
    if (current_time - last_spawn_time > time_til_spawn) {
        time_til_spawn = (Math.random() * 3000 + 2000) - velocityVector ;
        last_spawn_time = current_time ;

        enemy_height = Math.random() * 400 + 200;

        var enemy = enemies.create(game.world.width, enemy_height, 'enemy1');
        enemy.anchor.setTo(0.5, 0.5);
        enemy.rotation = 0;
        enemy.scale.setTo(1.6, 1.6);
        enemy.animations.add('move', [0, 1, 2, 3], 8, true);
        enemy.play('move');
        enemy.body.moves = false;

        enemies.add(enemy);
    }
}

function spawnGroundling() {
    var current_time = game.time.time;
    if (current_time - last_spawn_time_g > time_til_spawn_g) {
        time_til_spawn_g = (Math.random() * 20000 + 8000) - velocityVector ;
        last_spawn_time_g = current_time ;

        groundling_height = 587;

        var textureRandomizer = Math.random() * 5 + 1;

        if (textureRandomizer < 3) {
            var groundling = groundlings.create(game.world.width, groundling_height, 'spikes');
        }   else {
            var groundling = groundlings.create(game.world.width, groundling_height, 'spikes2');
        }



        groundling.anchor.setTo(0.5, 0.5);
        groundling.rotation = 0;
        groundling.scale.setTo(1.6, 1.6);
        groundling.animations.add('move', [0, 1, 2, 3], 8, true);
        groundling.play('move');
        groundling.body.moves = false;

        groundlings.add(groundling);
    }
}

function jump() {
    if (playerChar.body.touching.down) {
        jumps = 0;
    }
    if (jumppressed && !jumpwaspressed) {
        if (jumps <= 1) {

            playerChar.body.velocity.y = -400;
            //playJumpSound.play();

        }
        jumps++;
    }

}

function playAnimations() {

    if (!playerChar.body.touching.down) {
        playerChar.play('jump');

    } else {
        playerChar.play('right');
    }


}

function weaponSwitch(number) {
    if (number != undefined && (ownedWeapons[number - 1] == 1)) {
        currentWeaponID = number - 1;

        guns.frame = number - 1;
        //currentWeaponSprite = weaponSpriteGroup[number];
        //currentWeaponSprite.visible = true;

    }
}

function fireWeapon(currentWeapon, currentWeaponSprite) {
    currentWeapon.fire();
    currentWeaponSprite.play('shoot');


    //TODO add animations!
}

function readInput() {
    var button;
    if (key.isDown(Phaser.Keyboard.SPACEBAR)) {
        fireWeapon(weapons[currentWeaponID], weaponSpriteGroup[currentWeaponID]);
        button = "space";

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
            button = "space";

        }
        if (game.input.activePointer.x > 500 || jumpVar) {
            jump();
            shootVar = false;
            button = "UP";
        }
    }


    if (cursors.up.isDown) {
        jump();
        button = "UP";

    }
    if (cursors.down.isDown) {
        button = "DOWN";

    }
    if (cursors.left.isDown) {
        button = "LEFT";

    }
    if (cursors.right.isDown) {
        button = "RIGHT";

    }

    return button;
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
    velocityVector += 0.1;
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

function hitPlayer() {

    liveChanged = true;

    if (liveChanged && !liveWasChanged) {
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

function shootMan()  {

    fireWeapon(weapons[currentWeaponID], weaponSpriteGroup[currentWeaponID]);

}

function jumpMan() {

    jumppressed = true;
    jump();

}


