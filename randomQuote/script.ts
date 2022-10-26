const contentDiv = document.getElementById("content") as HTMLDivElement;
const authorDiv = document.getElementById("author") as HTMLDivElement;

const form = document.getElementById("userInput") as HTMLFormElement;
const minLengthInput = document.getElementById("minLength") as HTMLInputElement;
const maxLengthInput = document.getElementById("maxLength") as HTMLInputElement;
const tagSelect = document.getElementById("tags") as HTMLSelectElement;
const clearButton = document.getElementById("clear") as HTMLButtonElement;

const show = document.getElementById("show") as HTMLButtonElement;
const json = document.getElementById("json") as HTMLDivElement;

type ReturnObject = {
  _id?: string;
  // The quotation text
  content?: string;
  // The full name of the author
  author?: string;
  // The `slug` of the quote author
  authorSlug?: string;
  // The length of quote (number of characters)
  length?: number;
  // An array of tag names for this quote
  tags?: string[];
  statusCode?: number;
  statusMessage?: string;
};

type TagObject = {
  // The number of all tags by this request
  count: number;
  // The array of tags
  results: {
    _id: string;
    name: string;
  }[];
};

const displayQuote = async (min: string, max: string, tags = "") => {
  const result = await fetch(
    `https://api.quotable.io/random?minLength=${min}&maxLength=${max}&tags=${tags}`
  );
  const data: ReturnObject = await result.json();

  contentDiv.innerText = data.content || data.statusMessage || "";
  authorDiv.innerText =
    (data.author ? "- " + data.author : "") +
    (data.length ? " (Length: " + data.length + ")" : "");
  json.innerText = JSON.stringify(data);
};

const onSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  // const options = Array.from(tagSelect.options);
  // const selected: string[] = [];
  // options.forEach((option) => {
  //   if (option.selected) {
  //     selected.push(option.value);
  //   }
  // });
  displayQuote(minLengthInput.value, maxLengthInput.value, tagSelect.value);
  minLengthInput.focus();
};

const fillSubmit = async () => {
  const result = await fetch("https://api.quotable.io/tags");
  const data = await result.json();
  data.forEach((tag: { name: string }) => {
    const option = document.createElement("option");
    option.value = tag.name;
    option.innerText = tag.name;
    tagSelect.append(option);
  });
};

form.addEventListener("submit", onSubmit);
show.addEventListener("click", () => {
  json.classList.toggle("hidden");
  show.innerText = show.innerText === "Show JSON" ? "Hide JSON" : "Show JSON";
});
clearButton.addEventListener("click", (e) => {
  e.preventDefault();
  tagSelect.value = "";
});
fillSubmit();
