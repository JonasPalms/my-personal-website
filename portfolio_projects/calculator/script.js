class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        // først tjekker vi om der allerede er indtastet et ".". Hvis der er, afslutter vi
        // funktionen med return. 
        if (number === "." && this.currentOperand.includes(".")) return;
        // Appender det indtastede tal (punktum hvis intet er der).  
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        // check if operation has just been clicked ie. currentOperand is empty then return
        if (this.currentOperand === "") return;
        // trigger compute function unless previous operand is empty
        if (this.previousOperand !== "") {
            this.compute();
        }

        // takes the operaton parsed and updates current and previous operands 
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";


    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // if  inputs are not numbers dont do anything.
        if (isNaN(prev) | isNaN(current)) return;

        switch (this.operation) {
            case "+":
                computation = prev + current;
                break
            case "-":
                computation = prev - current;
                break
            case "÷":
                computation = prev / current;
                break
            case "*":
                computation = prev * current;
                break
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    // funktion til at formatere output. Kalder funktionen i updateDisplay.

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

// Definerer elementer fra HTML DOM
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");


// instantierer calculator objektet

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Appender click listeners, anonym funktion der trigger to andre funktioner. Parser nummeret
// og updaterer display

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();

})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();

})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();

})