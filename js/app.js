// Enemies our player must avoid

class Enemy {
  constructor(x, y, speed){

// Variables applied to each of our instances go here,
// we've provided one for you to get started

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 75;
    this.height = 100;

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

  update(dt) {
    this.x += this.speed * dt;
    if (this.x >= 499) {
      this.x = 10;
    };
  };

// Draw the enemies to the screen

  render(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

// Check for collision between the player and enemies

  if (player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.height + player.y > this.y) {

// Restart the game when a collision does happen

        player.y = 400;
        player.x = 200;

      }
  };

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;

    this.sprite ='images/char-boy.png'
  };

// Draw the player on the screen

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

// Move the player based on user keyboard input

  handleInput(directionInput) {
    switch(directionInput) {
    case "left": this.update(this.x -= 70);
    break;

    case "right": this.update(this.x += 70);
    break;

    case "up": this.update(this.y -= 70);
    break;

    case "down": this.update(this.y += 70);
    break;
   };


// Checking if the game is won

    if (this.y <= 20)  {
      this.y = -20;

// Stop the enemies

      allEnemies.forEach(function(enemy){
        enemy.speed = 0;
      });

      setTimeout(function () {

// Creating the modal after the game is won

        const modalBackground = document.createElement('div');
        const modal = document.createElement('div');
        const replayBtn = document.createElement('button');

        document.body.appendChild(modalBackground);
        modalBackground.appendChild(modal);
        modal.appendChild(replayBtn);

        replayBtn.textContent = "Replay"

        modalBackground.className = "modal-background";
        modal.className = "modal";
        replayBtn.className = "replay-btn"

// Adding event listener for the replay button

        replayBtn.addEventListener("click", function() {
          window.location.reload();
        });

      }, 1000);
    }
};

  update() {

// Contain player movement within the game board;

    if (this.x <= 10) {
      this.x = -10;
    }

    if (this.y >= 400) {
      this.y = 400;
    }

    if (this.x >= 410) {
      this.x = 410;
    }

  };

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player(200, 400);

const enemyOne = new Enemy(10, 60, 130);
const enemyTwo = new Enemy(200, 144, 80);
const enemyThree = new Enemy(300, 230, 70);
const enemyFour = new Enemy(300, 60, 90);
const enemyfive  = new Enemy(50, 230, 160);

const allEnemies =[enemyOne, enemyTwo, enemyThree, enemyFour, enemyfive];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // Prevent user input after the game is won;

    if (player.y <= 20) {
      allowedKeys = {};
    }

    player.handleInput(allowedKeys[e.keyCode]);
});
