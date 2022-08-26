let quizList = document.querySelector("#quiz-list");
let chosenQuestion = 0;
let secondsLeft = 0;
let time;
let highScores = [];

//object containing all of our questions, possible choices and correct answer
let quizContainer =
  [
    {
      question: "Conditional loop:",
      choice: ["strings", "for", "while", "number"],
      answer: 2 
    },

    {
      question: "The condition in an if / else statement is enclosed within _________.",
      choice: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: 2 
    },

    {
      question: "Definition of DOM?",
      choice: ["numbers and strings", "Document Object Model", "Data Object Model", "all of the above"],
      answer: 1 
    },

    {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choice: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: 3 
    },

    {
      question: "String values must be enclosed within ______ when being assigned to variables.",
      choice: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: 2 
    }
  ];

// event listeners for the buttons
$(document).ready(function () 
{
  $("#startQuizButton").on("click", function () {  
    startQuiz();
  });

  $("#playerInitials").on("click", function () { 
    clearPlayerInitialsTextBox();
  });

  $("#highScoresLink").on("click", function () {  
    showHighScores();
  });

  $("#goBack").on("click", function () {  
    restart();   
  });

  $("#clearHighScores").on("click", function () {  
    clearHighScores();
  });

  $("#initials").on("click", function () {  
    setUserScore();
  });

  bindQuestionButtons();  
  scoreLoaded();  
  setTimer();     
});

//starts the timer and shows the quesions
function startQuiz() {
  $("#startQuiz").addClass("d-none"); //hide
  $("#quizQuestions").removeClass("d-none"); //show
  startTimer();
  chosenQuestion = 0;
  showQuestion();  
}

//loads the highscores from memory 
function scoreLoaded() {
  var highScoresArray = localStorage.getItem("highScores");
  if (highScoresArray) 
  {
    highScores = JSON.parse(highScoresArray);  
  }
  else {
    localStorage.setItem("highScores", JSON.stringify(highScores));  //if not make one and store it to local storage
  }
}

//get the data-index of the button clicked and send it to the checkAnswer function to see if user is right or wrong
function quizListButton(event) {
  var button = event.target;  
  var buttonIndex = $(button).attr("data-index"); 
  buttonIndex = parseInt(buttonIndex, 10); //convert index to int
  checkAnswer(buttonIndex); 
}


function bindQuestionButtons() 
{
  $("#quiz-list button").on("click", function (event) 
  {
    quizListButton(event); //send the object clicked to the quizlist button function
  });
}


function unBindQuestionButtons() 
{
  $("#quiz-list button").off();
}

//when the user clicked inside the initials text box, hide their last answer status
function clearPlayerInitialsTextBox() 
{
  $("#answer").addClass("d-none");
}


function showHighScores() 
{
  $("#header").addClass("d-none");
  $("#startQuiz").addClass("d-none");
  $("#quizQuestions").addClass("d-none");
  $("#quizFinish").addClass("d-none");
  $("#highScores").removeClass("d-none");

    //use the highScores array and create list items to display the results
  $("#highScoresList").empty();
  for (var i = 0; i < highScores.length; i++) 
  {
    var counter = i + 1;
    $("#highScoresList").append("<li>" + counter + ". " + highScores[i].initials + ": " + highScores[i].score + "</li>");
  }
  setTimer();  
}

//write score to local storage and display the scores div
function setUserScore() 
{
  var playerInitials = $("#playerInitials");  
  if (playerInitials.val() !== "") { 
    var score =
    {
      initials: playerInitials.val(),  
      score: secondsLeft
    }

    highScores.push(score);  
    localStorage.setItem("highScores", JSON.stringify(highScores));  //convert to a string and sent to local storage

    playerInitials.val("");  
        showHighScores();  
  }
  else 
  {
    alert("You must enter your initials to record a score.");  //alert the user initials can not be blank to record a score
  }
}

//show only the header, initial quiz page
function restart() 
{
  $("#header").removeClass("d-none");
  $("#startQuiz").removeClass("d-none");
  $("#quizQuestions").addClass("d-none");
  $("#highScores").addClass("d-none");
}

//when user clicks the clear scores button then clear the local array and set it to local storage and clear the UL scores line items
function clearHighScores() 
{
  highScores = [];
  localStorage.setItem("highScores", JSON.stringify(highScores));
  $("#highScoresList").empty();
}

//reset the timer and update display
function setTimer() 
{
  secondsLeft = 0;
  $("#timerValue").html(secondsLeft);
}

//start the timer
function startTimer() 
{
  secondsLeft = 30; 
  time = setInterval(function () 
  {  //every 1 second subtract a second and check if time remainig is 0
    secondsLeft--;
    $("#timerValue").html(secondsLeft);
    if (secondsLeft === 0) 
    {
      stopTimer();
      $("#quizQuestions").addClass("d-none"); 
      $("#quizFinish").removeClass("d-none"); 
      $("#answer").removeClass("d-none");     
      $("#score").html(secondsLeft);
      chosenQuestion = 0;
    }
  }, 1000);
}

//clear the timer
function stopTimer() 
{
  clearInterval(time);
}

//function to render the questions on the screen
function showQuestion() {
  
  if (chosenQuestion !== quizContainer.length)
  {
     
    var question = quizContainer[chosenQuestion].question;
    
    $("#questionContent").html(question);
    $("#answer").addClass("d-none");  

    //array of choices
    var choices = quizContainer[chosenQuestion].choice;
    var buttons = $("#quiz-list button"); 

    for (var i = 0; i < choices.length; i++) 
    {
      var counter = i + 1;
      $(buttons[i]).html(counter + ". " + choices[i]);  //set the text of the button to the corresponding choice
    }
    buttons.prop('disabled', false);  
  }
  else
  {
    stopTimer();
    $("#quizQuestions").addClass("d-none"); 
    $("#quizFinish").removeClass("d-none"); 
    $("#answer").removeClass("d-none");     
    $("#score").html(secondsLeft);
    chosenQuestion = 0;
  }
}

//function to compare user choice to the answer
function checkAnswer(buttonIndex) {
  $("#quiz-list button").prop('disabled', true);
  if (chosenQuestion < quizContainer.length) 
  {
    var answerStatus = $("#answerStatus"); 
    var answer = quizContainer[chosenQuestion].answer; 
    console.log("Question: " + chosenQuestion + ", answer: " + answer + ", buttonIndex: " + buttonIndex);
    if (answer === buttonIndex)  
    {
      answerStatus.html("Correct"); 
    }
    else {
      answerStatus.html("Wrong"); 
      if (secondsLeft >= 10)
      {
        secondsLeft -= 5;  //subtract 5 seconds from the timer.
      }
    }
    $("#answer").removeClass("d-none");  //show the answer section

    chosenQuestion++;
    setTimeout(() => {  
       showQuestion(); 
    }, 1500);
  }
}