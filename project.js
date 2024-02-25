// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin slot machine
// 5. Check if user won
// 6. Give user winnings/ take their loss
// 7. Play again

const prompt = require("prompt-sync")();

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

const getNumberOfLines =() => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on: ")
        const numberOfLines = parseFloat(lines);
        // default returned as strong, we need to convert to number
        // Convert to floating point (like parseInt for intergers)
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
};

const depositAmount = deposit();
const numberOfLines = getNumberOfLines();
console.log(depositAmount);