var list = document.getElementById("list");
var form = document.getElementById("numberForm");
var mean = document.getElementById("mean");
var median = document.getElementById("median");
var mode = document.getElementById("mode");
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
    numbers.sort();
    li.append(value);
    list.append(li);
    console.log(numbers);
    updateData();
}
function updateData() {
    mean.innerHTML = getMean().toString();
    median.innerHTML = getMedian().toString();
}
function getMean() {
    var ave = numbers.reduce(function (acc, n) { return acc + n; }, 0) / numbers.length;
    return ave;
}
function getMedian() {
    var middle = Math.floor(numbers.length / 2);
    if (numbers.length % 2 == 1) {
        return numbers[middle];
    }
    else {
        return (numbers[middle - 1] + numbers[middle]) / 2;
    }
}
function getMode() { }
form.addEventListener("submit", addNumber);
