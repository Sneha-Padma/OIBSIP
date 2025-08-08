const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let currentInput = "";
let justCalculated = false; // track if last action was '='

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            currentInput = "";
            display.value = "";
            justCalculated = false;
        }
        else if (value === "⌫") {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }
        else if (value === "=") {
            try {
                currentInput = eval(currentInput).toString();
                display.value = currentInput;
                justCalculated = true; // mark that we just calculated
            } catch {
                display.value = "Error";
                currentInput = "";
                justCalculated = false;
            }
        }
        else {
            if (justCalculated) { 
                // start fresh if a number is pressed after '='
                if (!isNaN(value) || value === ".") {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
                justCalculated = false;
            } else {
                currentInput += value;
            }
            display.value = currentInput;
        }
    });
});

// Optional: Keyboard support
document.addEventListener("keydown", (e) => {
    if ((e.key >= 0 && e.key <= 9) || ["+", "-", "*", "/", "."].includes(e.key)) {
        if (justCalculated && !isNaN(e.key)) {
            currentInput = e.key; // start fresh after '=' if number is typed
            justCalculated = false;
        } else {
            currentInput += e.key;
        }
        display.value = currentInput;
    } 
    else if (e.key === "Enter") {
        try {
            currentInput = eval(currentInput).toString();
            display.value = currentInput;
            justCalculated = true;
        } catch {
            display.value = "Error";
            currentInput = "";
            justCalculated = false;
        }
    } 
    else if (e.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    } 
    else if (e.key.toLowerCase() === "c") {
        currentInput = "";
        display.value = "";
        justCalculated = false;
    }
});
