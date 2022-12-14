let firstNumber = ''
let secondNumber = ''
let operand = ''
let shouldClearScreen = false

const buttons = document.querySelectorAll('.btn')
const operators = document.querySelectorAll('.btnOperator')
const lastOperation = document.getElementById('last-operation')
const currentOperation = document.getElementById('current-operation')

buttons.forEach((button) => {
  if(button.classList.contains("btnOperator")) return

  button.addEventListener('click', () => {
    if (shouldClearScreen) clearScreen()
    inputNewNumber(button.textContent)
  })
});

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    if (operator.textContent == '=' && firstNumber != '') {
      secondNumber = currentOperation.textContent
      currentOperation.textContent = evaluate(parseInt(firstNumber), parseInt(secondNumber))

      lastOperation.textContent = firstNumber + ' ' + operand + ' '  + secondNumber + ' ' + '='
      shouldClearScreen = true;
      return
    }

    firstNumber = currentOperation.textContent
    operand = operator.textContent

    lastOperation.textContent = currentOperation.textContent + " " + operator.textContent
    shouldClearScreen = true;
  })
})

function inputNewNumber(number) {
  if (currentOperation.textContent == 0) clearScreen()

  currentOperation.textContent += number
}

function clearScreen() {
  currentOperation.textContent = ''
  shouldClearScreen = false
}

function resetScreen() {
  currentOperation.textContent = 0
}

function sendToLastOperation(newOperand) {
  lastOperation.textContent = newOperand;
}

function evaluate(num1, num2) {
  return num1 + num2
}