function collisionHandler(bullet, enemy) {
    enemyHit.play();
    bullet.kill();
    enemy.kill();

}

function moveWorld(game) {
    wall1.tilePosition.x -= 0.25;
    wall2.tilePosition.x -= 0.5;
    wall3.tilePosition.x -= 1;
    wall4.tilePosition.x -= 2;

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
        console.log("enemy spawned!");
        enemies.add(enemy);
    }
}

function moveEnemies() {
    enemies.forEachAlive(function (enemy) {
        enemy.position.x -= 2

    });
}

function jump() {
    if (playerChar.body.touching.down) {
        jumps = 0;
    }
    if (jumppressed && !jumpwaspressed) {
        if (jumps <= 1) {
            console.log("Jumped!");
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
    if (number != undefined) {
        currentWeaponID = number - 1;
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
    if (key.isDown(Phaser.Keyboard.ONE)) {
        weaponSwitch(1);
        button = "Q";

    }
    if (key.isDown(Phaser.Keyboard.TWO)) {
        weaponSwitch(2);
        button = "W";

    }
    if (key.isDown(Phaser.Keyboard.THREE)) {
        weaponSwitch(3);
        button = "W";

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


