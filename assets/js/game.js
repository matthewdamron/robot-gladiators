// function to generate a random numeric value
var randomNumber = function(min, max) {
  var vaule = Math.floor(Math.random() * (max - min + 1) + min);

  // return the random number value
  return vaule;
}

// function to set name
var getPlayerName = function() {
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name + "!");
  return name;
}

// Player initial setup, reset, refill, upgrade
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
}

// Enemy initial setup
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
]

// create startGame function
var startGame = function() {
  // debugger;
  // reset player stats
  playerInfo.reset();

  for(var i = 0; i <enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
      // call fight function with enemy robot
      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health = randomNumber(40, 60);
      fight(pickedEnemyObj);

      // if we're not at the last enemy in the array
      if (i < enemyInfo.length -1) {
        shop();
      }
    }
    else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
  }
  // end game
  endGame();
}

// create endGame function
var endGame = function() {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
      window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
      window.alert("You've lost your robot in battle.");
  }
  
  // ask if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
      // restart the game
      startGame();
  }
  else {
      window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
}

// create shop function
var shop = function() {
  console.log(playerInfo.name + " has " + playerInfo.money + " to spend.");
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: '1'-REFILL, '2'-UPGRADE, or '3'-LEAVE to make a choice.");

  // conver shopOptionPrompt to integer
  shopOptionPrompt = parseInt(shopOptionPrompt);

  // use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;

    case 2:
      playerInfo.upgradeAttack();
      break;

    // leave store
    case 3: window.alert("Leaving the store.");

    // do nothing so function will end
    break;

    default: window.alert("You did not pick a valid option. Try again.");

    // call shop() again to force player to pick a valid option
    shop();
    break;
  }
}

// fight or skip function
var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip function
  var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Enter the conditional recursive function call here!
  if (!promptFight) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  else {
    promptFight = promptFight.toLowerCase();
  }

  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = playerInfo.money - 10;
      return true;
    }
  }
  if (promptFight != "fight")
  {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip()
  }
  return false;
}

// create fight function
var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }
  
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd liked to fight or skip
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      // remove enemy's health by subtracting the random amount of playerInfo.attack variable
      var playerDamage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - playerDamage);
      console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      }
      else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
    }
    else {
      // remove players's health by subtracting the random amount of enemy.attack variable
      var enemyDamage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - enemyDamage);
      console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      }
      else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
}

// start the game when the page loads
startGame();