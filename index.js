#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Bank Balance
let myBalance = 15000;
// Pin
let myPin = 8040;
// Welcome msg
console.log(chalk.yellow("\n\tWELCOME TO ATM MACHINE.\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.blueBright("Enter your correct pin code:")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is Correct, login Successfully!\n"));
    // console.log(`YOur current account balance is ${myBalance}`)
    let operationsAns = await inquirer.prompt([{
            name: "operation",
            type: "list",
            message: chalk.blueBright("Select an operation:"),
            choices: ["Withdraw Amount", "Check Balance"]
        }]);
    if (operationsAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Plz Select a withdraw method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 10000, 15000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.green(`${fastCashAns.fastCash} Wiithdraw Successfully`));
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([{
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }]);
            if (amountAns.amount > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.green(`${amountAns.amount} Your amount Withdraw Successfully`));
                console.log(chalk.yellow(`Your Remaining Balance is: ${myBalance} `));
            }
        }
    }
    else if (operationsAns.operation === "Check Balance") {
        console.log(chalk.green(`Your Account Balance is ${myBalance}`));
    }
}
else {
    console.log(chalk.red("Your Pin is Incorrect, Try Again!"));
}
