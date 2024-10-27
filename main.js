const resultElement = document.getElementById("result");
let right = "0";
let left = "";
let operator = "";
let result = "";

function evaluateByOperators(value) {
  clearCheckedOperator(operator);
  if (!left && !right) {
    return;
  }
  if (!right && operator) {
    operator = value;
    checkedOperator(operator);
    displayInConsole();

    return;
  }

  if (!operator) {
    operator = value;
    checkedOperator(value);
    left = right;
    right = "";
    displayInConsole();
  } else if (operator) {
    formatResult(left, operator, right);
    left = eval(left + operator + right);
    operator = value;
    checkedOperator(operator);
    right = "";
    displayInConsole();
  }
}

function evaluateCalculation() {
  if (!right) {
    right = left;
    clearCheckedOperator(operator);
  }
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
  clearCheckedOperator(operator);
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
  clearCheckedOperator(operator);
  console.clear();
}

function displayCalculation(value) {
  console.log(value);
  console.log(value.length);
  // if (value.length > 10) {
  //   const decimalLength = value.toString().split(".")[1]?.length || 0;
  //   const length = 10 - Number(decimalLength);

  //   const decimalResult = Number(value).toFixed(Math.min(9, length));
  //   value = decimalResult;
  // }

  resultElement.innerHTML = value;
  displayInConsole();
}

function formatResult(left, operator, right) {
  result = eval(left + operator + right);
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
function checkedOperator(value) {
  if (value === "+") {
    document.querySelector(".add").classList.add("check");
  } else if (value === "-") {
    document.querySelector(".minus").classList.add("check");
  } else if (value === "*") {
    document.querySelector(".multiply").classList.add("check");
  } else if (value === "/") {
    document.querySelector(".divide").classList.add("check");
  }
}

function clearCheckedOperator(value) {
  if (value === "+") {
    document.querySelector(".add").classList.remove("check");
  } else if (value === "-") {
    document.querySelector(".minus").classList.remove("check");
  } else if (value === "*") {
    document.querySelector(".multiply").classList.remove("check");
  } else if (value === "/") {
    document.querySelector(".divide").classList.remove("check");
  }
}
