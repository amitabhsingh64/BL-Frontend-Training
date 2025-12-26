/*//easy input
let username

username = window.prompt("What is your username");
console.log(username);
*/

/*
//input through textbox
let username;
document.getElementById("my_btn").onclick = function(){
    username = document.getElementById("name").value;
    document.getElementById("wlc").textContent = `welcome ${username}`;
}
*/
/*
// type conversion
let age = window.prompt("age");
age=Number(age)
console.log(age+1)*/

/*
// Counter program 
const decreaseBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset");
const increaseBtn = document.getElementById("increase");
const countLabel = document.getElementById("count_label");

let count=0;

increaseBtn.onclick = function(){
    count++;
    countLabel.textContent = count;
}

decreaseBtn.onclick = function(){
    count--;
    countLabel.textContent = count;
}

resetBtn.onclick = function(){
    count=0;
    countLabel.textContent = count;
}

*/

//random number generator
/*
let randomNum = Math.rand();
*/
//ternary operator (compact if-else)
// condition? codeIfTruce: codeIfFalse;
/*
x=1
x>5?console.log("True"):console.log("False");
*/

//Switch statements
/*
let day = "b"
switch(day){
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("Saturday");
        break;
    case 7:
        console.log("Sunday");
        break;
    default:
        console.log(`${day} is invalid`)

}
*/

//String methods
//check notion

//method chaining
//let userName = window.prompt("Enter your Username");
//---- No Method Chaining ----

/*
userName = userName.trim();

let letter = userName.charAt(0);
letter=letter.toUpperCase();

let extraletters = userName.slice(1);
extraletters = extraletters.toLowerCase();
userName = letter + extraletters;
console.log(userName);
*/
/*
//--- Method chaining ---
userName = userName.trim().charAt(0).toUpperCase(); + userName.trim().slice(1).toLowerCase();
*/

//Logical operators = used to combine or manipulate boolean values(true or false)

// And = &&
// OR = ||
// Not = !

//Number guessing game
/*
const minNum = 1;
const maxNum = 100;
const answer = Math.floor(Math.random() * (maxNum-minNum+1)) + minNum;

let attempts = 0;
let guess;
let running=true;
let count=0;

while(running){
    guess=window.prompt(`Guess a number between ${minNum} and ${maxNum} in max 10 attempts`);
    guess=Number(guess);
    count++;
    if(guess==answer){
        window.alert("nice one!")
        running=false;
    }
    if(count>10){
        break;
    }
}

window.alert("you failed!");
*/

//Functions
/*
function happyBirthday(userName){
    let counter=0;
    while(true){
        console.log(`Happy Birthday ${userName} ${counter}`);
        counter++;
        if(counter>10){
            break;
        }
    }
}
happyBirthday("Amitabh");
*/

//temperature conversion program

const textbox = document.getElementById("textbox");
const toFahrenheit = document.getElementById("toFahrenheit");
const toCelsius = document.getElementById("toCelsius");
const result = document.getElementById("result");
let temp;


function convert(){
    if(toFahrenheit.checked){
        //result.textContent = "selected to Fahrenheit";
        temp = Number(textbox.value);
        temp = temp * 9 / 5 + 32;
        result.textContent = temp.toFixed(1) + "°F";
    }else if(toCelsius.checked){
        //result.textContent = "selected to Celsius";
        temp = Number(textbox.value);
        temp = (temp-32) * (5 /9);
        result.textContent = temp + "°C";
    }else{
        result.textContent = "select a unit!!";
    }
}