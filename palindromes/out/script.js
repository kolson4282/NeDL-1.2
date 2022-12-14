var list1 = document.getElementById("list1");
var list2 = document.getElementById("list2");
var form = document.getElementById("palindromeForm");
var clear1 = document.getElementById("clear1");
var clear2 = document.getElementById("clear2");
function checkPalindrome(e) {
    //this happens on submit of the form
    if (!e.target) {
        return;
    }
    e.preventDefault();
    var test = e.target["palindrome"].value;
    if (test === "") {
        alert("Must enter a word to check");
        return;
    }
    var alg = e.target["alg"].value;
    if (alg === "1") {
        palindrome1(test);
    }
    else if (alg === "2") {
        palindrome2(test);
    }
    else {
        alert("Invalid Algorithm to use. Must use 1 or 2");
        e.target["alg"].value = "1";
    }
    e.target["palindrome"].value = "";
    e.target["palindrome"].focus();
}
function palindrome1(str) {
    //first alg. Go through the string and reverse it and then compare
    var testString = str.toLowerCase().replace(/ /g, "");
    var reversed = "";
    for (var i = testString.length - 1; i >= 0; i--) {
        reversed += testString[i];
    }
    var li = document.createElement("li");
    if (reversed === testString) {
        li.append(str + " - Palindrome");
    }
    else {
        li.append(str + " - Not Palindrome");
    }
    list1 === null || list1 === void 0 ? void 0 : list1.append(li);
}
function palindrome2(str) {
    //second alg. Use string and array functions to reverse the string
    var testString = str.toLowerCase().replace(/ /g, "");
    var reversed = testString.split("").reverse().join("");
    var li = document.createElement("li");
    if (reversed === testString) {
        li.append(str + " - Palindrome");
    }
    else {
        li.append(str + " - Not Palindrome");
    }
    list2 === null || list2 === void 0 ? void 0 : list2.append(li);
}
function clearList(list) {
    //Handle clearing the list.
    list.innerHTML = "";
}
form === null || form === void 0 ? void 0 : form.addEventListener("submit", checkPalindrome);
clear1 === null || clear1 === void 0 ? void 0 : clear1.addEventListener("click", function () { return clearList(list1); });
clear2 === null || clear2 === void 0 ? void 0 : clear2.addEventListener("click", function () { return clearList(list2); });
