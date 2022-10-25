"use strict";
const cities = {
    omaha: { office: "OAX", gridX: 82, gridY: 59 },
    denver: { office: "BOU", gridX: 62, gridY: 61 },
    la: { office: "LOX", gridX: 154, gridY: 44 },
};
const citySelector = document.getElementById("city");
const forcastDiv = document.getElementById("forcast");
const weeklyDiv = document.getElementById("weekly");
console.log(citySelector, forcastDiv, weeklyDiv);
