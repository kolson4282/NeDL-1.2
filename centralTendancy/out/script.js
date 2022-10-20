"use strict";
const list = document.getElementById("list");
const form = document.getElementById("numberForm");
const mean = document.getElementById("mean");
const median = document.getElementById("median");
const mode = document.getElementById("mode");
const clearButton = document.getElementById("clear");
let numbers = [];
function addNumber(e) {
    if (!e.target) {
        return;
    }
    e.preventDefault();
    const li = document.createElement("li");
    const value = e.target["int"].value;
    if (isNaN(value)) {
        alert("That is not a number");
        e.target["int"].value = "";
        return;
    }
    numbers.push(+value);
    numbers.sort((a, b) => a - b);
    li.append(value);
    list.append(li);
    updateData();
    e.target["int"].value = "";
    console.log(numbers);
}
function updateData() {
    mean.innerHTML = getMean().toFixed(2);
    median.innerHTML = getMedian().toString();
    mode.innerHTML = getMode().toString();
}
function getMean() {
    const ave = numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
    return ave || 0;
}
function getMedian() {
    const middle = Math.floor(numbers.length / 2);
    if (numbers.length === 0) {
        return 0;
    }
    else if (numbers.length % 2 === 1) {
        return numbers[middle];
    }
    else {
        return (numbers[middle - 1] + numbers[middle]) / 2;
    }
}
function getMode() {
    let maxCount = 0;
    let mode = numbers[0] || 0;
    numbers.reduce((c, n) => {
        if (!(n in c)) {
            c[n] = 0;
        }
        c[n]++;
        if (c[n] > maxCount) {
            maxCount = c[n];
            mode = n;
        }
        return c;
    }, {});
    return mode;
}
function clear() {
    numbers = [];
    list.innerHTML = "";
    updateData();
}
form.addEventListener("submit", addNumber);
clearButton.addEventListener("click", clear);
//# sourceMappingURL=script.js.map