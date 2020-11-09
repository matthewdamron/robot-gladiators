// Player initial setup
var playerName = window.prompt("What is your rebot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
// console.log("Player Stats: " + "Name-" + playerName, "Attack-" + playerAttack, "Health-" + playerHealth, "Money-" + playerMoney);

// Enemy initial setup
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// console.log("Player Stats: " + "Name-" + enemyName, "Attack-" + enemyAttack, "Health-" + enemyHealth);

// create function
var fight = function(enemyName) {
    // Alert players that they are starting the round
    // window.alert("Welcome to Robot Gladiators!");

    // repeat and execute as long as the enemy-robot is alive
    while(enemyHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // check to see if the player wants to fight or not
        if (promptFight.toLowerCase() === "fight") {
            // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable.
            enemyHealth = enemyHealth - playerAttack;

            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            // Log a resulting message to the console so we know that it worked.
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

            // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable.
            playerHealth = playerHealth - enemyAttack;

            // Log a resulting message to the console so we know that it worked.
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        }
        else if (promptFight.toLowerCase() === "skip") {
            // confim player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to skip?")

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 2;
            }
            else {
                fight()
            }
        }
        else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }
}

for(var i = 0; i <enemyNames.length; i++) {
    // call fight function with enemy robot
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}

// execute function
// fight();