// Must contain functions for the following math operators:
// add // subtract // multiply // divide
const OPERATOR = {
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
  "ADD": "+",
  "SUBTRACT": "-",
  "MULTIPLY": "*",
  "DIVIDE": "/",
}

// You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() on them when the user presses the “=” key.

const calculator = {
  total: null,
  displayValue: "",
  awaitingOperand: true,
  operand: null,
  operator: null,
  // Clear out current operation when equals is pressed
  currentOperation: [], // Operation tuple
  operations: [],
  // // Add operation here when operation is pressed
  // operations: [], // Array of Operation Tuples
  clearDisplay() {
    this.displayValue = '';
  },
  updateDisplay() {
    displayEl.textContent = this.displayValue
  },
  addNumber(num) {
    // If we're waiting on the second operand
    if (this.displayValue?.includes('.') && num === '.'){
      return
    }
    if (this.awaitingOperand) {
      // First clear the display
      this.clearDisplay()
      this.updateDisplay()
      this.awaitingOperand = false
    }
    this.displayValue += num;
    this.updateDisplay()

  },

  handleOperator(operator) {
    console.log("Operator: ", operator)
    this.operand = +this.displayValue;
    if (operator === '=') {
      console.log("Equals was pressd")
      this.currentOperation.push(this.operand)
      this.operations.push(... this.currentOperation)
      this.total = operate(...this.currentOperation)
      this.displayValue = this.total
      this.updateDisplay()

      return
    }
    this.awaitingOperand = true;
    this.operator = operator;
    if (this.currentOperation.length === 0) {
      this.currentOperation.push(this.operator);
      this.currentOperation.push(this.operand);
      return;
    }
    // existin operation
    this.currentOperation.push(this.operand)
    this.operations.push(this.currentOperation);
    this.total = operate(...this.currentOperation);
    this.displayValue = this.total;
    this.updateDisplay()
    this.currentOperation = [this.operator, this.total]

  },
  reset() {
    this.total = null;
    this.displayValue = ""
    this.awaitingOperand = true
    this.operand = null
    this.operator = null
    this.currentOperation = []
    this.operations = []
    this.updateDisplay()

  }
}

function add(op1, op2) {
  return op1 + op2;
}

function subtract(op1, op2) {
  return op1 - op2;
}
function multiply(op1, op2) {
  return op1 * op2;
}

function divide(op1, op2) {
  return op1 / op2;
}

function operate(operator, op1, op2) {
  switch (operator) {
    case OPERATOR.ADD:
      return add(op1, op2)
    case OPERATOR.SUBTRACT:
      return subtract(op1, op2)
    case OPERATOR.MULTIPLY:
      return multiply(op1, op2)
    case OPERATOR.DIVIDE:
      return divide(op1, op2)
  }
}


// Create the functions that populate the display when you click the number buttons… you should be storing the ‘display value’ in a variable somewhere for use in the next step.

const numberKeys = [...document.querySelectorAll('.calculator-key')].filter(el => !el.classList.contains('calculator-key-special'))
const displayEl = document.querySelector('.calculator-display-numbers')
const calcKeysLeft = document.querySelector('.calculator-keys-left')
const calcKeysRight = document.querySelector('.calculator-keys-right')


// Listens for when a number key is pressed
calcKeysLeft.addEventListener('click', (e) => {
  const { target } = e;

  // console.log(e.target);
  // Only number keys
  if (target.className === 'calculator-key') {
    // console.log(e.target);
    const buttonValue = target.textContent;
    return calculator.addNumber(buttonValue);
  }

  if (target.textContent.trim() === "ON/C") {
    console.log("RESET BUTTON WAS PRESED")
    calculator.reset()
  }
})
calcKeysRight.addEventListener('click', (e) => {
  const { target } = e;
  // console.log(e.target);

  // Only operators
  if (target.dataset.operator) {
    const { operator } = target.dataset
    // console.log("Operator: ", target.dataset.operator)

    calculator.handleOperator(operator)
  }
})

document.addEventListener('keydown', (e) => {
  // console.log(e.code)
  console.log(e.key, typeof e.key)
  const { key } = e

  const clearKeys = [' ', 'c']
  const equalsKeys = ['=', 'Enter']

  // Listen for numbers / period
  if (!Number.isNaN(+key) || key === '.') {
    // console.log("Number or period: ", key)
    calculator.addNumber(key)
    return;
  }

  // Listen for operators
  if (OPERATOR[key] || equalsKeys.includes(key)) {
    calculator.handleOperator(OPERATOR[key] || '=')
    return
  }

  //Listen for clear keys
  if (clearKeys.includes(key)) {
    console.log("clear key was presed")
    calculator.reset()
    return
  }



})