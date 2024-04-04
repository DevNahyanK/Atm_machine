#! /usr/bin/env node
import inquirer from "inquirer";
// Bank Balance
let myBalance = 6000;
// Pin
let myPin = 8040;
// Welcome msg
console.log("\n\tWELCOME TO ATM MACHINE.\n");
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "Enter your correct pin code:"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log("Pin is Correct, login Successfully!");
    // console.log(`YOur current account balance is ${myBalance}`)
    let operationsAns = await inquirer.prompt([{
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }]);
    if (operationsAns.operation === "Withdraw Amount") {
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
            console.log(`${amountAns.amount} Your amount Withdraw Successfully`);
            console.log(`Your Remaining Balance is: ${myBalance} `);
        }
    }
    else if (operationsAns.operation === "Check Balance") {
        console.log(`Your Account Balance is ${myBalance}`);
    }
}
else {
    console.log("Your Pin is Incorrect, Try Again!");
}
