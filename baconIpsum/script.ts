const list = document.getElementById("ipsumList");
const jsonContainer = document.getElementById("json");

const start = async () => {
  const ipsum = (await getIpsum()) as string[];
  ipsum.forEach((line) => {
    const li = document.createElement("p");
    li.innerText = line;
    list?.append(li);
  });
  jsonContainer?.append(JSON.stringify(ipsum));
};

const getIpsum = async () => {
  const result = await fetch(
    "https://baconipsum.com/api/?type=meat-and-filler&paras=3&start-with-lorem=1"
  );
  return result.json();
};

start();
