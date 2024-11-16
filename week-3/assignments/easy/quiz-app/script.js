let correctAnswers = 0;

const createQuestionElement = (index) => {
  const questionElement = document.createElement("div");
  questionElement.setAttribute("class", "question");

  const headingElement = document.createElement("h1");
  headingElement.innerHTML = quizData?.[index]?.question || "";

  questionElement.appendChild(headingElement);

  return questionElement;
};

const clearError = () => {
  document.querySelector(".error").innerHTML = "";
  document.querySelector(".submit").style.marginTop = "30px";
};

const createOptionsElement = (index) => {
  const optionsElement = document.createElement("div");
  optionsElement.setAttribute("class", "options");

  const options = ["a", "b", "c", "d"];

  options.forEach((option) => {
    const divElement = document.createElement("div");

    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "radio");
    inputElement.setAttribute("id", `option${index}${option}`);
    inputElement.setAttribute("name", `option${index}`);
    inputElement.setAttribute("value", option);
    inputElement.setAttribute("onclick", "clearError()");

    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", `option${index}${option}`);
    labelElement.innerHTML = " " + (quizData?.[index]?.[option || ""] || "");

    divElement.appendChild(inputElement);
    divElement.appendChild(labelElement);

    optionsElement.appendChild(divElement);
  });

  return optionsElement;
};

const createResultElement = () => {
  const questionElement = document.createElement("div");
  questionElement.setAttribute("class", "question");

  const headingElement = document.createElement("h1");
  headingElement.innerHTML = `You answered ${correctAnswers}/${quizData.length} questions correctly`;

  document.querySelector(".quizContainer").style.height = "230px";

  questionElement.appendChild(headingElement);

  return questionElement;
};

const createReloadButton = () => {
  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("class", "submit");
  buttonElement.setAttribute("onclick", `quizGenerator(0)`);
  buttonElement.innerHTML = "Reload Quiz";
  correctAnswers = 0;
  return buttonElement;
};

const showResult = () => {
  const quizContainer = document.querySelector(".quizContainer");
  quizContainer.innerHTML = "";
  const resultElement = createResultElement();
  const buttonElement = createReloadButton();
  quizContainer.appendChild(resultElement);
  quizContainer.appendChild(buttonElement);
};

const checkAnswerAndRenderNext = (index) => {
  const selectedAnswer =
    document.querySelector(`input[name="option${index}"]:checked`)?.value || "";
  const isLastQuestion = index === quizData.length - 1;
  if (!selectedAnswer) {
    document.querySelector(".error").innerHTML =
      "Please select any of the one option";
    document.querySelector(".submit").style.marginTop = "11px";
    return;
  }
  if (selectedAnswer === quizData[index]?.correct) {
    correctAnswers++;
  }
  if (isLastQuestion) {
    showResult();
  } else {
    quizGenerator(index + 1);
  }
};

const createSubmitButton = (index) => {
  const buttonElement = document.createElement("button");
  const isLastQuestion = index === quizData.length - 1;
  buttonElement.setAttribute("class", "submit");
  buttonElement.innerHTML = isLastQuestion ? "Submit Quiz" : "Save & Next";
  buttonElement.setAttribute("onclick", `checkAnswerAndRenderNext(${index})`);
  return buttonElement;
};

const createErrorElement = (index) => {
  const errorElement = document.createElement("div");
  errorElement.setAttribute("class", "error");
  errorElement.style.color = "red";
  errorElement.innerHTML = "";
  return errorElement;
};

const quizGenerator = (index) => {
  if (index === 0) {
    document.querySelector(".quizContainer").style.height = "400px";
  }
  const quizContainer = document.querySelector(".quizContainer");
  quizContainer.innerHTML = "";
  const questionElement = createQuestionElement(index);
  const optionsElement = createOptionsElement(index);
  const buttonElement = createSubmitButton(index);
  const errorElement = createErrorElement(index);
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
  quizContainer.appendChild(errorElement);
  quizContainer.appendChild(buttonElement);
};

quizGenerator(0);
