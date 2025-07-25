function isOperator(expr) {
    if(expr == '+') return true;
    if(expr == '-') return true;
    if(expr == '*') return true;
    if(expr == '/') return true;
    return false;
}

function safeEval(expr) {
    try {
        expr = expr.replaceAll('X', '*');
        n = expr.length
        if (expr[n-1] == '+' || expr[n-1] == '-' ||expr[n-1] == '/' || expr[n-1] == '*' || expr[0] == '*' || expr[0] == '/'){
            return "Sorry, invalid input";
        }
        for(let i = 1; i<expr.length ; i++) {
            if(isOperator(expr[i-1]) && isOperator(expr[i])) {
                return "Sorry, invalid input";
            }
        }
        const result = Function('"use strict"; return (' + expr + ')')();
        if (isNaN(result) || result === undefined) {
            return "Sorry, invalid input";
        }
        return result;
    } catch (e) {
        return "Sorry, invalid input";
    }
}


const inputBox = document.querySelector('input');
const container = document.getElementById('container');

container.addEventListener('click' , (event)=> {
    if(event.target.classList.contains("button")) {
        if(event.target.textContent == "AC") {
            inputBox.value = "";
        }
        else if (event.target.textContent == "CLR") {
            inputBox.value = inputBox.value.substring(0 , inputBox.value.length - 1);
        }
        else if (event.target.textContent == "+/-") {
            let txt = inputBox.value;
            const n = txt.length
            let i = n-1;
            while(i>=0 && txt[i] <= '9' && txt[i] >= '0') {
                i--;
            }
            if(i == -1) {
                inputBox.value = "-" + txt;
            }
            else {
                if(txt[i] == '-') {
                    inputBox.value = txt.substring(0 , i) + '+' + txt.substring(i+1,n);
                    txt = inputBox.value;
                }
                else if (txt[i] == '+') {
                    inputBox.value = txt.substring(0 , i) + '-' + txt.substring(i+1,n);
                    txt = inputBox.value;
                }
            }
        }
        else if (event.target.textContent == "=") {
            inputBox.value = safeEval(inputBox.value)
        }
        else {
            inputBox.value += event.target.textContent;
        }
    }
})
