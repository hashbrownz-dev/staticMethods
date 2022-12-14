//Add a Governor Class

class Governor{
    constructor(name){
        this.name = name;
    }
    static enactLaw(law){
        console.log(law + ' is to be enforced effective immediately!');
    }
    static addressPublic(){
        console.log("Time to shake some hands and kiss some babies, but I'm all out of babies...");
    }
    /**
     * approveBudget takes a budget object, adds the values of each sector, and compares the total to annualTaxRevenue.  If the total spending is less than or equal to the annualTaxRevenue, approveBudget will return an approval message as a string, otherwise it will return a rejection message as a string
     * @param {Object} budget an object containing sectors and their budget for the year
     * @return {string} A string containing either an approval message or a rejection message
     */
     static approveBudget(budget){
        return budget.total <= annualTaxRevenue ? "This budget proposal has received approval." : "This budget proposal has been rejected.";
    }
}

//Test enactLaw
Governor.enactLaw('The No Burritos After Midnight Law');
//Test addressPublic
Governor.addressPublic();

class Person{
    constructor(name, gender, age){
        this.name = name;
        this.gender = gender;
        this.age = age;
    }
    greet(other){
        let message = 'Hello';
        if(other){
            message += ` ${other}`;
        }
        console.log(message + '! My name is ' +this.name+ '!  I am ' + this.age + ' years old.  It is nice to meet you!');
    }
    eat(food){
        let message = "Nom nom nom!";
        if(food){
            message += ' This ' + food + ' is delicious!';
        }
        console.log(message);
    }
    sleep(){
        console.log('ZZZzzzZZZzzz...');
    }
}

class PostalWorker extends Person{
    deliverMail(){
        console.log('The mail was delivered!');
    }
    drive(){
        console.log('Vrooooooom!');
    }
    lickStamps(){
        console.log('These envelopes are making me thirsty!');
    }
}

class Chef extends Person{
    cook(food){
        if(food){
            console.log(`I make the best ${food} this side of the Mississippi!`);
        } else {
            console.log('Everything here starts in a box and ends in a microwave...');
        }
    }
    spitInFood(){
        console.log('I hope they like extra seasoning...');
    }
    evictPatron(){
        console.log('Get out of my restaurant!  No soup for you!!!');
    }
}

// const pepe = new Person('PePe', 'M', 28);
// pepe.greet();
// pepe.eat('chicken');
// pepe.sleep();

// const phil = new PostalWorker('Phil Lamarr', 'M', '30');
// phil.energyLevel = 'Over 9000';
// phil.greet();
// phil.eat('boogers');
// //phil doesn't sleep...

// const mo = new PostalWorker('Mo Collins', 'F', '28');
// mo.greet();
// //no one has ever seen mo eat...
// mo.sleep();

// const gordon = new Chef('Gordon Ramsay', 'M', 55);
// const giada = new Chef('Giada De Laurentiis', 'F', 52);

// gordon.greet();
// gordon.cook('Idiot Sandwich');
// gordon.evictPatron();

// giada.greet();
// giada.forehead = 'Really big';
// giada.cook();
// giada.spitInFood();

//EXXXTRA

//a class for formatting strings to numbers and numbers to strings with monetary formatting
class Money{
    static toInt(string){
        let output = string.replace('$','');
        return Number(output.replaceAll(',',''));
    }
    static toString(int){
        //split our integer into an array 1234 -> '1234' -> ['1','2','3','4']
        const array = int.toString().split('');
        //divide our array into chunks ['1','2','3','4'] -> [['1'],['2','3','4']]
        const triplets = [];
        while(array.length > 3){
            triplets.unshift(array.splice(array.length-3,3));
        }
        //initialize our output string
        let output = "$";
        //Add the remaining digits in array.
        output += array.join('');
        //join each triplet into a single string and append them to our output
        for(let i = 0; i < triplets.length; i++){
            output += ',' + triplets[i].join('');
        }
        return output;
    }
}

//STREEEEEEEETCH

