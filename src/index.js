const dbQuestions = db.collection("QuestionsAndAnswers");
const add = document.querySelector(".add");
const button = document.querySelector(".btn");
const quizForm = document.querySelector(".quiz-form");
const name = document.getElementById("name");
const resultWrap = document.querySelector(".resultWrap");
const showQuizForm = document.getElementById("showQuizForm");
const setNewQuiz = document.querySelector(".setNewQuiz");
const quizBar = document.querySelector(".quizBar");
const span = document.querySelector(".resultWrap span");
const deleteLastQ = document.querySelector(".deleteLastQ");
const deleteQuiz = document.querySelector(".deleteQuiz");

const formObject = {};
const formQ = [];

// FUNCTIONS
// show msg in render score div
function showEvent(string) {
  span.innerText = string;
  setInterval(() => {
    span.innerText = "";
  }, 2000);
}

// clear active class
function clearActive() {
  document.querySelectorAll(".active").forEach((active) => {
    active.classList.remove("active");
  });
}

// remove elements 
function deleteForms() {
  document.querySelectorAll(".remove").forEach((element) => {
    element.remove();
  });
}

function checkInputs() {
  const inputs = document.querySelectorAll("input[type=text]");
  inputs.forEach((input) => {
    if (input.name === "name" && input.value === "") {
      console.log("Enter name of Quiz.");
    } else if (input.name === "question" && input.value === "") {
      console.log("Enter all questions.");
    } else if (input.name === "answer" && input.value === "") {
      console.log("Enter all answers.");
      return;
    }
  });
}

// UI render quizzes in UL nav bar
function renderNav(data, id) {
  const html = `
  <li class="list-group-item" id="${id}"><button class="deleteQuiz btn btn-danger">x</button> ${data[0][0]["name"]}</li>
  `;
  quizBar.innerHTML += html;
}

// submit forms and save data in database
button.addEventListener("click", (e) => {
  e.preventDefault();
  checkInputs();
  const forms = document.querySelectorAll(".new-question");
  forms.forEach((element) => {
    const question = element.question.value;
    const answers = [element.A.value, element.B.value, element.C.value];
    const rightAnswer = element.rightAnswer.value;
    const form = {
      question,
      answers,
      rightAnswer,
    };
    form.name = name.value;
    formQ.push(form);
  });

  // UI clear form
  formObject[0] = formQ;
  dbQuestions.add(formObject);
  forms.forEach((form) => {
    form.reset();
  });
  // UI delete forms
  deleteForms();
  // UI show successfully added
  showEvent("quiz successfully added");
});

// add question in set quiz form
add.addEventListener("click", (e) => {
  const div = document.createElement("DIV");
  div.classList.add("remove");
  div.innerHTML = `
  <form class="new-question my-3">
      <div class="input-group my-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Your question:</div>
        </div>
        <input type="text" name="question" id="question" class="form-control" required>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">Answare A:</div>
        </div>
        <input type="text" name="answer" id="A" class="form-control" required>
        <div class="input-group-text ml-3">
          <label>
            <input type="radio" name="rightAnswer" value="0" checked>
            <span class="ml-2">This is right answer.</span>
          </label>
        </div>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">Answare B:</div>
        </div>
        <input type="text" name="answer" id="B" class="form-control" required>
        <div class="input-group-text ml-3">
          <label>
            <input type="radio" name="rightAnswer" value="1">
            <span class="ml-2">This is right answer.</span>
          </label>
        </div>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">Answare C:</div>
        </div>
        <input type="text" name="answer" id="C" class="form-control" required>
        <div class="input-group-text ml-3">
          <label>
            <input type="radio" name="rightAnswer" value="2">
            <span class="ml-2">This is right answer.</span>
          </label>
        </div>
      </div>
    </form>
  `;
  document.querySelector(".formWrap form:last-child").append(div);
});

// get data from database -> UI call renderNav to render quizzes in nav bar
dbQuestions.onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderNav(change.doc.data(), change.doc.id);
    }
  });
});

// Add eventListener on LI ->  get data from database -> call renderQuestions UI render selected quiz
quizBar.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    quizForm.innerHTML = `<div class="answerWrap">
    <!-- render questions -->
  </div>
  `;
    dbQuestions
      .doc(e.target.id)
      .get()
      .then((snapshot) => {
        //render selected quiz
        renderQuestions(snapshot.data());
        quizForm.innerHTML += `
      <div class="text-center">
        <input type="submit" class="btn btn-danger submit">
      </div>`;
      });
  }

  clearActive();
  // add class active to selecdet LI
  e.target.classList.add("active");
  // add class active to quizForm
  quizForm.classList.add("active");
});

// render quiz
function renderQuestions(data) {
  const answerWrap = document.querySelector(".answerWrap");
  const object = data[0];
  for (let i = 0; i < object.length; i++) {
    answerWrap.innerHTML += `
  <div class="my-5">
  <p class="lead font-weight-normal">${object[i]["question"]}</p>
  <div class="form-check my-2 text-black-50">
    <label class="form-check-label">
      <input type="radio" name="q${i}" value="0" checked>
      ${object[i]["answers"][0]}
    </label>
  </div>
  <div class="form-check my-2 text-black-50">
    <label class="form-check-label">
      <input type="radio" name="q${i}" value="1">
      ${object[i]["answers"][1]}
    </label>
  </div>
  <div class="form-check my-2 text-black-50">
    <label class="form-check-label">
      <input type="radio" name="q${i}" value="2">
      ${object[i]["answers"][2]}
    </label>
  </div>
  <input type="hidden" class="rightAnswer" name="rightAnswer" value=${object[i]["rightAnswer"]}>
  </div>
    `;
  }
}

// submit quiz and get resoults
quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get right answers
  const arrayOfRightAnswers = [];
  const rightAnswers = document.querySelectorAll(".rightAnswer");
  rightAnswers.forEach((answer) => {
    arrayOfRightAnswers.push(answer.value);
  });

  //get checked answers from form
  const userAnswers = [];
  const checkedAnswers = document.querySelectorAll(
    ".answerWrap input[type='radio']:checked"
  );
  checkedAnswers.forEach((answer) => {
    userAnswers.push(answer.value);
  });

  //get score
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === arrayOfRightAnswers[index]) {
      score += 1;
    }
  });
  const renderScore = Math.floor((score / rightAnswers.length) * 100);

  //scroll to top
  window.scroll({
    top: 0,
    behavior: "smooth",
  });

  let output = 0;

  const timer = setInterval(() => {
    span.textContent = `${output}%`;
    if (output === renderScore) {
      clearInterval(timer);
    } else {
      output++;
    }
  }, 15);
});

//set new Q show button
showQuizForm.addEventListener("click", (e) => {
  clearActive(); // UI clear class active

  setNewQuiz.classList.add("active"); // UI add class active to quiz setter

  deleteForms(); // UI delete forms
});

// delete added question in setForm
deleteLastQ.addEventListener("click", (e) => {
  const lastChild = document.querySelector(".new-question").lastChild;
  if (lastChild.className === "remove") {
    lastChild.remove();
  }
});

// delte quiz from database / delte quiz from nav bar
quizBar.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const quizID = e.target.parentElement.id; // get ID

    db.collection("QuestionsAndAnswers")
      .doc(quizID)
      .delete()
    /* .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    */
    e.target.parentElement.remove(); // UI remove LI from nav bar
    clearActive(); // UI clear class active
    showEvent("quiz successfully deleted"); // UI show successfully added
  }
});