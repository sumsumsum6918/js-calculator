const resultElement = document.getElementById("result");
let right = "0";
let left = "";
let operator = "";
let result = "";

function evaluate() {
  const leftValue = parseFloat(left);
  const rightValue = parseFloat(right);

  const getValue = () => {
    if (operator === "+") {
      return leftValue + rightValue;
    }
    if (operator === "-") {
      return leftValue - rightValue;
    }
    if (operator === "*") {
      return leftValue * rightValue;
    }
    if (operator === "/") {
      return leftValue / rightValue;
    }
  };
  return getValue().toString();
}

function evaluateByOperators(newOperator) {
  if (!left && !right) {
    return;
  }
  if (!right && operator) {
    operator = newOperator;
    displayInConsole();

    return;
  }

  if (!operator) {
    operator = newOperator;
    left = right;
  } else {
    const newResult = evaluate();
    formatResult();
    left = newResult;
    operator = newOperator;
  }
  right = "";
  displayInConsole();
}

function evaluateCalculation() {
  const newResult = evaluate();
  formatResult();
  right = newResult;
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
  if (right.startsWith("0") && !right.includes(".")) {
    right = right.slice(1);
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
    right = (right / 100).toString();
    displayCalculation(right);
  }
  if (operator === "+" || operator === "-") {
    right = ((right / 100) * left).toString();
    displayInConsole();
  }
  if (operator === "*" || operator === "/") {
    right = (right / 100).toString();
    displayCalculation(right);
  }
}

function toggleNegative() {
  if (right >= 0 && right !== "-0") {
    right = "-" + right;
  } else if (right < 0 || right === "-0") {
    right = right.replace("-", "");
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

function getPrecision(value) {
  if (Number(value) > 999999999) {
    return 1;
  }
  if (
    value.startsWith("0") &&
    value.includes(".") &&
    !["0", "-0"].includes(value)
  ) {
    return Math.min(
      8,
      value.replace(".", "").replace("0", "").replace("-", "").length || 1
    );
  }
  return Math.min(9, value.replace("-", "").replace(".", "").length);
}

function displayCalculation(value) {
  if (typeof value === "number") {
    value = value.toString();
  }
  const precision = getPrecision(value);
  resultElement.innerHTML = ["0", "-0"].includes(value)
    ? value
    : Number(value).toPrecision(precision);
  displayInConsole();
}

function formatResult() {
  result = evaluate();
  displayCalculation(result);
}

function displayInConsole() {
  console.log(
    `Left: ${left}; Operator: ${operator}; Right: ${right}; Result = ${result}`
  );
}
