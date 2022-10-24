const list = document.getElementById("ipsumList") as HTMLElement;
const jsonContainer = document.getElementById("json") as HTMLElement;
const paragraphs = document.getElementById("paragraphs") as HTMLInputElement;
const typeSelect = document.getElementById("typeSelect") as HTMLSelectElement;

const fillData = async () => {
  list.innerHTML = "";
  jsonContainer.innerHTML = "";
  const ipsum = (await getIpsum(
    paragraphs.value,
    typeSelect.value
  )) as string[];
  ipsum.forEach((line) => {
    const p = document.createElement("p");
    p.innerText = line;
    list.append(p);
  });
  jsonContainer.append(JSON.stringify(ipsum));
};

const getIpsum = async (
  paras: string = "5",
  type: string = "meat-and-filler"
) => {
  const result = await fetch(
    `https://baconipsum.com/api/?type=${type}&paras=${paras}`
  );
  return result.json();
};
