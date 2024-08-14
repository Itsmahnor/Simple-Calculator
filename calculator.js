document.addEventListener("DOMContentLoaded", () => {
    let show = document.querySelector("#Show");
    let buttons = document.querySelectorAll(".buttons");
    let Equal = document.querySelector("#equal");
    
    let Value = '';
    let Put_Value = '';
    let Final = false;
    let arr = [];
    let top = -1;
    let stack = [];

    const Pushvalue = (value) => {
        stack[++top] = value;
    }

    const PopValue = () => {
        return stack[top--];
    }

    const Peak = () => {
        return stack[top];
    }

    // Determines if operator a has precedence over operator b
    const checkchar = (a, b) => {
        
        
        const precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '%': 2
        };
        
        return precedence[a] >= precedence[b];
    }

    const infixToPostfix = (arr) => {
        console.log(arr);
        let Resultarr = [];
        for (let i of arr) {
            if (!isNaN(i)) {
                Resultarr.push(i);
            }  else {
                while (top !== -1 && checkchar(stack[top], i)) {
                    Resultarr.push(PopValue());
                  
                }
                Pushvalue(i);
            }
        }
       
        while (top !== -1) {
            Resultarr.push(PopValue());
        }
        return Resultarr;
    }

    const calculatePostfix = (postfix) => {
        let stack = [];
        postfix.forEach(token => {
            if (['+', '-', '*', '/', '%'].includes(token)) {
                let b = stack.pop();
                let a = stack.pop();
                if (isNaN(a) || isNaN(b)) {
                    stack.push('Error'); // Handle invalid expression
                    return;
                }
                switch (token) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/':
                        if (b === 0) {
                            stack.push('Error'); // Handle division by zero
                        } else {
                            stack.push(a / b);
                        }
                        break;
                    case '%': stack.push(a % b); break;
                }
            } else {
                stack.push(parseFloat(token));
            }
        });
        if (stack.length !== 1) {
            return 'Error'; // Handle invalid result
        }
        return stack[0];
    }

    const ShowDiv = (value) => {
        if (Final) {
            if (Put_Value.trim() !== '') {
                arr.push(Put_Value);
            }
            let postfix = infixToPostfix(arr);
            console.log(postfix);
            let result = calculatePostfix(postfix);
            show.innerText = result;
            arr = []; // Clear the array for the next calculation
            Put_Value = ''; // Clear the input value
            Final = false; // Reset the final flag
        } else {
            show.innerText = value;
        }
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            let Tex = button.innerText;
            if (Tex !== '=' && Tex !== 'c') {
                if (Tex === '+' || Tex === '-' || Tex === '*' || Tex === '/' || Tex === '%') {
                    if (Put_Value.trim() !== '') {
                        arr.push(Put_Value);
                        Put_Value = '';
                    }
                    arr.push(Tex);
                } else {
                    Put_Value += Tex;
                }
                Value += Tex;
            } else if (Tex === '=') {
               
                Final = true;
            } else if (Tex === 'c') {
                
                Value = '';
                Put_Value = '';
                arr = [];
                show.innerText = '';
            }
            ShowDiv(Value);
        });

    });
    cross.addEventListener("click", () => {
        // remove last digit
        if (Put_Value.length > 0) {
            Put_Value = Put_Value.slice(0, -1);
            Value = Value.slice(0, -1);
        } 
        else if (arr.length > 0) {
            let last = arr.pop();
            if (['+', '-', '*', '/', '%'].includes(last)) {
                Value = Value.slice(0, -1);
            } else {
                Put_Value = last;
                Value = Value.slice(0, -1);
            }
        }
        ShowDiv(Value);
    });
});
