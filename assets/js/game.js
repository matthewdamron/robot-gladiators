// Player initial setup
var playerName = window.prompt("What is your rebot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// Enemy initial setup
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// create startGame function
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i <enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
            // call fight function with enemy robot
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(pickedEnemyName);

            // if we're not at the last enemy in the array
            if (i < enemyNames.length -1) {
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
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
  console.log(playerName + " has " + playerMoney + " to spend.");
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVEthe store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

  // use switch to carry out action
  switch (shopOptionPrompt.toLowerCase()) {
    case "refill":
      if (playerMoney >= 7) {
        // refill players health
        window.alert("Refilling player's health by 20 for 7 dollars.");
        // increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
      break;

    case "upgrade":
      if (playerMoney >= 7) {
        // upgrade players attack
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        // increase attack and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney -7;
      }
      else {
        window.alert("You don't have enough money!");
      }
      break;

    // leave store
    case "leave": window.alert("Leaving the store.");

    // do nothing so function will end
    break;

    default: window.alert("You did not pick a valid option. Try again.");

    // call shop() again to force player to pick a valid option
    shop();
    break;
  }
}

// create fight function
var fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
      // ask player if they'd liked to fight or skip
      var promptFight = window.prompt("Would you like FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
  
      // if player picks "skip" confirm and then stop the loop
      if (promptFight.toLowerCase() === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert(playerName + " has decided to skip this fight. Goodbye!");
          // subtract money from playerMoney for skipping
          playerMoney = playerMoney - 10;
          console.log("playerMoney", playerMoney)
          break;
        }
      }
  
      // remove enemy's health by subtracting the amount set in the playerAttack variable
      enemyHealth = enemyHealth - playerAttack;
      console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
  
      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
  
        // award player money for winning
        playerMoney = playerMoney + 20;
  
        // leave while() loop since enemy is dead
        break;
      }
      else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
      }
  
      // remove players's health by subtracting the amount set in the enemyAttack variable
      playerHealth = playerHealth - enemyAttack;
      console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
      );
  
      // check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        // leave while() loop if player is dead
        break;
      }
      else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
      }
    }
}

// start the game when the page loads
startGame();