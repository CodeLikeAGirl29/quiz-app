//array of objects with questions and answers
let scoreCount = 0;
let counter = 0;
let displayCounter = counter + 1;

const QUIZ = [
// question one
{ 
  question: "How many teeth does an adult dog have?",
  answers: [
  "42",
  "24",
  "30",
  "55"
  ],
  correctAnswerString: "42",
},
// question two
{ 
  question: "What is a dog's most highly developed sense?",
  answers: [
  "Hearing",
  "Sight", 
  "Smell", 
  "Touch"
  ],
  correctAnswerString: "Smell",
},
//question three
{ 
  question: "What is the scientific name for a dog",
  answers: [
  "Canis lupus familiaris",
  "Felis catus",
  "Panther pardus",
  "Canis" 
  ],
  correctAnswerString: "Canis lupus familiaris",
},
//question four
{ question: "What is the oldest known dog breed in the world?",
  answers: [
  "Chow Chow",
  "Saint Bernard",
  "Basenji",
  "Great Dane"
  ],
  correctAnswerString: "Basenji",
},
// question five
{ question: "What medium-sized working dog is easily recognised by its thick fur and piercing blue eyes, looks almost like a wolf, is famous for pulling sleds in wintry conditions and is very similar looking to the Alaskan Malamute?",
  answers: [
  "Siberian Husky",
  "Irish Wolfhound",
  "Akita",
  "Cane Corso"
  ],
  correctAnswerString: "Siberian Husky",
},
//question six
{ question: "How many breeds of the domesticated dog exist in the world?",
  answers: [
  "Around 150",
  "Around 200",
  "Around 450",
  "Around 125"
  ],
  correctAnswerString: "Around 450",
},
//question seven
{ question: "Which common physical characteristic does the Chow share with giraffes, polar bears, and Jersey cattle?",
  answers: [
  "Black tongue",
  "The fur type",
  "Claws/nails",
  "Teeth"
  ],
  correctAnswerString: "Black tongue",
},
//question eight
{ question: "Which breed of dog is the character Snoopy from Charlie Brown?",
  answers: [
  "Dalmation",
  "Bloodhound",
  "Beagle",
  "Terrier"
  ],
  correctAnswerString: "Beagle",
},
];


//Click on Start Button to set display of .start-page to none, 
//and set .quiz-questions display:none to visible
function startQuiz() {
  $('.start-button').on('click', function(event) {
    console.log('Hide start page and display questions');
    $('#quiz-questions').removeClass("hide-display");
    $('#start-page').addClass("hide-display");
   $('#quiz-nav').removeClass("hide-display");
  });
}

//Generate questions in a form
// pass in the counter variable
// retrieve the question with the index of the counter variable
// display the question
function generateQuestions(counter) {
  if (counter < 10) {
    let currentQuestion = QUIZ[counter];
    let quizHTML = `
      <form>
      <h1 class="question-one">${currentQuestion.question}</h1>
      <fieldset class="options">
        <input type="radio" name="question-option" id="question-option-one" value="${currentQuestion.answers[0]}">
        <label for="question-option-one">${currentQuestion.answers[0]}</label>
        <br><br>
        <input type="radio" name="question-option" id="question-option-two" value="${currentQuestion.answers[1]}">
        <label for="question-option-two">${currentQuestion.answers[1]}</label>
        <br><br>
        <input type="radio" name="question-option" id="question-option-three" value="${currentQuestion.answers[2]}">
        <label for="question-option-three">${currentQuestion.answers[2]}</label>
        <br><br>
        <input type="radio" name="question-option" id="question-option-four" value="${currentQuestion.answers[3]}">
        <label for="question-option-four">${currentQuestion.answers[3]}</label>
      </fieldset>
      </form> 
      <p>Question: ${counter + 1}/10</p>
      <p>Score: ${scoreCount}/10</p>`;
    $('#quiz-questions').html(quizHTML);
  };
}


//press on answer and receive a correct or wrong message
function answerFeedback (counter) {
  if (counter < 10) {
    let correctAnswer = QUIZ[counter].correctAnswerString;
    $('input[type=radio]').click(function(event) {
      $('.options').children('input').attr('disabled', true); 
      let userAnswer = $(this).val();
      if (userAnswer === correctAnswer) {
        scoreCount += 1;
        $('input[type=radio]:checked').next('label').addClass('correct-answer');
        $('#quiz-questions').append(`<p class='correct-answer'>Correct!</p>`);
      } else {
        $('#quiz-questions').append(`<p class='correct-answer'>Wrong! The correct answer is: ${correctAnswer}</p>`)
        $('input[type=radio]:checked').next('label').addClass('wrong-answer');
      }
    });
  }
}


//prevents Next Button from being clicked on if no option is chosen
function preventClickNextButton () {
  $('.next-button').attr('disabled', true);
  $('.options').children('input').on('click', function () {
     if ($(this).prop("checked") === true) {
      $('.next-button').attr('disabled', false);
      }
    });
}

//Click on Next button to go to next question
function nextQuestionButton () {
  preventClickNextButton();
  $('.next-button').click(function(event) {
    console.log('next button clicked');
    counter += 1;
    generateQuestions(counter);
    answerFeedback(counter);
    preventClickNextButton();
    console.log(counter);
  });
}

//Display final results page
// hide the quiz-questions section
// hide the quiz nav section
function finalFeedback() {
  $('.next-button').on('click', function() {
    if (counter === 10) {
      $('#quiz-questions').addClass('hide-display');
      $('#quiz-nav').addClass("hide-display");
      $('.feedback-page').removeClass('hide-display');
      $('.final-score').append(`You got ${scoreCount}/10 questions right!`)
    }
  });
}

//Click on Try Again button to reset the quiz
function tryAgain() {
  $('.try-again-button').on('click', function() {
    document.location.reload();
  });
}


function renderQuiz() {
  startQuiz();
  generateQuestions(counter);
  answerFeedback(counter);
  nextQuestionButton();
  finalFeedback();
  tryAgain();
}

$(renderQuiz);
