const OPERATOR = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  MULTIPLY: "MULTIPLY",
  DIVIDE: "DIVIDE",
};

const CALCULATOR = {
  displayValue: "",
  operand1: null,
  operand2: null,
  total: 0,
  operator: "",
};

const displayNumberEl = document.querySelector(".calculator-display-numbers");

const calculatorBtns = document.querySelectorAll(".calculator-key");

calculatorBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const textValue = e.target.textContent;
    const numValue = Number.parseInt(textValue);
    const operator = OPERATOR[e.target.getAttribute("data-operator")];

    // If it's a number button
    if (numValue) {
      // Add to the display value
      display();
      display(CALCULATOR.displayValue + numValue);
      return;
    } else if (operator) {
      // Operator has been pressed

      // check if there is already an operand1
      if (CALCULATOR.operand1) {
        console.log("PRESSED OPERATOR 2nd TIME");
        CALCULATOR.operand2 = Number(CALCULATOR.displayValue);

        CALCULATOR.operator = operator;

        CALCULATOR.total = operate(
          CALCULATOR.operator,
          CALCULATOR.operand1,
          CALCULATOR.operand2
        );

        console.log("TOTAL: ", CALCULATOR.total);

        display(CALCULATOR.total);
        CALCULATOR.operand1 = CALCULATOR.total;

        return;
      }

      // Store the first number
      CALCULATOR.operand1 = Number(CALCULATOR.displayValue);
      // Store the operation
      CALCULATOR.operator = operator;

      // Clear display
      display(CALCULATOR.displayValue);
      return;
    } else if (e.target.classList.contains("operator-equals")) {
    }
    // Equals  button pressed

    if (!(CALCULATOR.operand1 && CALCULATOR.operand2)) {
      return;
    }

    CALCULATOR.operand2 = Number(CALCULATOR.displayValue);
    CALCULATOR.total = operate(
      CALCULATOR.operator,
      CALCULATOR.operand1,
      CALCULATOR.operand2
    );

    console.log("TOTAL: ", CALCULATOR.total);

    display(CALCULATOR.total);
    CALCULATOR.operand1 = null;
    CALCULATOR.operand2 = null;

    return;

    // Get the
  });
});

function add(...numbers) {
  return numbers.reduce((acc, number) => acc + number, 0);
}

function subtract(...numbers) {
  return numbers.reduce((acc, number) => {
    console.log("acc: ", acc);
    return acc - number;
  });
}
function multiply(...numbers) {
  return numbers.reduce((acc, number) => acc * number, 1);
}

function divide(...numbers) {
  return numbers.reduce((acc, number) => acc / number);
}

function operate(operator, num1, num2) {
  console.log(`operate()`);
  let result = 0;
  switch (operator) {
    case OPERATOR.ADD:
      result = add(num1, num2);
      break;
    case OPERATOR.SUBTRACT:
      result = subtract(num1, num2);
      break;
    case OPERATOR.MULTIPLY:
      result = multiply(num1, num2);
      break;
    case OPERATOR.DIVIDE:
      result = divide(num1, num2);
      break;
  }
  return result;
}

function display(text = "") {
  CALCULATOR.displayValue = "" + text;
  displayNumberEl.textContent = text;
}
