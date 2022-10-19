var list1 = document.getElementById("list1");
var list2 = document.getElementById("list2");
var form = document.getElementById("palindromeForm");
var clear1 = document.getElementById("clear1");
var clear2 = document.getElementById("clear2");
function checkPalindrome(e) {
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
        if (palindrome1(test)) {
            e.target["palindrome"].value = "";
        }
    }
    else if (alg === "2") {
        if (palindrome2(test)) {
            e.target["palindrome"].value = "";
        }
    }
    else {
        alert("Invalid Algorithm to use. Must use 1 or 2");
        e.target["alg"].value = "1";
    }
    e.target["palindrome"].focus();
}
function palindrome1(str) {
    var testString = str.toLowerCase().replace(/ /g, "");
    var reversed = "";
    for (var i = testString.length - 1; i >= 0; i--) {
        reversed += testString[i];
    }
    var isPalindrome = reversed === testString;
    if (!isPalindrome) {
        alert("That is not a palindrome");
        return false;
    }
    var li = document.createElement("li");
    li.append(str);
    list1 === null || list1 === void 0 ? void 0 : list1.append(li);
    return true;
}
function palindrome2(str) {
    var testString = str.toLowerCase().replace(/ /g, "");
    var reversed = testString.split("").reverse().join("");
    var isPalindrome = reversed === testString;
    if (!isPalindrome) {
        alert("That is not a palindrome");
        return false;
    }
    var li = document.createElement("li");
    li.append(str);
    list2 === null || list2 === void 0 ? void 0 : list2.append(li);
    return true;
}
function clearList(list) {
    list.innerHTML = "";
}
form === null || form === void 0 ? void 0 : form.addEventListener("submit", checkPalindrome);
clear1 === null || clear1 === void 0 ? void 0 : clear1.addEventListener("click", function () { return clearList(list1); });
clear2 === null || clear2 === void 0 ? void 0 : clear2.addEventListener("click", function () { return clearList(list2); });