let firstNumber = ''
let currentOperand = ''
let secondNumber = ''
let usedPeriodInCurrentNumber = false
let shouldWipeDisplay = false

const numberButtons = document.querySelectorAll('.btn')
const operandButtons = document.querySelectorAll('.btnOperator')
const deleteButton = document.getElementById('btnDelete')
const clearButton = document.getElementById('btnClear')
const equalsButton = document.getElementById('btnEquals')
const periodButton = document.getElementById('btnPeriod')

const currentDisplay = document.getElementById('current-operation')
const lastOperationDisplay = document.getElementById('last-operation')
const warningLabel = document.getElementById('warningLabel')

deleteButton.addEventListener('click', () => deleteFromNumber())
clearButton.addEventListener('click', () => clearCalculator())

periodButton.addEventListener('click', () => {
  if (usedPeriodInCurrentNumber == true) return

  if (currentOperand != '') {
    addToNumber('.', 'second')
    usedPeriodInCurrentNumber = true
    return
  }

  addToNumber('.', 'first')
  usedPeriodInCurrentNumber = true
})

equalsButton.addEventListener('click', () => {
  updateLastInputDisplay()

  if (firstNumber != '' && secondNumber != '') {
    warningLabel.textContent = ''
    evaluate()
  }

  firstNumber = ''
  secondNumber = ''
  currentOperand = ''

  shouldWipeDisplay = true
  usedPeriodInCurrentNumber = false
})

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener('click', () => {
    if (currentOperand != '') {
      addToNumber(numberButton.textContent, 'second')
      return
    }

    if (currentDisplay.textContent == '0' && firstNumber == '') {
      wipeDisplay()
    } else if (shouldWipeDisplay == true) {
      wipeDisplay()
    }

    addToNumber(numberButton.textContent, 'first')
  })
})

operandButtons.forEach((operandButton) => {
  operandButton.addEventListener('click', () => {
    if (currentDisplay.textContent != '') {
      firstNumber = currentDisplay.textContent
    }

    currentOperand = operandButton.textContent
    updateLastInputDisplay()

    shouldWipeDisplay = true
    usedPeriodInCurrentNumber = false
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

function deleteFromNumber() {
  if (secondNumber == '') {
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
  if (checkEdgeCases() == true) return

  if (currentOperand == '+') {
    currentDisplay.textContent = parseFloat(firstNumber) + parseFloat(secondNumber) 
  } else if (currentOperand == '-') {
    currentDisplay.textContent = parseFloat(firstNumber) - parseFloat(secondNumber)
  } else if (currentOperand == 'x') {
    currentDisplay.textContent = parseFloat(firstNumber) * parseFloat(secondNumber)
  } else {
    currentDisplay.textContent = parseFloat(firstNumber) / parseFloat(secondNumber)
  }
}

function checkEdgeCases() {
  if (firstNumber == '0' && secondNumber == '0' && currentOperand == "/") {
    warningLabel.textContent = "Error: You're not allowed to divide zero by itself!"
    clearCalculator()
    return true
  } else {
    return false
  }
}

function wipeDisplay() {
  currentDisplay.textContent = ''
  shouldWipeDisplay = false
}

function clearCalculator() {
  firstNumber = ''
  currentOperand = ''
  secondNmber = ''

  currentDisplay.textContent = '0'
  lastOperationDisplay.textContent = ''

  shouldWipeDisplay = false
  usedPeriodInCurrentNumber = false
}