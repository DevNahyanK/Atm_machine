#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Bank Balance
let myBalance = 15000;
("$");
// Pin
let myPin = 8040;
// Welcome message
console.log(chalk.yellow("\n\tWELCOME TO DevNahyanK ATM MACHINE.\n"));
// Enter pin
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.blueBright("Enter your correct pin code:"),
    },
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is Correct, login Successfully!\n"));
    // user to select (withdraw or check balance)
    let operationsAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.blueBright("Select an operation:"),
            choices: ["Withdraw Amount", "Check Balance"],
        },
    ]);
    // If the user selects Withdraw
    if (operationsAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Plz Select a withdraw method:",
                choices: ["Fast Cash", "Enter Amount"],
            },
        ]);
        // If the user selects Fast cash
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 10000, 15000, 20000, 50000],
                },
            ]);
            // If the user have not enough balance
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.green(`${fastCashAns.fastCash}$ Wiithdraw Successfully`));
                console.log(`Your Remaining Balance is: ${myBalance}$`);
            }
        }
        // If the user selects Enter Amount
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:",
                },
            ]);
            if (amountAns.amount > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                // Withdraw the Amount
                myBalance -= amountAns.amount;
                console.log(chalk.green(`${amountAns.amount} Your amount Withdraw Successfully`));
                console.log(chalk.yellow(`Your Remaining Balance is: ${myBalance}$ `));
            }
        }
    }
    // If user select check balance
    else if (operationsAns.operation === "Check Balance") {
        console.log(chalk.green(`Your Account Balance is ${myBalance}$`));
    }
}
//If pin is inncorrect
else {
    console.log(chalk.red("Your Pin is Incorrect, Try Again!"));
}
