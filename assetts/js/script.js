var timerEL = $('#timer');
var questionsEL = $('#questions');
var rootEL = $('.card');



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
        options:["Data Order Model", "Document Object Model", "Document Order Model"]
        answer: 1
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        choice: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: 3 
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
]

