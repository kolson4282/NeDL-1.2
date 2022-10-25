//Weather Forecast App

//city data from https://github.com/jasperdebie/VisInfo/blob/master/us-state-capitals.csv

type GridPoint = {
  state: string;
  office: string;
  gridX: number;
  gridY: number;
};

type Period = {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
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
  Montgomery: {
    state: "Alabama",
    office: "BMX",
    gridX: 80,
    gridY: 34,
  },
  Juneau: {
    state: "Alaska",
    office: "AJK",
    gridX: 194,
    gridY: 163,
  },
  Phoenix: {
    state: "Arizona",
    office: "PSR",
    gridX: 157,
    gridY: 57,
  },
  "Little Rock": {
    state: "Arkansas",
    office: "LZK",
    gridX: 81,
    gridY: 72,
  },
  Sacramento: {
    state: "California",
    office: "STO",
    gridX: 40,
    gridY: 67,
  },
  Denver: {
    state: "Colorado",
    office: "BOU",
    gridX: 62,
    gridY: 60,
  },
  Hartford: {
    state: "Connecticut",
    office: "BOX",
    gridX: 22,
    gridY: 54,
  },
  Dover: {
    state: "Delaware",
    office: "PHI",
    gridX: 42,
    gridY: 37,
  },
  Honolulu: {
    state: "Hawaii",
    office: "HFO",
    gridX: 153,
    gridY: 144,
  },
  Tallahassee: {
    state: "Florida",
    office: "TAE",
    gridX: 83,
    gridY: 85,
  },
  Atlanta: {
    state: "Georgia",
    office: "FFC",
    gridX: 50,
    gridY: 86,
  },
  Boise: {
    state: "Idaho",
    office: "BOI",
    gridX: 133,
    gridY: 85,
  },
  Springfield: {
    state: "Illinois",
    office: "ILX",
    gridX: 46,
    gridY: 55,
  },
  Indianapolis: {
    state: "Indiana",
    office: "IND",
    gridX: 57,
    gridY: 68,
  },
  "Des Moines": {
    state: "Iowa",
    office: "DMX",
    gridX: 73,
    gridY: 48,
  },
  Topeka: {
    state: "Kansas",
    office: "TOP",
    gridX: 80,
    gridY: 47,
  },
  Frankfort: {
    state: "Kentucky",
    office: "LMK",
    gridX: 80,
    gridY: 76,
  },
  "Baton Rouge": {
    state: "Louisiana",
    office: "LIX",
    gridX: 25,
    gridY: 109,
  },
  Augusta: {
    state: "Maine",
    office: "GYX",
    gridX: 85,
    gridY: 90,
  },
  Annapolis: {
    state: "Maryland",
    office: "LWX",
    gridX: 115,
    gridY: 78,
  },
  Boston: {
    state: "Massachusetts",
    office: "BOX",
    gridX: 71,
    gridY: 90,
  },
  Lansing: {
    state: "Michigan",
    office: "GRR",
    gridX: 78,
    gridY: 38,
  },
  "St. Paul": {
    state: "Minnesota",
    office: "MPX",
    gridX: 113,
    gridY: 70,
  },
  Jackson: {
    state: "Mississippi",
    office: "JAN",
    gridX: 75,
    gridY: 62,
  },
  "Jefferson City": {
    state: "Missouri",
    office: "LSX",
    gridX: 25,
    gridY: 69,
  },
  Helena: {
    state: "Montana",
    office: "TFX",
    gridX: 69,
    gridY: 103,
  },
  Lincoln: {
    state: "Nebraska",
    office: "OAX",
    gridX: 55,
    gridY: 39,
  },
  "Carson City": {
    state: "Nevada",
    office: "REV",
    gridX: 43,
    gridY: 89,
  },
  Concord: {
    state: "New Hampshire",
    office: "GYX",
    gridX: 37,
    gridY: 30,
  },
  Trenton: {
    state: "New Jersey",
    office: "PHI",
    gridX: 61,
    gridY: 89,
  },
  "Santa Fe": {
    state: "New Mexico",
    office: "ABQ",
    gridX: 125,
    gridY: 142,
  },
  Raleigh: {
    state: "North Carolina",
    office: "RAH",
    gridX: 73,
    gridY: 56,
  },
  Bismarck: {
    state: "North Dakota",
    office: "BIS",
    gridX: 109,
    gridY: 47,
  },
  Albany: {
    state: "New York",
    office: "ALY",
    gridX: 58,
    gridY: 58,
  },
  Columbus: {
    state: "Ohio",
    office: "ILN",
    gridX: 84,
    gridY: 80,
  },
  "Oklahoma City": {
    state: "Oklahoma",
    office: "OUN",
    gridX: 97,
    gridY: 94,
  },
  Salem: {
    state: "Oregon",
    office: "PQR",
    gridX: 95,
    gridY: 78,
  },
  Harrisburg: {
    state: "Pennsylvania",
    office: "CTP",
    gridX: 105,
    gridY: 36,
  },
  Providence: {
    state: "Rhode Island",
    office: "BOX",
    gridX: 64,
    gridY: 64,
  },
  Columbia: {
    state: "South Carolina",
    office: "CAE",
    gridX: 65,
    gridY: 61,
  },
  Pierre: {
    state: "South Dakota",
    office: "ABR",
    gridX: 54,
    gridY: 43,
  },
  Nashville: {
    state: "Tennessee",
    office: "OHX",
    gridX: 49,
    gridY: 56,
  },
  Austin: {
    state: "Texas",
    office: "EWX",
    gridX: 155,
    gridY: 90,
  },
  "Salt Lake City": {
    state: "Utah",
    office: "SLC",
    gridX: 100,
    gridY: 175,
  },
  Montpelier: {
    state: "Vermont",
    office: "BTV",
    gridX: 110,
    gridY: 49,
  },
  Richmond: {
    state: "Virginia",
    office: "AKQ",
    gridX: 45,
    gridY: 76,
  },
  Olympia: {
    state: "Washington",
    office: "SEW",
    gridX: 100,
    gridY: 44,
  },
  Charleston: {
    state: "West Virginia",
    office: "RLX",
    gridX: 62,
    gridY: 66,
  },
  Madison: {
    state: "Wisconsin",
    office: "MKX",
    gridX: 37,
    gridY: 63,
  },
  Cheyenne: {
    state: "Wyoming",
    office: "CYS",
    gridX: 109,
    gridY: 13,
  },
};

