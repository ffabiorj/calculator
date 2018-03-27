 /*jshint esversion: 6 */ 


(function(){

let $display = document.getElementById('display');
let $numbers = document.querySelectorAll('[data-js="number"]');
let $clearDisplay = document.querySelector('[data-js="clear"]');
let $operation = document.querySelectorAll('[data-js="operation"]');
let $dot = document.querySelector('[data-js="dot"]');
let $equal = document.querySelector('[data-js="equal"]');



$clearDisplay.addEventListener('click', hendleClickClearDisplay, false);
$equal.addEventListener('click', handleClickEqual, false);

function hendleClickClearDisplay() {
    $display.value = '';
}

function hendleClickOperation() {
    $display.value = removeLastItemIfIsOperator($display.value);
    $display.value += this.value; 
}

function hendleClickNumber() {
    $display.value += this.textContent;
}

function removeLastItemIfIsOperator(number) {
    if(isLastItemAnOperation(number)){
        return number.slice(0, -1);
    }
    return number;
}

function isLastItemAnOperation(number) {
    let operations = ['+', '-', 'x', '÷'];
    let lastItem = number.split('').pop();
    return operations.some(function(operator){
        return operator === lastItem;
    });
}

function handleClickEqual() {
    $display.value = removeLastItemIfIsOperator($display.value);
    let allValues = $display.value.match(/\d+[+-x÷]?/g);
    $display.value = allValues.reduce(function(accumulated, actual){
        let firstValue = accumulated.slice(0, -1);
        let operator = accumulated.split('').pop();
        let lastValue = removeLastItemIfIsOperator(actual);
        let lastOperator = isLastItemAnOperation(actual)  ? actual.split('').pop() : '';
        switch(operator) {
            case '+':
                return (Number(firstValue) + Number(lastValue )) + lastOperator;
            case '-':
                return (Number(firstValue) - Number(lastValue )) + lastOperator;
            case 'x':
                return (Number(firstValue) * Number(lastValue )) + lastOperator;
            case '÷':
                return (Number(firstValue) / Number(lastValue )) + lastOperator;
            case '%':
                return (Number(firstValue) / Number(lastValue )) + lastOperator;
        }
    });
    
}




Array.prototype.forEach.call($operation, function(button){
    button.addEventListener('click', hendleClickOperation ,false);
});

Array.prototype.forEach.call($numbers, function(button){
    button.addEventListener('click', hendleClickNumber, false);
});




})();