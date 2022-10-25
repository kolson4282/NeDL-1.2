type GridPoint = {
  office: string;
  gridX: number;
  gridY: number;
};

type Period = {
  number: number;
  name: string;
  temperature: number;
  temperatureUnit: "F" | "C";
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
};

type Forecast = {
  properties: {
    periods: Period[];
  };
};

const cities: Record<string, GridPoint> = {
  omaha: { office: "OAX", gridX: 82, gridY: 59 },
  denver: { office: "BOU", gridX: 62, gridY: 61 },
  la: { office: "LOX", gridX: 154, gridY: 44 },
};
const baseURL = "https://api.weather.gov/gridpoints";

const citySelector = document.getElementById("city") as HTMLSelectElement;
const forecastButton = document.getElementById(
  "getForecast"
) as HTMLButtonElement;
const forecastDiv = document.getElementById("forecast") as HTMLElement;
const weeklyDiv = document.getElementById("weekly") as HTMLElement;

const updateForecast = async () => {
  const city: GridPoint = cities[citySelector.value];
  const result = await fetch(
    `${baseURL}/${city.office}/${city.gridX},${city.gridY}/forecast`
  );
  const forecast: Forecast = await result.json();
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
};

// citySelector.onchange = updateForcast;
forecastButton.onclick = () => {
  updateForecast();
  forecastDiv.innerHTML = "";
  weeklyDiv.innerHTML = "";
};

// console.log(citySelector, forcastDiv, weeklyDiv);
