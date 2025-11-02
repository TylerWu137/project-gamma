/* Local Storage Functions */

/* CREATURES */
// Function: change creature from oldCreature -> newCreature
function changeCreature(oldCreature, newCreature) {
    removeCreature(oldCreature);
    addCreature(newCreature);
}

// Function: remove creature from list
function removeCreature(creature) {
    // get list of creatures and determine index of given creature
    var creatures = JSON.parse(localStorage.getItem("creatures"));
    let index = creatures.findIndex(c => c.name === creature.name);
    // if DNE, return
    if(index == -1) return;
    // remove creature at index
    creatures.splice(index, 1);
    localStorage.setItem("creatures", JSON.stringify(creatures));
}

// Function: add creature to list
function addCreature(creature) {
    // get list of creatures and determine index of given creature
    var creatures = JSON.parse(localStorage.getItem("creatures"));
    let creatureIndex = creatures.findIndex(c => c.name === creature.name);
    // if DNE, return
    if(creatureIndex != -1) return;
    // add creature to end of list
    creatures.push(creature);
    localStorage.setItem("creatures", JSON.stringify(creatures));
}

/* MOVESET */
// Function: change move of creature from oldMove to newMove
function changeMove(creature, oldMove, newMove) {
    removeMove(creature, oldMove);
    addMove(creature, newMove);
}

// Function: removes move from creature
function removeMove(creature, move) {
    // get list of creatures and determine index of given creature
    var creatures = JSON.parse(localStorage.getItem("creatures"));
    let creatureIndex = creatures.findIndex(c => c.name === creature.name);
    // if creature DNE, return
    if(creatureIndex == -1) return;
    // get move from creature's move list (return if DNE)
    let moveIndex = creatures[creatureIndex].moves.indexOf(move);
    if(moveIndex == -1) return;
    // remove move
    creatures[creatureIndex].moves.splice(moveIndex, 1);
    localStorage.setItem("creatures", JSON.stringify(creatures));
}

// Function: adds move to creature
function addMove(creature, move) {
    // get list of creatures and determine index of given creature
    var creatures = JSON.parse(localStorage.getItem("creatures"));
    let creatureIndex = creatures.findIndex(c => c.name === creature.name);
    // if creature DNE, return
    if(creatureIndex == -1) return;
    // get move from creature's move list (return if DNE)
    let moveIndex = creatures[creatureIndex].moves.indexOf(move);
    // if DNE, add move
    if(moveIndex == -1) {
        creatures[creatureIndex].moves.push(move);
        localStorage.setItem("creatures", JSON.stringify(creatures));
    }
}

/* INVENTORY */
// Function: add item to inventory
function addItem(item) {
    // get list of items and determine index of given item
    var inventory = JSON.parse(localStorage.getItem("inventory"));
    let index = inventory.indexOf(item);
    // if DNE, add item
    if(index == -1) {
        inventory.push(item);
        localStorage.setItem("inventory", JSON.stringify(inventory));
    }
}

// Function: remove item from inventory
function removeItem(item) {
    // get list of items and determine index of given item
    var inventory = JSON.parse(localStorage.getItem("inventory"));
    let index = inventory.indexOf(item);
    // if DNE, return
    if(index == -1) return;
    // remove item
    inventory.splice(index, 1);
    localStorage.setItem("creatures", JSON.stringify(creatures));
}

// Function: update current creature user uses to fight
function updateCurrCreature(creature) {
    // get list of creatures and determine index of given creature
    var creatures = JSON.parse(localStorage.getItem("creatures"));
    let index = creatures.findIndex(c => c.name === creature.name);
    // update currCreature
    localStorage.setItem("currCreature", JSON.stringify(creatures[index]));
}

/* TEMPORAL BLOSSOM */
// Function: when user interacts with a Temporal Blossom, update timeStamp (record of everything in localStorage)
function setTimeStamp(lastPage) {
    // Record page of time stamp
    localStorage.setItem("lastPage", lastPage);
    // Copy everything in localStorage into an array
    const timeStamp = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        timeStamp[key] = localStorage.getItem(key);
    }
    // Store array as an item in localStorage
    localStorage.setItem("timeStamp", JSON.stringify(timeStamp));
}

// Function: retrieve timeStamp and reset localStorage when user or all creatures unable to continue
function resetTimeStamp() {
    // Retrieve the backup
    const timeStamp = JSON.parse(localStorage.getItem("timeStamp"));

    // Restore each key-value pair
    if (timeStamp) {
        localStorage.clear();
        Object.keys(timeStamp).forEach(key => {
            localStorage.setItem(key, timeStamp[key]);
        });
    }

    // Go back to lastPage
    nextPage(localStorage.getItem("lastPage"));
}

// Function: resets all creature's status (able to continue/fight)
function resetAllCreatureStatus() {
    // get list of creatures
    var creatures = JSON.parse(localStorage.getItem("creatures"));
    // reset all creatures' statuses to true
    for(var i = 0; i < creatures.length; i++) {
        creatures[i].status = true;
    }
    // update creatures list
    localStorage.setItem("creatures", JSON.stringify(creatures));
}

// Function: when creature unable to battle -> set status to false
function unsetCreatureStatus(creature) {
    // get list of creatures and determine index of given creature
    var creatures = JSON.parse(localStorage.getItem("creatures"));
    let creatureIndex = creatures.findIndex(c => c.name === creature.name);
    // if DNE, return
    if(creatureIndex == -1) return;
    // set creature's status to false and update list of creatures
    creatures[creatureIndex].status = false;
    localStorage.setItem("creatures", JSON.stringify(creatures));
}

// Function: display all items in localStorage except the timeStamp item
function displayLocalStorage() {
    // return;
    // iterate through localStorage and display content
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if(key == "timeStamp") continue;
        console.log(key + ": " + localStorage.getItem(key));
    }
    console.log("");
}