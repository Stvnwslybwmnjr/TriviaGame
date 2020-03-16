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

// ================= MEDIA =======================================

    var happygifs = [
        './assets/images/hooray.gif',
        './assets/images/mushroomyay.gif',
        './assets/images/Oprah.gif',
        './assets/images/yay.gif',
        './assets/images/correct.gif',
    ];

    var sadgifs = [
        './assets/images/cringe.gif',
        './assets/images/monkeybutt.gif',
        './assets/images/oopsbear.gif',
        './assets/images/slapape.gif',
        './assets/images/wrong.gif',

    ];

    let applause = new Audio('./assets/audio/applause.mp3');
    let foghorn = new Audio('./assets/audio/foghorn.mp3');

    // =======================Variables====================================

    let counter = 30;
    let currentQuestion = 0;
    let score = 0;
    let timer;

    // ==================== Display Q&A's=================================

    function displayQuestion() {
        counter = 30;
        timer = setInterval(countDown, 1000);

        // looks up questions and possible answers
        var question = questionsArr[currentQuestion].q;
        console.log(question)
        var choices = questionsArr[currentQuestion].choices;
        console.log(choices)

        // Displays Q&A's on DOM 
        $("#clock").html("Time Left: " + counter);
        $("#game").html(`
        <h3> ${question} </h3>
        ${displayChoices(choices)}
        <p class="mt-3">You are on question ${currentQuestion + 1} of ${questionsArr.length}</p>
    `
        );


    }
    

// =====================ANSWER BUTTONS==============================

    function displayChoices(choices) {
        let possibleanswer = "";

        for (let i = 0; i < choices.length; i++) {
            possibleanswer += `<p class="btn choices mt-3" data-answer="${choices[i]}">${choices[i]}</p>`

        }
        console.log(possibleanswer);
        return possibleanswer;
    }

    function changeQuestion() {
        var outOfQuestions = (questionsArr.length - 1) === currentQuestion;

        $("#clock").css("color", "black");

        if (outOfQuestions) {
            
            displayScore();

        } else {
            currentQuestion++;
            displayQuestion();
        }
    }

    // ================ Display Gif=======================

    function selectgif(gifs) {
        var random = Math.floor(Math.random() * gifs.length);
        var randomGif = gifs[random];
        return randomGif
    }

    function displayGif(result) {
        var correctAnswer = questionsArr[currentQuestion].a;

        if (result === "win") {
            $("#game").html(`
            <p class="preload-image mt-3">Correct Answer!</p>
            <img class="gify" src="${selectgif(happygifs)}"/>
            `);
        } else {
            $("#game").html(`
            
            <p class="preload-image mt-3">Incorrect Answer!</p>
            <p class="preload-image mt-3">The answer was ${correctAnswer}</p>
            <img class="gify" src="${selectgif(sadgifs)}"/>
        `)
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

    $("#game").on("click", ".choices", function () {
        console.log("buttons work")

        clearInterval(timer);

        var userguess = $(this).attr('data-answer');
        console.log(userguess)
        var rightAnswer = questionsArr[currentQuestion].a;

        console.log(questionsArr[currentQuestion].a);

        if (userguess == rightAnswer) {
            score++;
            console.log("right" + score);
            displayGif('win');
            foghorn.play();
            setTimeout(changeQuestion, 5 * 1000);
        } else {
            console.log("wrong" + lost++);
            displayGif("lose");
            foghorn.play();
            setTimeout(changeQuestion, 5 * 1000);
        }

    })

    // =================== Display Score ===========================

    function displayScore() {

        var endgame = `
   <p class="mt-3">You answered ${score} questions out of ${questionsArr.length} correctly</p>
   <button class="btn start btn-lg mt-3" id="reset">Play Again</button>
   `

        $("#game").html(endgame);
    }

    // ================== Reset Game ================================

    $("#game").on("click", "#reset", function () {
        // alert("clicked!")
        counter = 10;
        currentQuestion = 0;
        score = 0;
        displayQuestion();
    })

    // ========================= Start Button =======================

    $('#start').click(function () {
        $('#start').remove();
        $('#time').html; (counter);
        displayQuestion();
    })
});
