// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin slot machine
// 5. Check if user won
// 6. Give user winnings/ take their loss
// 7. Play again

const prompt = require("prompt-sync")();
// definine rows, columns, symbols
// declaring these as global variables, declare globals at top - easy to see
// all imports at top, then globals, then functions
// typical to make global consts in all caps
const ROWS = 3;
const COLS = 3;
// snake case convention for all caps
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8,
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2,
}


// 1. Deposit some money
const deposit = () => {
    // Put this in infinite loop, loop forever
    // ask user until give us number amount
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositAmount = parseFloat(depositAmount);
        // default returned as strong, we need to convert to number
        // Convert to floating point (like parseInt for intergers)
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

// 2. Determine number of lines to bet on
const getNumberOfLines =() => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ")
        const numberOfLines = parseFloat(lines);
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
};

// 3. Collect a bet amount
// balance as parameter, use to determine max bet
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the total bet per line: ")
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again.");
        } else {
            return numberBet;
        }
    }
}

// 4.1 Spin slot machine
const spin = () => {
    // how many symbols we have
    // even though empty, still a const, can manipulate whats inside, without changing ref to array
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    // create 3 nested arrays, arrays inside arrays
    // each array reps a column
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        // removes symbols already used
        const reelSymbols = [...symbols];
        for (let j =0; j < ROWS; j++){
            // math.random take number between 0 and 1, multiply by max amount of symbols
            // math.floor round down to lowest whole number, stop us from giving us out of array
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1); // remove one element
        }
    }
    return reels;
};

// 4.2 Transpose slot machine
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}

// 5. Check if user won
const printRows = (rows) => {
    for(const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

// 6. Give user winnings/ take their loss
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row ++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            // loop through symbol, if all same as first 
            // if not break out of for loop
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
};

// starting balance based on deposit amount, will change based on their amount win/ lose
// let so can adjust variable
let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const reels = spin();
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows, bet, numberOfLines);
console.log("You won, $" + winnings.toString());
