const list = document.getElementById("list");
const form = document.getElementById("numberForm");
const mean = document.getElementById("mean");
const median = document.getElementById("median");
const mode = document.getElementById("mode");
const numbers: number[] = [];

function addNumber(e: SubmitEvent) {
  if (!e.target) {
    return;
  }
  e.preventDefault();
  const li = document.createElement("li");
  const value = e.target["int"].value;
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
  const ave = numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
  return ave;
}

function getMedian() {
  const middle = Math.floor(numbers.length / 2);

  if (numbers.length % 2 == 1) {
    return numbers[middle];
  } else {
    return (numbers[middle - 1] + numbers[middle]) / 2;
  }
}

function getMode() {}

form.addEventListener("submit", addNumber);
