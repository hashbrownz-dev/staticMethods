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

const pepe = new Person('PePe', 'M', 28);
pepe.greet();
pepe.eat('chicken');
pepe.sleep();

const phil = new PostalWorker('Phil Lamarr', 'M', '30');
phil.energyLevel = 'Over 9000';
phil.greet();
phil.eat('boogers');
//phil doesn't sleep...

const mo = new PostalWorker('Mo Collins', 'F', '28');
mo.greet();
//no one has ever seen mo eat...
mo.sleep();

const gordon = new Chef('Gordon Ramsay', 'M', 55);
const giada = new Chef('Giada De Laurentiis', 'F', 52);

gordon.greet();
gordon.cook('Idiot Sandwich');
gordon.evictPatron();

giada.greet();
giada.forehead = 'Really big';
giada.cook();
giada.spitInFood();