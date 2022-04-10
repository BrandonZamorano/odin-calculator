
const OPERATOR = {
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    "=": "=",
    "ADD": "+",
    "SUBTRACT": "-",
    "MULTIPLY": "*",
    "DIVIDE": "/",
    "EQUAlS": "="
}

const Display = {
    uiEl: document.querySelector('.calculator-display'),
    displayValue: '',
    display(str) {
        this.uiEl.textContent = "" + str;
    },
    setDisplayValue(str) {
        this.displayValue = "" + str;
    },
    addToDisplay(str) {
        this.displayValue += "" + str;
        this.update()
    },
    clear() {
        this.displayValue = '';
        this.update();
    },
    update() {
        this.uiEl.textContent = this.displayValue;
    },
    getDisplayValue() {
        return this.displayValue.trim()
    }
}

const KeyPad = {
    uiEl: document.querySelector('.calculator-keys'),
    init() {
        this.handleCalcKeyClick = this.handleCalcKeyClick.bind(this)
        this.handleCalcKeyPress = this.handleCalcKeyPress.bind(this)
        this.uiEl.addEventListener('click', (e) => this.handleCalcKeyClick(e))
        document.addEventListener('keydown', (e) => this.handleCalcKeyPress(e))
    },
    handleCalcKeyClick(e) {
        const { target } = e;
        //Number key was pressed
        if (target.className === 'calculator-key') {
            this.handleNumberKey(target.textContent.trim())
        }

        //Operator key was pressed
        if (target.dataset.operator) {
            this.handleOperatorKey(target.textContent.trim())
        }

        //Reset/Clear key was pressed
        if (target.textContent.trim() === 'ON/C') {
            this.handleResetKey()
        }

    },
    handleCalcKeyPress(e) {
        const { key } = e;
        const clearKeys = ['Backspace', 'c']
        const equalsKeys = ['=', 'Enter']
        //Number key was pressed
        if (key === '.' || !isNaN(Number.parseInt(key))) {
            this.handleNumberKey(key)
        }
        //Operator key was pressed
        if (OPERATOR[key] || equalsKeys.includes(key)) {
            this.handleOperatorKey(OPERATOR[key] || OPERATOR.EQUAlS)
            return
        }
        //Reset/Clear key was pressed
        if (clearKeys.includes(key)) {
            this.handleResetKey()
        }

    },
    handleNumberKey(numberKey) {
    },
    handleOperatorKey(operator) {
    },
    handleResetKey() {
    }
}

const Calculator = {
    display: Display,
    keyPad: KeyPad,
    operand: null,
    operator: null,
    currentOperation: [],
    operations: [], // Array of operations
    total: null,
    clearScreen: false,
    init() {
        this.handleNumberKey = this.handleNumberKey.bind(this)
        this.handleOperatorKey = this.handleOperatorKey.bind(this)
        this.handleResetKey = this.handleResetKey.bind(this)
        this.keyPad.init()
        this.keyPad.handleNumberKey = this.handleNumberKey;
        this.keyPad.handleOperatorKey = this.handleOperatorKey;
        this.keyPad.handleResetKey = this.handleResetKey;

    },
    handleNumberKey(numberKey) {

        if (this.clearScreen) {
            this.display.clear()
            this.clearScreen = false;
        }

        if (this.display.getDisplayValue().includes('.') && numberKey === '.') {
            return
        }
        this.display.addToDisplay(numberKey)

    },
    handleOperatorKey(operator) {

        // Need at least one operand to use an operator
        if (this.currentOperation.length === 2) {
            // First operand and operator already exists
            //set second operand
            this.operand = +this.display.getDisplayValue()
            if (this.operator === OPERATOR.DIVIDE && this.operand === 0) {
                this.display.display("YOU TRIED TO DIVIDE BY ZERO, DIDN'T YOU?")
                alert("YOU TRIED TO DIVIDE BY ZERO, DIDN'T YOU?")
                return this.handleResetKey()
            }
            this.currentOperation.push(this.operand);
            this.total = this.operate(...this.currentOperation)
            this.operand = this.total
            this.currentOperation = []
            //Display the result
            this.display.setDisplayValue(this.total);
            this.display.update()
            this.clearScreen = true;

            // Set up the new operation
            return
        }

        if (operator === OPERATOR.EQUAlS) {
            return;
        }
        // Evaluate the display value and set that as operand1
        this.operand = +this.display.getDisplayValue()
        this.operator = operator
        this.currentOperation.push(this.operator)
        this.currentOperation.push(this.operand)
        // this.operator = null;
        this.clearScreen = true;
    },
    handleResetKey() {
        this.display.clear()
        this.operand1 = null;
        this.total = null;
        this.operator = null
    },
    operate(operator, op1, op2) {
        switch (operator) {
            case OPERATOR.ADD:
                return this.add(op1, op2)
            case OPERATOR.SUBTRACT:
                return this.subtract(op1, op2)
            case OPERATOR.MULTIPLY:
                return this.multiply(op1, op2)
            case OPERATOR.DIVIDE:
                return this.divide(op1, op2)
        }
    },

    add(op1, op2) {
        return op1 + op2;
    },

    subtract(op1, op2) {
        return op1 - op2;
    },
    multiply(op1, op2) {
        return op1 * op2;
    },

    divide(op1, op2) {
        return op1 / op2;
    }
}

Calculator.init();