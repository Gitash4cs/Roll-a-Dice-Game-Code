/*
        SCS2208 Rapid Application Development 
                    Assignment - I
                M.R.M.Ashfak - 20000162
*/


let images = ["./Dice_Images/dice_1.png",
    "./Dice_Images/dice_2.png",
    "./Dice_Images/dice_3.png",
    "./Dice_Images/dice_4.png",
    "./Dice_Images/dice_5.png",
    "./Dice_Images/dice_6.png"];

//select all ID value of img tags
let dice = document.querySelectorAll("img");

//for get total score of each player
var score = [0, 0];
//for name each player
let activePlayer = 0;
let flag = 0;

function roll(){

    //after win the game start new game again
    //flag = 1 mean player already won the game
    if(flag == 1){
        init();
    }
    //call this function for active cuttent player
    currentPlayer();

    //every dice should shake when click 'roll the dice' button
    dice.forEach(function(die){
        die.classList.add("shake");
    });

    

    //setTimeout method do stop the dices shake after 1 second
    setTimeout(function(){
        dice.forEach(function(die){
            die.classList.remove("shake");
        });

        //randomly assign a values 0 to 5
        let dis_1 = Math.floor(Math.random()*6) + 1;
        let dis_2 = Math.floor(Math.random()*6) + 1;

        /*select ID (die1 and die2) and change those ID's image src
        value by image array element given index by random value*/
        document.querySelector("#die1").setAttribute("src",images[dis_1 - 1]);
        document.querySelector("#die2").setAttribute("src",images[dis_2 - 1]);
        
        //If both dices give the value 1, respective player will be reduced to score 0. 
        if((dis_1 == 1) && (dis_2 == 1)){
            document.querySelector("#score").innerHTML = "Oops.. Score redused" ;
            score[activePlayer] = 0;
            document.querySelector('#score_' + activePlayer).textContent = '0';
            changePlayer();
        }
        //same player will get another chance to roll the dice
        else if(dis_1 == dis_2){
            document.querySelector("#score").innerHTML = "Free chance! Roll Score = " + (dis_1 + dis_2 );
            score[activePlayer] += (dis_1 + dis_2 );
            document.querySelector('#score_' + activePlayer).textContent = score[activePlayer];
            checkWinner();
        }
        else{
            //display both dice scores per palayer
            document.querySelector("#score").innerHTML = "Roll Score = " + (dis_1 + dis_2 );
            score[activePlayer] += (dis_1 + dis_2 );
            document.querySelector('#score_' + activePlayer).textContent = score[activePlayer];
            checkWinner();
            changePlayer();
        }

    },
    1000    //1 second = 1000 milliseconds.
    );
}


//function for change the next player
function changePlayer(){
    
    if (activePlayer == 0){
        activePlayer = 1;
    }
    else{
        activePlayer = 0;
    }
}


//function for highlight current player
function currentPlayer(){
    
    if (activePlayer == 0){
        //active player 1 and remove active from player 2
        document.querySelector('#name_0').classList.add('active');
        document.querySelector('#name_1').classList.remove('active');
    }
    else{
        //active player 2 and remove active from player 1
        document.querySelector('#name_1').classList.add('active');
        document.querySelector('#name_0').classList.remove('active');
    }
}


//function for check who is winner and display it
function checkWinner(){
    if(score[activePlayer] >= 100){
        document.querySelector('#name_' + activePlayer).textContent = 'Winner!';
        document.querySelector('#rollBtn').textContent = 'ROLL FOR REPLAY';
        flag = 1;
    }
}


//function for initializes the game
function init(){
    score = [0, 0];
    activePlayer = 0;
    flag = 0;
    document.querySelector('#name_0').textContent = 'PLAYER 1';
    document.querySelector('#name_1').textContent = 'PLAYER 2';
    document.querySelector('#rollBtn').textContent = 'ROLL THE DICE';
    document.querySelector('#score_0').textContent = score[0];
    document.querySelector('#score_1').textContent = score[1];
}