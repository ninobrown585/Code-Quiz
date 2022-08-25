var timerEL = $('#timer');
var questionsEL = $('#questions');
var rootEL = $('.card');

var questionNumber = 0;

var chosen = [
    {
        question:"What is the Definition of HTML?",
        options: ['How To Mix Languages', "High Tech Markup List", "Hyper Text Markup Language"],
        answer: 2
    },
    {
        question:"Where is the javascript external script located",
        options: ["in the CSS", "In the HTML header", "The bottom of the HTML"],
        answer: 2
    },
    {
        question:"What does the DOM stand for",
        options:["Data Order Model", "Document Object Model", "Document Order Model"],
        answer: 1
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        choice: ["numbers and strings", "other arrays", "all of the above"],
        answer: 2
    },
  
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice: ["JavaScript", "for loops", "console.log"],
        answer: 2
    },
  
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        choice: ["commas", "curly brackets", "quotes",],
        answer: 2 
    }
]

$('#generate').on('click', function(){
    
    $('h3').hide();
    startQuestions();
    function startQuestions(){
        // if(questionNumber < chosen.length){
            for(i=0; i<chosen.length; i++){
                var ranQuestion = Math.floor(Math.random()*(chosen.length));
                $(questionsEL).text(chosen[ranQuestion].question);
                $(".answer-1").text(chosen[ranQuestion].choice[0]);
                $(".answer-2").text(chosen[ranQuestion].choice[1]);
                $(".answer-3").text(chosen[ranQuestion].choice[2]);



            }
           
        }
    // }

});