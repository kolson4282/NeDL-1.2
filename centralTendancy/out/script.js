"use strict";
const form = document.getElementById("numberForm");
const number = document.getElementById("int");
const list = document.getElementById("list");
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
    const value = number.value;
    if (isNaN(parseInt(value))) {
        alert("That is not a number");
        number.value = "";
        return;
    }
    numbers.push(parseInt(value));
    numbers.sort((a, b) => a - b);
    li.append(value);
    list.append(li);
    updateData();
    number.value = "";
}
function updateData() {
    if (numbers.length === 0) {
        mean.innerHTML = "N/A";
        median.innerHTML = "N/A";
        mode.innerHTML = "N/A";
    }
    else {
        mean.innerHTML = getMean().toFixed(2);
        median.innerHTML = getMedian().toString();
        mode.innerHTML = getMode();
    }
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
    const count = numbers.reduce((c, n) => {
        if (!(n in c)) {
            c[n] = 0;
        }
        c[n]++;
        return c;
    }, {});
    let maxCount = 0;
    let modes = [];
    for (let n in count) {
        if (count[n] == maxCount) {
            modes.push(n);
        }
        else if (count[n] >= maxCount) {
            modes = [n];
            maxCount = count[n];
        }
    }
    return modes.join(", ");
}
function clear() {
    numbers = [];
    list.innerHTML = "";
    updateData();
}
form.addEventListener("submit", addNumber);
clearButton.addEventListener("click", clear);
//# sourceMappingURL=script.js.map