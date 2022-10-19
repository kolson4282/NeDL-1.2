const list1 = document.getElementById("list1");
const list2 = document.getElementById("list2");
const form = document.getElementById("palindromeForm");
const clear1 = document.getElementById("clear1");
const clear2 = document.getElementById("clear2");

function checkPalindrome(e: SubmitEvent) {
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
    if (palindrome1(test)) {
      e.target["palindrome"].value = "";
    }
  } else if (alg === "2") {
    if (palindrome2(test)) {
      e.target["palindrome"].value = "";
    }
  } else {
    alert("Invalid Algorithm to use. Must use 1 or 2");
    e.target["alg"].value = "1";
  }
  e.target["palindrome"].focus();
}

function palindrome1(str: string) {
  const testString = str.toLowerCase().replace(/ /g, "");
  let reversed = "";
  for (let i = testString.length - 1; i >= 0; i--) {
    reversed += testString[i];
  }
  const isPalindrome = reversed === testString;
  if (!isPalindrome) {
    alert("That is not a palindrome");
    return false;
  }
  const li = document.createElement("li");
  li.append(str);
  list1?.append(li);
  return true;
}

function palindrome2(str: string) {
  const testString = str.toLowerCase().replace(/ /g, "");
  let reversed = testString.split("").reverse().join("");
  const isPalindrome = reversed === testString;
  if (!isPalindrome) {
    alert("That is not a palindrome");
    return false;
  }
  const li = document.createElement("li");
  li.append(str);
  list2?.append(li);
  return true;
}

function clearList(list: HTMLElement) {
  list.innerHTML = "";
}

form?.addEventListener("submit", checkPalindrome);
clear1?.addEventListener("click", () => clearList(list1));
clear2?.addEventListener("click", () => clearList(list2));
