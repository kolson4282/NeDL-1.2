const list1 = document.getElementById("list1");
const list2 = document.getElementById("list2");
const form = document.getElementById("palindromeForm");
const clear1 = document.getElementById("clear1");
const clear2 = document.getElementById("clear2");

function checkPalindrome(e: SubmitEvent) {
  //this happens on submit of the form
  if (!e.target) {
    return;
  }
  e.preventDefault();
  const test = e.target["palindrome"].value;
  if (test === "") {
    alert("Must enter a word to check");
    return;
  }
  const alg = e.target["alg"].value;
  if (alg === "1") {
    palindrome1(test);
  } else if (alg === "2") {
    palindrome2(test);
  } else {
    alert("Invalid Algorithm to use. Must use 1 or 2");
    e.target["alg"].value = "1";
  }
  e.target["palindrome"].value = "";
  e.target["palindrome"].focus();
}

function palindrome1(str: string) {
  //first alg. Go through the string and reverse it and then compare
  const testString = str.toLowerCase().replace(/ /g, "");
  let reversed = "";
  for (let i = testString.length - 1; i >= 0; i--) {
    reversed += testString[i];
  }
  const li = document.createElement("li");
  if (reversed === testString) {
    li.append(str + " - Palindrome");
  } else {
    li.append(str + " - Not Palindrome");
  }
  list1?.append(li);
}

function palindrome2(str: string) {
  //second alg. Use string and array functions to reverse the string
  const testString = str.toLowerCase().replace(/ /g, "");
  let reversed = testString.split("").reverse().join("");

  const li = document.createElement("li");
  if (reversed === testString) {
    li.append(str + " - Palindrome");
  } else {
    li.append(str + " - Not Palindrome");
  }
  list2?.append(li);
}

function clearList(list: HTMLElement) {
  //Handle clearing the list.
  list.innerHTML = "";
}

form?.addEventListener("submit", checkPalindrome);
clear1?.addEventListener("click", () => clearList(list1));
clear2?.addEventListener("click", () => clearList(list2));
