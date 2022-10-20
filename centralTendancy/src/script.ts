const list = document.getElementById("list") as HTMLElement;
const form = document.getElementById("numberForm") as HTMLElement;
const number = document.getElementById("int") as HTMLInputElement; //Getting the value of the number input so that we don't have any anys in the form.
const mean = document.getElementById("mean") as HTMLElement;
const median = document.getElementById("median") as HTMLElement;
const mode = document.getElementById("mode") as HTMLElement;
const clearButton = document.getElementById("clear") as HTMLElement;

let numbers: number[] = [];

function addNumber(e: SubmitEvent) {
  console.log(e);
  if (!e.target) {
    return; //if e doesn't have a target, none of this makes sense, so shouldn't go through the process. This should never actually happen.
  }
  e.preventDefault(); //Keep submit from refreshing the page

  const li = document.createElement("li");
  const value = number.value;

  if (isNaN(parseInt(value))) {
    //This should never happen since I'm using a number input, but still protecting for it.
    alert("That is not a number");
    number.value = "";
    return;
  }

  numbers.push(parseInt(value));
  numbers.sort((a, b) => a - b); //This seems bad. Is there a way to input a number in it's sorted place?
  li.append(value);
  list.append(li);
  updateData();
  number.value = "";
}

function updateData() {
  mean.innerHTML = getMean().toFixed(2);
  median.innerHTML = getMedian().toString();
  mode.innerHTML = getMode();
}

function getMean(): number {
  const ave = numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
  return ave || 0;
}

function getMedian(): number {
  const middle = Math.floor(numbers.length / 2);
  if (numbers.length === 0) {
    return 0;
  } else if (numbers.length % 2 === 1) {
    return numbers[middle];
  } else {
    return (numbers[middle - 1] + numbers[middle]) / 2;
  }
}

function getMode(): string {
  const count = numbers.reduce<Record<number, number>>((c, n) => {
    if (!(n in c)) {
      c[n] = 0; //If n isn't already in c, set it to zero
    }
    c[n]++;
    return c;
  }, {}); //Set this way so typescript knows that C is an object that maps numbers to numbers

  let maxCount = 0;
  let mode: string[] = [];
  for (let n in count) {
    if (count[n] == maxCount) {
      //if the count is the same as what is already in the mode, push to the array. Allows multiple modes
      mode.push(n);
    } else if (count[n] >= maxCount) {
      //if the count is greater than what is already the mode, overwrite the array.
      mode = [n];
      maxCount = count[n];
    }
  }
  console.log(count);
  return mode.join(", ");
}

function clear() {
  numbers = [];
  list.innerHTML = "";
  updateData();
}

form.addEventListener("submit", addNumber);
clearButton.addEventListener("click", clear);
