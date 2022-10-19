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

//The BudgetProposal class contains four properties (sectors) with a string that represents a sum of money.  I used strings so I can use commas to better keep track of the costs.

class BudgetProposal{
    constructor(infrastructure = '10,000,000', education = '10,000,000', lawEnforcement = '10,000,000', emergencyServices = '10,000,000'){
        this.infrastructure = infrastructure;
        this.education = education;
        this.lawEnforcement = lawEnforcement;
        this.emergencyServices = emergencyServices;
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
            total += Money.toInt(this[sector]);
        }
        return total;
    }
    /**
     * breakdown returns the budget as an easily read string
     */
    get breakdown(){
        let breakdown = 'Budget Proposal:\n';
        for(let sector in this){
            breakdown+=sector + ': ' + this[sector] + '\n';
        }
        breakdown += 'Total: ' + this.total;
        return breakdown;
    }
}

//a class for formatting strings to numbers and numbers to strings with monetary formatting
class Money{
    static toInt(string){
        let output = string.replace('$','');
        return Number(output.replaceAll(',',''));
    }
    static toString(int){
        const array = int.toString().split('');
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