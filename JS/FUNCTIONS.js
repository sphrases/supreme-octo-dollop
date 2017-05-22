function createWeapon(object, bullets, graphic, bulletSpeed, fireRate, angleVar, soundFunction, extraFunction) {

    object = game.add.weapon(bullets, graphic);
    object.bulletSpeed = bulletSpeed;
    object.fireRate = fireRate;
    object.bulletAngleVariance = angleVar;
    object.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    object.bulletAngleOffset = 0;
    object.fireAngle = 0;
    object.trackSprite(playerChar, 93, 41);
    object.onFire.add(function e() {
        soundFunction.play()
    });

    if (extraFunction != undefined) {
        object.extraFunction;
    }
    weapons.push(object);

}

function collisionHandler(bullet, enemy) {
    enemyHit.play();
    bullet.kill();
    enemy.kill();

}

function moveWorld(game) {
    wall1.tilePosition.x -= 0.25 * velocityVector;
    wall2.tilePosition.x -= 0.5 * velocityVector;
    wall3.tilePosition.x -= 2 * velocityVector;
    wall4.tilePosition.x -= 2 * velocityVector;
    enemies.forEachAlive(function (enemy) {
        enemy.position.x -= 2 * velocityVector + 2;

    });
}


function spawnEnemy() {
    var current_time = game.time.time;
    if (current_time - last_spawn_time > time_til_spawn) {
        time_til_spawn = Math.random() * 3000 + 2000;
        last_spawn_time = current_time;

        enemy_height = Math.random() * 500 + 100;

        var enemy = enemies.create(game.world.width, enemy_height, 'invader');
        enemy.anchor.setTo(0.5, 0.5);
        enemy.rotation = 90;
        //enemy.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        //enemy.play('fly');
        enemy.body.moves = false;

        enemies.add(enemy);
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

    }  else {
        playerChar.play('right');
    }


}

function weaponSwitch(number) {
    if (number != undefined) {
        currentWeaponID = number - 1;
        guns.frame = number - 1;
    }
}

function fireWeapon(currentWeapon) {
    currentWeapon.fire();
}

function readInput() {
    var button;
    if (key.isDown(Phaser.Keyboard.SPACEBAR)) {
        fireWeapon(weapons[currentWeaponID]);
        button = "space";

    }


    game.input.keyboard.onDownCallback = function () {
        var tmp = game.input.keyboard.event.keyCode - 48;

        if (tmp < weapons.length + 1 && tmp > 0) {
            weaponSwitch(tmp);

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
    console.log(velocityVector);

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
    }
}

function playerBlink() {
    blinkTimer = game.time.create(false);
    blinkTimer.loop(100, blinkAnim, this);
    blinkTimer.start();
}

function blinkAnim() {


    blinkBool = !blinkBool;
    playerChar.alpha = blinkBool;
    blinkCounter++;

    if(blinkCounter > 9) {
        blinkTimer.stop();
        blinkCounter = 0;
    }

}




