const screen = document.querySelector(".screen");
const keys = document.querySelector(".calculator-keys");

let screenValue = "0";
updateDisplay();

let operator = null;
let firstValue = null;
let waitingForSecondValue = false;

function updateDisplay() {
  screen.value = screenValue;
}

keys.addEventListener("click", function (e) {
  const element = e.target;

  if (!element.matches("button")) return;

  switch (element.value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(element.value);
      break;

    case ".":
      addDecimal();
      break;

    case "clear":
      clear();
      break;

    default:
      displayInput(element.value);
  }

  updateDisplay();
});

function handleOperator(referenceOperator) {
  let value = parseFloat(screenValue);

  if (operator && waitingForSecondValue) {
    operator = referenceOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    let result = calculate(firstValue, value, operator);

    screenValue = `${parseFloat(result.toFixed(5))}`;
    firstValue = result;
  }
  waitingForSecondValue = true;
  operator = referenceOperator;
  console.log(screenValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }
  return second;
}

function displayInput(num) {
  if (waitingForSecondValue) {
    screenValue = num;
    waitingForSecondValue = false;
  } else {
    screenValue = screenValue === "0" ? num : screenValue + num;
  }
  console.log(screenValue, firstValue, operator, waitingForSecondValue);
}

function addDecimal() {
  if (!screenValue.includes(".")) {
    screenValue += ".";
  }
}

function clear() {
  screenValue = "0";
}
