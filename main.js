const resultElement = document.getElementById("result");
let right = "0";
let left = "";
let operator = "";

function evaluateByOperators(value) {
  if (!left && !right) {
    return;
  }
  if (!right && operator) {
    operator = value;
    displayInConsole();

    return;
  }

  if (!operator) {
    operator = value;
    left = right;
    right = "";
  } else if (operator) {
    left = eval(left + operator + right);
    right = "";
    displayCalculation(left);
  }
  displayInConsole();
}

function evaluateCalculation() {
  right = eval(left + operator + right);
  operator = "";
  displayCalculation(right);
}

function displayValue(value) {
  if (value === "0" && right == 0) {
    return;
  }
  if (right === "0") {
    right = "";
  }
  if (right === "-0") {
    right = "-";
  }
  right += value;
  displayCalculation(right);
}

function clearDisplay() {
  left = "";
  right = "0";
  operator = "";
  displayCalculation(right);
}

function displayCalculation(value) {
  resultElement.innerHTML = value;
  displayInConsole();
}

function displayInConsole() {
  console.log(`Left: ${left}; Operator: ${operator}; Right: ${right}`);
}

function toggleNegative() {
  if (right >= 0 && right !== "-0") {
    right = "-" + right;
  } else if (right < 0 || right === "-0") {
    right = eval(-right);
  }

  displayCalculation(right);
}
