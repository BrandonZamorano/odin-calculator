const OPERATOR = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  MULTIPLY: "MULTIPLY",
  DIVIDE: "DIVIDE",
};

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
  switch (operator) {
    case OPERATOR.ADD:
      return add(num1, num2);
    case OPERATOR.SUBTRACT:
      return subtract(num1, num2);
    case OPERATOR.MULTIPLY:
      return multiply(num1, num2);
    case OPERATOR.DIVIDE:
      return divide(num1, num2);
  }
}
