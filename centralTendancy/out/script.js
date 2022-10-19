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
    var ave = numbers.reduce(function (acc, n) { return acc + n; }, 0) / numbers.length;
    mean.innerHTML = ave.toString();
    median.innerHTML = numbers[Math.floor(numbers.length / 2)].toString();
}
form.addEventListener("submit", addNumber);
