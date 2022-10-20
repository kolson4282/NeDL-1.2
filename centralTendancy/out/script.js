var list = document.getElementById("list");
var form = document.getElementById("numberForm");
var mean = document.getElementById("mean");
var median = document.getElementById("median");
var mode = document.getElementById("mode");
var clearButton = document.getElementById("clear");
var numbers = [];
function addNumber(e) {
    if (!e.target) {
        return;
    }
    e.preventDefault();
    var li = document.createElement("li");
    var value = e.target["int"].value;
    if (isNaN(value)) {
        alert("That is not a number");
        return;
    }
    numbers.push(+value);
    numbers.sort(function (a, b) { return a - b; });
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
    var ave = numbers.reduce(function (acc, n) { return acc + n; }, 0) / numbers.length;
    return ave || 0;
}
function getMedian() {
    var middle = Math.floor(numbers.length / 2);
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
    var maxCount = 0;
    var mode = numbers[0] || 0;
    var count = numbers.reduce(function (c, n) {
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
