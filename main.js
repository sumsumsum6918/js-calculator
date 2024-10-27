const resultElement = document.getElementById("result");
let right = "0";
let left = "";
let operator = "";
let result = "";

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
    displayInConsole();
  } else if (operator) {
    formatResult(left, operator, right);
    left = eval(left + operator + right);
    right = "";
    displayInConsole();
  }
}

function evaluateCalculation() {
  formatResult(left, operator, right);
  right = eval(left + operator + right);
  left = "";
  operator = "";
  displayInConsole();
}

function displayValue(value) {
  if (value === "0" && right === "0") {
    return;
  }
  if (right === "0") {
    right = "";
  }
  if (right === "-0") {
    right = "-";
  }
  if (result && !operator) {
    result = "";
    right = "";
  }
  right += value;
  displayCalculation(right);
}

function displayDot() {
  if (right.includes(".")) {
    return;
  }
  right += ".";
  displayCalculation(right);
}

function makePercentage() {
  if (!operator) {
    right = eval(right / 100);
    displayCalculation(right);
  }
  if (operator === "+" || operator === "-") {
    right = eval((right / 100) * left);
    displayInConsole();
  }
  if (operator === "*" || operator === "/") {
    right = eval(right / 100);
    displayCalculation(right);
  }
}

function toggleNegative() {
  if (right >= 0 && right !== "-0") {
    right = "-" + right;
  } else if (right < 0 || right === "-0") {
    right = eval(-right);
  }

  displayCalculation(right);
}

function clearDisplay() {
  left = "";
  right = "0";
  operator = "";
  result = "";
  displayCalculation(right);
  console.clear();
}

function displayCalculation(value) {
  resultElement.innerHTML = value;
  displayInConsole();
}

function formatResult(left, operator, right) {
  result = Number(eval(left + operator + right));
  const decimal = result.toString().split(".")[1]?.length || 0;
  console.log(`result: ${result}, decimal:${decimal}`);

  const value = Number(result).toFixed(Math.min(8, decimal));
  displayCalculation(value);
}

function displayInConsole() {
  console.log(
    `Left: ${left}; Operator: ${operator}; Right: ${right}; Result = ${result}`
  );
}
