const contentDiv = document.getElementById("content") as HTMLDivElement;
const authorDiv = document.getElementById("author") as HTMLDivElement;

const form = document.getElementById("userInput") as HTMLFormElement;
const minLengthInput = document.getElementById("minLength") as HTMLInputElement;
const maxLengthInput = document.getElementById("maxLength") as HTMLInputElement;

type ReturnObject = {
  _id: string;
  // The quotation text
  content: string;
  // The full name of the author
  author: string;
  // The `slug` of the quote author
  authorSlug: string;
  // The length of quote (number of characters)
  length: number;
  // An array of tag names for this quote
  tags: string[];
};

const displayQuote = async (min: string, max: string) => {
  const result = await fetch(
    `https://api.quotable.io/random?minLength=${min}&maxLength=${max}`
  );
  const { content, author }: ReturnObject = await result.json();
  contentDiv.innerText = content;
  authorDiv.innerText = author;
};

const onSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  displayQuote(minLengthInput.value, maxLengthInput.value);
  minLengthInput.focus();
};

form.addEventListener("submit", onSubmit);