class BankAccount {
    constructor(ownerName, balance){
        this.ownerName = ownerName;
        this.balance = Number.isInteger(balance) ? balance : Money.toInt(balance);
        this.accountNumber = BankAccount.generateAccountNumber();
    }
    static generateAccountNumber(){
        const accountNumber = [];
        for(let i = 0; i < 9; i++){
            accountNumber.push(Math.floor(Math.random() * 10));
        }
        return Number(accountNumber.join(''));
    }
    deposit(amount){
        this.balance += amount;
    }
    withdraw(amount){
        this.balance -= amount;
    }
    get getBalance(){
        return `Name: ${this.ownerName} Balance: ${Money.toString(this.balance)} Account Number: ${this.accountNumber}`;    //We'll change this after we finish the Money Class
    }
}

class CheckingAccount extends BankAccount{
    withdraw(amount){
        if(amount > this.balance && !this.overdraftEnabled){
            console.log('Insufficient Funds!');
        } else {
            this.balance -= amount;
        }
    }
}
CheckingAccount.prototype.overdraftEnabled = false;

class SavingsAccount extends BankAccount{
    withdraw(amount){
        console.log('Withdrawals are not permitted on this account!');
    }
}

//Create a new Checking Account
const jimsChecking = new CheckingAccount('Jim Henson', 5000);
//Log Account Info and Balance
console.log(jimsChecking.getBalance);
//Withdraw 40 Dollars
jimsChecking.withdraw(40);
//Log Updated Account Info and Balance
console.log(jimsChecking.getBalance)
//Attempt to overdraw account with overdraftEnabled set to false
jimsChecking.withdraw(5000);
//Attempt to overdraw account with overdraftEnabled set to true
jimsChecking.overdraftEnabled = true;
jimsChecking.withdraw(5000);
//Log Updated Account Info and Balance
console.log(jimsChecking.getBalance);

//Create a new Savings Account
const patsChecking = new SavingsAccount('Patricia Benatar', 80);
//Log Account Info and Balance
console.log(patsChecking.getBalance);
//Attempt to withdraw 40 Dollars
patsChecking.withdraw(40);

//The BudgetProposal class contains four properties (sectors) with a string that represents a sum of money.  I used strings so I can use commas to better keep track of the costs.

class BudgetProposal{
    constructor(infrastructure = '10,000,000', education = '10,000,000', lawEnforcement = '10,000,000', emergencyServices = '10,000,000'){
        this.infrastructure = Money.toInt(infrastructure);
        this.education = Money.toInt(education);
        this.lawEnforcement = Money.toInt(lawEnforcement);
        this.emergencyServices = Money.toInt(emergencyServices);
    }
    /**
     * total returns the budget total as an integer
     * @return {Number} the budget total as an integer
     */
    get total(){
        let total = 0;
        for(let sector in this){
            //Each properties value is a string, with commas.  The following code removes any commas from the string and converts it to a number before adding it to the total.
            //total += Number(this[sector].replaceAll(',',''));
            total += this[sector];
        }
        return total;
    }
    /**
     * breakdown returns the budget as an easily read string
     */
    get breakdown(){
        let breakdown = 'Budget Proposal:\n';
        for(let sector in this){
            breakdown+=sector + ': ' + Money.toString(this[sector]) + '\n';
        }
        breakdown += 'Total: ' + Money.toString(this.total);
        return breakdown;
    }
}

const annualTaxRevenue = 40000000;

const budgetProposalOne = new BudgetProposal('20,000,000','1,000,000','30,000,000','2,000,000');
const budgetProposals = [
    budgetProposalOne,
    new BudgetProposal('10,000,000','15,000,000','7,500,000','7,500,000'),
    new BudgetProposal(), //create a budget proposal with default values,
    new BudgetProposal('1,000,000','500,000','38,000,000','500,000')
]

//Test these Budgets
for(let proposal of budgetProposals){
    console.log(proposal.breakdown);
    console.log(Governor.approveBudget(proposal));
}
