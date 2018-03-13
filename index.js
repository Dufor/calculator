'use strict'

function renderDisplay (state) {
    let display = document.createElement('div');
    display.className = 'display';
    if (state.length === 1 || state.length === 2)      {
                display.innerHTML = state[0];
            } 
    if (state.length === 3) {
        display.innerHTML = state[2];
    }
    return display;
}

function renderCalculator (state, onState) {

    console.log ('current state:', state)
    function updateStateWithNumber (num) {
        let nextState = state.slice();
        if (nextState.length === 1) {
            if (state[0] === 0) {
                if (num != 0) {
                    nextState = [num];
                }
            }  else {
                nextState[0] = nextState[0] + num;
            }
        } else if (nextState.length === 2) {
            nextState.push(num)
        } else if (nextState.length === 3) {
            nextState[2] = nextState[2] + num;
        }
        onState(nextState);
    }

    function updateStateWithOperator (op) {
        let nextState = state.slice();
        if (nextState.length === 1) {
        nextState.push(op);
        } else if (nextState.length === 2) {
            nextState[1] = op;
        } else if (nextState.length === 3) {
            nextState = calculateState(state);
            nextState.push(op);
        }
        onState(nextState);
    }

    function calculateState (state) {
           let leftNum = parseInt(state[0], 10);
            let midOp = state[1];
            let rightNum = parseInt(state[2], 10);
            let nextState;
        
            if (midOp === '-') {
                nextState = [leftNum - rightNum];
            } else if (midOp === '+') {
                nextState = [leftNum + rightNum];
            } else if (midOp === 'x') {
                nextState = [leftNum * rightNum];
            } else if (midOp === '/') {
                nextState = [leftNum / rightNum];  
            }  
    return nextState;
    }

    function calculate () {
        if (state.length === 3) {
            let nextState = calculateState(state);
            
            onState(nextState);
        }  
    }

    function useReset () {
        let nextState = [0];
        onState(nextState);
        }

    let calc = document.createElement('div');
    calc.className = 'calc';
   
    let level1 = document.createElement('div');
    let level2 = document.createElement('div');
    let level3 = document.createElement('div');
    let level4 = document.createElement('div');

    calc.appendChild(renderDisplay(state));
    calc.appendChild(level1);
    calc.appendChild(level2);
    calc.appendChild(level3);
    calc.appendChild(level4);

    level1.appendChild(renderButton('7', updateStateWithNumber, 'number'));
    level1.appendChild(renderButton('8', updateStateWithNumber, 'number'));
    level1.appendChild(renderButton('9', updateStateWithNumber, 'number'));
    level1.appendChild(renderButton('C', useReset, 'oper'));

    level2.appendChild(renderButton('4', updateStateWithNumber, 'number'));
    level2.appendChild(renderButton('5', updateStateWithNumber, 'number'));
    level2.appendChild(renderButton('6', updateStateWithNumber, 'number'));
    level2.appendChild(renderButton('/', updateStateWithOperator, 'oper'));

    level3.appendChild(renderButton('1', updateStateWithNumber, 'number'));
    level3.appendChild(renderButton('2', updateStateWithNumber, 'number'));
    level3.appendChild(renderButton('3', updateStateWithNumber, 'number'));
    level3.appendChild(renderButton('x', updateStateWithOperator, 'oper'));

    level4.appendChild(renderButton('0', updateStateWithNumber, 'number'));
    level4.appendChild(renderButton('-', updateStateWithOperator, 'oper'));
    level4.appendChild(renderButton('+', updateStateWithOperator, 'oper'));
    level4.appendChild(renderButton('=', calculate, 'equals'));

    return calc;
}

function renderButton (title, onClick, className) {
    let rendButt = document.createElement('button');
    rendButt.className = className;
    rendButt.innerHTML = title;
    rendButt.onclick = function () {
        onClick(title);
        }
    return rendButt;
}
 

let initialState = [0];


function onStateUpdate(nextState) {
  document.body.innerHTML = '';
  document.body.appendChild(renderCalculator(nextState, onStateUpdate));  
}

document.body.appendChild(renderCalculator(initialState, onStateUpdate));