const baseURL = "https://api.weather.gov/gridpoints";

const cityLabel = document.getElementById("cityLabel") as HTMLElement;
const citySelector = document.getElementById("city") as HTMLSelectElement;
const forecastButton = document.getElementById(
  "getForecast"
) as HTMLButtonElement;
const forecastDiv = document.getElementById("forecast") as HTMLElement;
const weeklyDiv = document.getElementById("weekly") as HTMLElement;
const hourlyDiv = document.getElementById("hourly") as HTMLElement;

function fillSelect() {
  for (let city in cities) {
    const option = document.createElement("option");
    option.value = city;
    option.innerText = `${city}, ${cities[city].state}`;
    citySelector.append(option);
  }
}

function updateForecast() {
  const city: GridPoint = cities[citySelector.value];
  cityLabel.innerText = `${citySelector.value}, ${city.state}`;
  createWeeklyForecast(city);
  createHourlyForecast(city);
}

async function createWeeklyForecast(city: GridPoint) {
  const result = await fetch(
    `${baseURL}/${city.office}/${city.gridX},${city.gridY}/forecast`
  );
  const forecast: Forecast = await result.json();
  const forecastText = document.createElement("h4");
  forecastText.innerText = forecast.properties.periods[0].detailedForecast;
  forecastDiv.append(forecastText);
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
}

async function createHourlyForecast(city: GridPoint) {
  const result = await fetch(
    `${baseURL}/${city.office}/${city.gridX},${city.gridY}/forecast/hourly`
  );
  const forecast: Forecast = await result.json();
  const periods = forecast.properties.periods;

  for (let i = 0; i < 24; i++) {
    const period = periods[i];
    const date = new Date(period.startTime);
    let hour = "";
    if (date.getHours() === 0) {
      hour = "12 AM";
    } else if (date.getHours() > 12) {
      hour = `${date.getHours() - 12} PM`;
    } else if (date.getHours() === 12) {
      hour = "12 PM";
    } else {
      hour = `${date.getHours()} AM`;
    }
    const time = document.createElement("p");
    time.innerText = hour;

    const temp = document.createElement("p");
    temp.innerText = `Temp: ${period.temperature} \xB0 ${period.temperatureUnit} `;

    const icon = document.createElement("img");
    icon.src = period.icon;
    icon.alt = period.name;

    const short = document.createElement("p");
    short.innerText = period.shortForecast;

    const hourDiv = document.createElement("div");
    hourDiv.append(time);
    hourDiv.append(temp);
    hourDiv.append(icon);
    hourDiv.append(short);

    hourlyDiv.append(hourDiv);
  }
}

forecastButton.onclick = () => {
  updateForecast();
  forecastDiv.innerHTML = "";
  weeklyDiv.innerHTML = "";
  hourlyDiv.innerHTML = "";
};

fillSelect();
updateForecast();
