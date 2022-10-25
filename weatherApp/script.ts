const cities = {
  omaha: { office: "OAX", gridX: 82, gridY: 59 },
  denver: { office: "BOU", gridX: 62, gridY: 61 },
  la: { office: "LOX", gridX: 154, gridY: 44 },
};

const citySelector = document.getElementById("city") as HTMLSelectElement;
const forcastDiv = document.getElementById("forcast") as HTMLElement;
const weeklyDiv = document.getElementById("weekly") as HTMLElement;

console.log(citySelector, forcastDiv, weeklyDiv);
