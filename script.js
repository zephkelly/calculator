let firstNumber = ''
let currentOperand = ''
let secondNumber = ''

const numberButtons = document.querySelectorAll('.btn')
const operandButtons = document.querySelectorAll('.btnOperator')

const currentDisplay = document.getElementById("current-operation")
const deleteButton = document.getElementById("btnDelete")
const clearButton = document.getElementById("btnClear")

deleteButton.addEventListener('click', () => deleteFromNumber())
clearButton.addEventListener('click', () => clearCalculator())

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener('click', () => {
    if (currentOperand == '') {
      addToNumber(numberButton.textContent, 'second')
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
  })
})

function addToNumber(value, numberToUpdate) {
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

function wipeDisplay() { currentDisplay.textContent = '' }

function clearCalculator() {
  firstNumber = ''
  currentOperand = ''
  secondNmber = ''

  currentDisplay.textContent = '0'
}