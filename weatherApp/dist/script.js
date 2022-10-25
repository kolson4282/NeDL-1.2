"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cities = {
    omaha: { office: "OAX", gridX: 82, gridY: 59 },
    denver: { office: "BOU", gridX: 62, gridY: 61 },
    la: { office: "LOX", gridX: 154, gridY: 44 },
};
const baseURL = "https://api.weather.gov/gridpoints";
const citySelector = document.getElementById("city");
const forecastButton = document.getElementById("getForecast");
const forecastDiv = document.getElementById("forecast");
const weeklyDiv = document.getElementById("weekly");
const updateForecast = () => __awaiter(void 0, void 0, void 0, function* () {
    const city = cities[citySelector.value];
    const result = yield fetch(`${baseURL}/${city.office}/${city.gridX},${city.gridY}/forecast`);
    const forecast = yield result.json();
    forecastDiv.innerText = forecast.properties.periods[0].detailedForecast;
    forecast.properties.periods.forEach((period) => {
        const name = document.createElement("h3");
        name.innerText = period.name;
        const temp = document.createElement("p");
        temp.innerText = `Temp: ${period.temperature} \xB0 ${period.temperatureUnit} `;
        const icon = document.createElement("img");
        icon.src = period.icon;
        icon.alt = period.name;
        const short = document.createElement("p");
        short.innerText = period.shortForecast;
        const dayDiv = document.createElement("div");
        dayDiv.append(name);
        dayDiv.append(temp);
        dayDiv.append(icon);
        dayDiv.append(short);
        weeklyDiv.append(dayDiv);
    });
});
// citySelector.onchange = updateForcast;
forecastButton.onclick = () => {
    updateForecast();
    forecastDiv.innerHTML = "";
    weeklyDiv.innerHTML = "";
};
// console.log(citySelector, forcastDiv, weeklyDiv);
