const bookUri = "api/books";
//Types
type Book = {
  id: number;
  title: string;
  author: string;
  genreID: number;
};

let books: Book[] = [];

//book crud stuff
const getBooks = async () => {
  const response = await fetch(bookUri);
  books = await response.json();
  displayBooks();
};

const addBook = async () => {
  const titleInput = document.getElementById(
    "add-book-title"
  ) as HTMLInputElement;
  const authorInput = document.getElementById(
    "add-book-author"
  ) as HTMLInputElement;
  const genreSelect = document.getElementById(
    "add-book-genre"
  ) as HTMLSelectElement;

  const book = {
    title: titleInput.value,
    author: authorInput.value,
    genreID: genreSelect.value,
  };
  await fetch(bookUri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  titleInput.value = "";
  authorInput.value = "";
  genreSelect.value = `${genres[0].id}`;
  getBooks();
};

const openBookEdit = (id: number) => {
  const book = books.find((book) => book.id === id);
  if (!book) return console.error("Couldn't find that book");

  const titleEditInput = document.getElementById(
    "edit-book-title"
  ) as HTMLInputElement;
  titleEditInput.value = book.title;

  const authorEditInput = document.getElementById(
    "edit-book-author"
  ) as HTMLInputElement;
  authorEditInput.value = book.author;

  const genreEditSelect = document.getElementById(
    "edit-book-genre"
  ) as HTMLSelectElement;
  fillGenreSelect(genreEditSelect);
  genreEditSelect.value = `${book.genreID}`;

  const idEditInput = document.getElementById(
    "edit-book-id"
  ) as HTMLInputElement;
  idEditInput.value = `${book.id}`;

  const bookEditForm = document.getElementById(
    "bookEditForm"
  ) as HTMLFormElement;
  bookEditForm.style.display = "block";
  bookEditForm.addEventListener("submit", (e) => updateBook(e));
};

const updateBook = async (e: Event) => {
  e.preventDefault();
  const titleEdit = document.getElementById(
    "edit-book-title"
  ) as HTMLInputElement;
  const authorEdit = document.getElementById(
    "edit-book-author"
  ) as HTMLInputElement;
  const genreEdit = document.getElementById(
    "edit-book-genre"
  ) as HTMLSelectElement;
  const idEdit = document.getElementById("edit-book-id") as HTMLInputElement;

  const book = {
    title: titleEdit.value,
    author: authorEdit.value,
    genreID: genreEdit.value,
  };

  await fetch(`${bookUri}/${idEdit.value}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  closeBookEdit();
  getBooks();
};

const closeBookEdit = () => {
  const bookEditForm = document.getElementById(
    "bookEditForm"
  ) as HTMLFormElement;
  bookEditForm.style.display = "none";
  bookEditForm.removeEventListener("submit", (e) => updateBook(e));
};

const deleteBook = async (id: number) => {
  await fetch(`${bookUri}/${id}`, { method: "DELETE" });
  refresh();
};

const displayBooks = () => {
  const bookTable = document.getElementById("books") as HTMLTableElement;
  if (!bookTable) return;
  bookTable.innerHTML = "";

  books.forEach((book) => {
    const row = bookTable.insertRow();

    const titleCell = row.insertCell();
    titleCell.innerText = book.title;

    const authorCell = row.insertCell();
    authorCell.innerText = book.author;

    const genreCell = row.insertCell();
    const genre = genres.find((genre) => genre.id == book.genreID);
    genreCell.innerText = genre?.name || "Not Found";

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = () => openBookEdit(book.id);
    const editCell = row.insertCell();
    editCell.append(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => deleteBook(book.id);
    const deleteCell = row.insertCell();
    deleteCell.append(deleteButton);
  });
};
