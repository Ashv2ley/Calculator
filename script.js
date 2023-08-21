class Calculator {
    constructor(prevOperandTextElement, currOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement;
        this.currOperandTextElement = currOperandTextElement;
        this.clear();
    }


    clear(){
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;

    }

    delete(){
        this.currOperand = this.currOperand = this.currOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if (number ==='.' && this.currOperand.includes('.')) return;
        if (this.round === true && this.prevOperand !== ''){this.currOperand = number; this.round = false; return;}
        else if (this.round === true && this.prevOperand === ''){this.currOperand = number; this.round = false; return;}
        this.currOperand = this.currOperand + number.toString();
    }

    chooseOperation(operation){
        if (this.currOperand === '') return;
        this.currOperand = this.currOperand + operation;
        if (this.prevOperand !== ''){
            this.compute();
            this.currOperand = this.currOperand + operation;
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute(){
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);
        let result
        if (isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case '+':
                result = prev + curr;
                break
            case '-':
                result = prev - curr;
                break
            case '*':
                result = prev * curr;
                break
            case '÷':
                result = prev / curr;
                break;
            default:
                return;
        }
        this.currOperand = result;
        this.operation = undefined;
        this.prevOperand = '';
        this.round = true;
    }

    updateDisplay(){
        
        this.currOperandTextElement.innerHTML = this.currOperand;
        this.prevOperandTextElement.innerHTML = this.prevOperand;
        
    }

}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOperandTextElement = document.querySelector('[data-previous-operand]')
const currOperandTextElement = document.querySelector('[data-current-operand]')
const round = false;


const calculator = new Calculator(prevOperandTextElement, currOperandTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
  })

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML);
        calculator.updateDisplay();
    }) 
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})