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

//Draw the enemies to the screen

  render(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

// Check for collision between the player and enemies

  if (player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.height + player.y > this.y) {

// Restart the game when a collision does happen

        window.location.reload();

      }
  };

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
