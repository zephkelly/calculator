let firstNumber = ''
let currentOperand = ''
let secondNumber = ''
let shouldWipeDisplay = false

const numberButtons = document.querySelectorAll('.btn')
const operandButtons = document.querySelectorAll('.btnOperator')
const deleteButton = document.getElementById('btnDelete')
const clearButton = document.getElementById('btnClear')
const equalsButton = document.getElementById('btnEquals')

const currentDisplay = document.getElementById('current-operation')
const lastOperationDisplay = document.getElementById('last-operation')

deleteButton.addEventListener('click', () => deleteFromNumber())
clearButton.addEventListener('click', () => clearCalculator())

equalsButton.addEventListener('click', () => {
  updateLastInputDisplay()

  if (firstNumber != '' && secondNumber != '') evaluate()
  secondNumber = ''
  currentOperand = ''
})

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener('click', () => {
    if (currentOperand != '') {
      addToNumber(numberButton.textContent, 'second')
      return
    }

    if (currentDisplay.textContent == '0' && firstNumber == '') {
      wipeDisplay()
    }

    addToNumber(numberButton.textContent, 'first')
  })
})

operandButtons.forEach((operandButton) => {
  operandButton.addEventListener('click', () => {
    if (firstNumber == '') return

    currentOperand = operandButton.textContent
    updateLastInputDisplay()
    shouldWipeDisplay = true
  })
})

function addToNumber(value, numberToUpdate) {
  if (shouldWipeDisplay) wipeDisplay()
  
  if (numberToUpdate == 'first') {
    if (firstNumber.length >= 11) return

    firstNumber += value
    currentDisplay.textContent = firstNumber
  } else {
    if (secondNumber.length >= 11) return

    secondNumber += value
    currentDisplay.textContent = secondNumber
  }
}

function deleteFromNumber(numberToUpdate) {
  if (numberToUpdate == 'first') {
    firstNumber = firstNumber.slice(0, -1)
    currentDisplay.textContent = firstNumber
  } else {
    secondNumber = secondNumber.slice(0, -1)
    currentDisplay.textContent = secondNumber
  }

  if (currentDisplay.textContent == '') {
    currentDisplay.textContent = '0'
  }
}

function updateLastInputDisplay() {
  if (secondNumber == '') {
    lastOperationDisplay.textContent = firstNumber + ' ' + currentOperand
  } else {
    lastOperationDisplay.textContent = firstNumber + ' ' + currentOperand + ' ' + secondNumber + ' ' + '='
  }
}

function evaluate() {
  if (currentOperand == '+') {
    currentDisplay.textContent = parseInt(firstNumber) + parseInt(secondNumber) 
  } else if (currentOperand == '-') {
    currentDisplay.textContent = parseInt(firstNumber) - parseInt(secondNumber)
  } else if (currentOperand == 'x') {
    currentDisplay.textContent = parseInt(firstNumber) * parseInt(secondNumber)
  } else {
    currentDisplay.textContent = parseInt(firstNumber) / parseInt(secondNumber)
  }

  firstNumber = currentDisplay.textContent
}

function wipeDisplay() { currentDisplay.textContent = '' }

function clearCalculator() {
  firstNumber = ''
  currentOperand = ''
  secondNmber = ''

  currentDisplay.textContent = '0'
  lastOperationDisplay.textContent = ''
}