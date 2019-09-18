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

let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// ==================== Display Q&A's=================================

function displayQuestion() {
    
    // looks up questions and possible answers
    var question = questionsArr[currentQuestion].q;
    console.log(question)
    var choices = questionsArr[currentQuestion].choices;
    console.log(choices)

    // Displays Q&A's on DOM 
    $("#clock").html("time Left: " + counter);
    $("#game").html(`<h3> ${question} </h3>
        ${displayChoices(choices)}
    `);
    

}

// creates buttons for each possible answer
function displayChoices(choices) {
    let result = "";

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`
    
    }
    console.log(result);
    return result;
}



displayQuestion();
});