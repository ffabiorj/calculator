 /*jshint esversion: 6 */ 


(function(){

    let $display = document.getElementById('display');
    let $numbers = document.querySelectorAll('[data-js="number"]');
    let $clearDisplay = document.querySelector('[data-js="clear"]');
    let $operation = document.querySelectorAll('[data-js="operation"]');
    let $back = document.querySelector('[data-js="back"]');
    let $equal = document.querySelector('[data-js="equal"]');

    $clearDisplay.addEventListener('click', hendleClickClearDisplay);
    $equal.addEventListener('click', handleClickEqual);
    $back.addEventListener('click', hendleClickBack);

    function hendleClickClearDisplay() {
        $display.value = "0";
    }

    function hendleClickBack() {
        $display.value = $display.value.slice(0, -1);
    }
    
    Array.prototype.forEach.call($operation, function(button){
        button.addEventListener('click', hendleClickOperation ,false);
    });

    Array.prototype.forEach.call($numbers, function(button){
        button.addEventListener('click', hendleClickNumber);
    });
    function hendleClickOperation() {
        $display.value = removeLastItemIfIsOperator($display.value);
        $display.value += this.value; 
    }

    function hendleClickNumber() {
        if ($display.value.charAt(0) === '0') $display.value = "";
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
            if(operator === '÷' && lastValue === '0'){
                alert("You can't divide a number per 0!");
                return $display.value = '0';
            } else {
                switch(operator) {
                    case '+':
                        return (Number(firstValue) + Number(lastValue )) + lastOperator;
                    case '-':
                        return (Number(firstValue) - Number(lastValue )) + lastOperator;
                    case 'x':
                        return (Number(firstValue) * Number(lastValue )) + lastOperator;
                    case '÷':
                        return (Number(firstValue) / Number(lastValue )) + lastOperator;
                }
            }
        });
    


 
    }

})();