/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      ✅ 1. Calculate the score as the total of the number of correct answers

      ✅ 2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      ✅ 3. Add 2 more questions to the app (each question must have 4 options).

      ✅ 4. Reload the page when the reset button is clicked (hint: search window.location)

      ✅ 5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
    countDown();
  });
  //console.log(start);

  ////Task 2 - Submit Button - on line 31 - refresh is under task 4
  const submitButton = document.getElementById("btnSubmit");

  const scoreSpan = document.getElementById("score");

  ////Task 3 - Add 2 more questions
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia?",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "In a website browser address bar, what does “www” stand for?",
      o: [
        "World Wide Web",
        "World War Worms",
        "World Wide Whales",
        "World Wide Webs made by Spiders",
      ],
      a: 0,
    },
    {
      q: "What is the tiny piece at the end of a shoelace called?",
      o: ["aggregate", "aguillette", "An aglet", "The end of shoelace"],
      a: 2,
    },
  ];
  //console.log(quizArray);

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };
  //console.log(quizDisplay);

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);

        //// Task 1
        if (radioElement.checked) {
          if (quizItem.a == i) {
            score++;
            ////Task 2 - change background color of li element here
            liElement.style.backGroundColor = "green";
          } else {
            liElement.style.backGroundColor = "red";
          }
        }
      }
    });
    scoreSpan.innerHTML = `Your Score is ${score}/5`;
    //console.log(score);
  };

  ////Task 4 - Refresh Button of whole page
  const refreshButton = document.getElementById("btnReset");
  const refreshPage = () => {
    location.reload();
  };

  //// Task 5 - Countdown Timer
  const countDown = () => {
    let seconds = 60; ////starting @ 60 sec - can change value
    let timer = setInterval(theTimer, 1000); ////timer is going to create an interval every sec going to call theTimer
    function theTimer() {
      document.getElementById("time").innerHTML = `${seconds} seconds`; ////this will change the h2 in HTML page
      seconds--; ////this will decrement the secs by 1
      if (seconds === -1) {
        //// if get to -1 AKA 0, it will reset the timer, calculate the score (relates to the changing colours) and pop up will apear to say times up
        clearInterval(timer);
        calculateScore();
        alert(`Times up - ⏲`);
      }
    }
  };

  submitButton.addEventListener("click", () => calculateScore());
  refreshButton.addEventListener("click", () => refreshPage());

  // call the displayQuiz function
  displayQuiz();
});
