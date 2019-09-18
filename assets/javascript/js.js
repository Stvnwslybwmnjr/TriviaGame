$(document).ready(function () {

// ===============QUESTIONS=======================================

let questionsArr = [
    {
        q: "Hemmingway's Old Man and the Sea is set in what nation?",
        a: "Cuba",
        choices: ["USA", "Greenland", "Cuba", "Spain"]
    },
    {
        q: "Dante's 8th circle of Hell had thieves, liars,  magicians and who?",
        a: "Politicians",
        choices: ["Politicians", "Murderers", "Tax-collectors", "Teachers"]
    },
    {
        q: "How many shillings did Sherlock Holmes pay for what His Stradivarius violin?",
        a: "55",
        choices: ["120", "55", "70", "90"]
    },
    {
        q: "Which great Russia Author first achieved literary acclaim in his twenties with his semi-autobiographical trilogy, Childhood, Boyhood, and Youth (1852–1856)",
        a: "Tolstoy",
        choices: ["Dostoevsky", "Pushkin", "Tolstoy", "Solzhenitsyn"]
    }
 
]

// =======================Variables====================================

let counter = 10;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// ==================== Display Q&A's=================================

function displayQuestion() {
    counter = 10;
    timer = setInterval(countDown, 1000);

    // looks up questions and possible answers
    var question = questionsArr[currentQuestion].q;
    console.log(question)
    var choices = questionsArr[currentQuestion].choices;
    console.log(choices)

    // Displays Q&A's on DOM 
    $("#clock").html("Time Left: " + counter);
    $("#game").html(`<h3> ${question} </h3>
        ${displayChoices(choices)}
    `);
    

}

// creates buttons for each possible answer
function displayChoices(choices) {
    let possibleanswer = "";

    for (let i = 0; i < choices.length; i++) {
        possibleanswer += `<p class="btn choices" data-answer="${choices[i]}">${choices[i]}</p>`
    
    }
    console.log(possibleanswer);
    return possibleanswer;
}

function changeQuestion() {
   var outOfQuestions = (questionsArr.length - 1) === currentQuestion;
    
    if(outOfQuestions){
        alert("Game Over!");
        displayScore();
        
    } else {
        currentQuestion++;
        displayQuestion();
    }
}

// ============ Timer ============================
function timeUp() {
    clearInterval(timer)
    
    lost++;
}

function countDown() {
    counter--;

    $("#clock").html('Time Left: ' + counter);

    if (counter < 6) {
        $("#clock").css("color", "red");

        if (counter == 0) {
            timeUp();
            changeQuestion();
    
        }
    }
}


// ======================== Answer Inputs ============================

$("#game").on("click", ".choices", function(){
    console.log("buttons work")
    
    var userguess = $(this).attr('data-answer');
    console.log(userguess)
    var rightAnswer = questionsArr[currentQuestion].a;

    console.log(questionsArr[currentQuestion].a);
    
    if(userguess == rightAnswer) {
        score++;
        console.log("right" + score);
        changeQuestion();
    } else {
        lost++;
        console.log("wrong" + lost++);
        changeQuestion();
    }

})

// =================== Display Score ===========================

function displayScore() {
   
    $("#game").html(`<p>You answered ${score} questions out of ${questionsArr.length} correctly</p>`);
}

displayQuestion();
});
