let question = document.querySelector(".question");
let questionButtons = document.querySelectorAll(".button-questions");
let answersWrapper = document.querySelector(".answers-wrapper");
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let check = document.querySelector(".check");
let displayQuestion = document.querySelector(".question-number");
let questionWrapper = document.querySelectorAll(".question-text");
let qustionTabs = document.querySelectorAll(".button-questions");

let Question1 = document.querySelector("#Question1");
let Question2 = document.querySelector("#Question2");
let Question3 = document.querySelector("#Question3");
let Question4 = document.querySelector("#Question4");

let buttonQuestion1 = document.querySelector("#button-question1");
let buttonQuestion2 = document.querySelector("#button-question2");
let buttonQuestion3 = document.querySelector("#button-question3");
let buttonQuestion4 = document.querySelector("#button-question4");

let popup = document.querySelector(".popup");
let close = document.querySelector(".close");

//Generate questions
MIN = 2;
MAX = 7;

let polje = [];

let j = 1;
let k = 1;
let createButton;

while (j <= 4) {
  let randomNumber = 2 + Math.floor(Math.random() * 7);

  while (k <= randomNumber) {
    createButton = document.createElement("button");
    createButton.innerHTML = `${k}`;
    createButton.classList.add("answerButton");
    createButton.classList.add(`answerButton-div${j}`);
    createButton.value = k;

    if (j == 1) {
      let insert = document.querySelector("#Answers1");
      insert.appendChild(createButton);
    } else if (j == 2) {
      let insert = document.querySelector("#Answers2");
      insert.appendChild(createButton);
    } else if (j == 3) {
      let insert = document.querySelector("#Answers3");
      insert.appendChild(createButton);
    } else if (j == 4) {
      let insert = document.querySelector("#Answers4");
      insert.appendChild(createButton);
    }
    k++;
  }
  k = 1;
  j++;
}

let currentPage = 1;
let globalna;

let allAnswers = document.querySelectorAll(".answerButton");
let maxCheck1 = 1,
  maxCheck2 = 1,
  maxCheck3 = 1,
  maxCheck4 = 1;

let savedAnswers1 = [],
  savedAnswers2 = [],
  savedAnswers3 = [],
  savedAnswers4 = [];

for (const button of allAnswers) {
  button.addEventListener("click", function () {
    if (currentPage == 1) {
      if (button.classList.contains("checkAnswer")) {
        button.classList.remove("checkAnswer");
        maxCheck1--;
        savedAnswers1 = savedAnswers1.filter((item) => item !== button.value);
      } else if (maxCheck1 <= 3) {
        button.classList.add("checkAnswer");
        maxCheck1++;
        savedAnswers1.push(button.value);
      } else {
        alert("You have chosen too many answers.");
      }
    }

    if (currentPage == 2) {
      if (button.classList.contains("checkAnswer")) {
        button.classList.remove("checkAnswer");
        maxCheck2--;
        savedAnswers2 = savedAnswers2.filter((item) => item !== button.value);
      } else if (maxCheck2 <= 4) {
        button.classList.add("checkAnswer");
        maxCheck2++;
        savedAnswers2.push(button.value);
      } else {
        alert("You have chosen too many answers.");
      }
    }

    if (currentPage == 3) {
      if (button.classList.contains("checkAnswer")) {
        button.classList.remove("checkAnswer");
        maxCheck3--;
        savedAnswers3 = savedAnswers3.filter((item) => item !== button.value);
      } else if (maxCheck3 <= 5) {
        button.classList.add("checkAnswer");
        maxCheck3++;
        savedAnswers3.push(button.value);
      } else {
        alert("You have chosen too many answers.");
      }
    }

    if (currentPage == 4) {
      if (button.classList.contains("checkAnswer")) {
        button.classList.remove("checkAnswer");
        maxCheck4--;
        savedAnswers4 = savedAnswers4.filter((item) => item !== button.value);
      } else if (maxCheck4 <= 6) {
        button.classList.add("checkAnswer");
        maxCheck4++;
        savedAnswers4.push(button.value);
      } else {
        alert("You have chosen too many answers.");
      }
    }
  });
}

//Loading page

window.addEventListener("load", () => {
  currentPage = 1;
  previous.style.visibility = "hidden";
});

const previousButton = function (parametar) {
  if (parametar != 1) {
    previous.style.visibility = "visible";
  } else {
    previous.style.visibility = "hidden";
  }
};

//buttons for questions

for (const button of questionButtons) {
  button.addEventListener("click", function () {
    currentPage = button.value;
    previousButton(currentPage);
    nextButton(currentPage);
    checkButton(currentPage);

    questionWrapper.forEach((questions) =>
      questions.classList.remove("active")
    );

    if (button.dataset.target == `#Question${currentPage}`) {
      document.querySelector(button.dataset.target).classList.add("active");
    }

    qustionTabs.forEach((buttonTab) =>
      buttonTab.classList.remove("button-active")
    );

    if (button.dataset.target == `#Question${currentPage}`) {
      button.classList.add("button-active");
    }
  });
}

const nextButton = function (parametar) {
  if (parametar != 4) {
    next.style.visibility = "visible";
  } else {
    next.style.visibility = "hidden";
  }
};

const checkButton = function (parametar) {
  if (parametar != 4) {
    check.style.display = "none";
  } else {
    check.style.display = "block";
  }
};

previous.addEventListener("click", function () {
  currentPage--;
  previousButton(currentPage);
  nextButton(currentPage);
  checkButton(currentPage);
  questionWrapper.forEach((questions) => questions.classList.remove("active"));
  verifyQuestions(currentPage);
});

next.addEventListener("click", function () {
  currentPage++;
  previousButton(currentPage);
  nextButton(currentPage);
  checkButton(currentPage);

  questionWrapper.forEach((questions) => questions.classList.remove("active"));
  verifyQuestions(currentPage);
});

//Next, previous, nav buttons remove

const verifyQuestions = function (currentPage) {
  for (const button of questionButtons) {
    document.querySelector(button.dataset.target).classList.remove("active");

    if (button.value == currentPage) {
      document.querySelector(button.dataset.target).classList.add("active");
    }
  }
  for (const gumbovisastrane of qustionTabs) {
    gumbovisastrane.classList.remove("button-active");
    if (gumbovisastrane.value == currentPage) {
      gumbovisastrane.classList.add("button-active");
    }
  }
};

//popup

check.addEventListener("click", function () {
  if (maxCheck1 >= 2 && maxCheck2 >= 2 && maxCheck3 >= 2 && maxCheck4 >= 2) {
    check.disabled = false;

    popup.style.visibility = "visible";
    document.querySelector(
      ".result-popup1"
    ).innerHTML = ` Question 1: ${savedAnswers1}`;

    document.querySelector(
      ".result-popup2"
    ).innerHTML = ` Question 2: ${savedAnswers2} `;

    document.querySelector(
      ".result-popup3"
    ).innerHTML = `  Question 3: ${savedAnswers3}`;

    document.querySelector(
      ".result-popup4"
    ).innerHTML = `Question 4: ${savedAnswers4} `;

    close.addEventListener("click", function () {
      popup.style.visibility = "hidden";
    });
  } else {
    check.disabled = true;
  }
});
