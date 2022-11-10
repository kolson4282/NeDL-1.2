const bookUri = "api/books";
const genreUri = "api/genres";

let books: Book[] = [];
let genres: Genre[] = [];

//Types
type Book = {
  id: number;
  title: string;
  author: string;
  genreID: number;
};

type Genre = {
  id: number;
  name: string;
};

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

//genre crud stuff
const getGenres = async () => {
  const response = await fetch(genreUri);
  genres = await response.json();
  displayGenres();
};

const addGenre = async () => {
  const nameInput = document.getElementById(
    "add-genre-name"
  ) as HTMLInputElement;

  const genre = {
    name: nameInput.value,
  };
  await fetch(genreUri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(genre),
  });
  refresh();
};

const openGenreEdit = (id: number) => {
  const genre = genres.find((genre) => genre.id === id);
  if (!genre) return console.error("Couldn't find that genre");

  const nameEditInput = document.getElementById(
    "edit-genre-name"
  ) as HTMLInputElement;
  nameEditInput.value = genre.name;

  const genreEditInput = document.getElementById(
    "edit-genre-id"
  ) as HTMLInputElement;
  genreEditInput.value = `${genre.id}`;

  const genreEditForm = document.getElementById(
    "genreEditForm"
  ) as HTMLFormElement;
  genreEditForm.style.display = "block";
  genreEditForm.addEventListener("submit", (e) => updateGenre(e));
};

const updateGenre = async (e: Event) => {
  e.preventDefault();
  const nameEdit = document.getElementById(
    "edit-genre-name"
  ) as HTMLInputElement;
  const idEdit = document.getElementById("edit-genre-id") as HTMLInputElement;

  const genre = {
    name: nameEdit.value,
  };
  await fetch(`${genreUri}/${idEdit.value}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(genre),
  });
  closeGenreEdit();
  refresh();
};

const closeGenreEdit = () => {
  const genreEditForm = document.getElementById(
    "genreEditForm"
  ) as HTMLFormElement;
  genreEditForm.style.display = "none";
  genreEditForm.removeEventListener("submit", (e) => updateGenre(e));
};

const deleteGenre = async (id: number) => {
  await fetch(`${genreUri}/${id}`, { method: "DELETE" });
  refresh();
};

const displayGenres = () => {
  const genreTable = document.getElementById("genres") as HTMLTableElement;
  if (!genreTable) return;
  genreTable.innerHTML = "";

  genres.forEach((genre) => {
    const row = genreTable.insertRow();

    const nameCell = row.insertCell();
    nameCell.innerText = genre.name;

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = () => openGenreEdit(genre.id);
    const editCell = row.insertCell();
    editCell.append(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => deleteGenre(genre.id);
    const deleteCell = row.insertCell();
    deleteCell.append(deleteButton);
  });
  fillGenreSelect(
    document.getElementById("add-book-genre") as HTMLSelectElement
  );
};

const fillGenreSelect = (select: HTMLSelectElement) => {
  select.innerHTML = "";
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = `${genre.id}`;
    option.innerText = genre.name;

    select.append(option);
  });
};

//initialization stuff
const refresh = async () => {
  await getGenres();
  await getBooks();
};
refresh();

const bookAddForm = document.getElementById("bookAddForm") as HTMLFormElement;
bookAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBook();
});

const genreAddForm = document.getElementById("genreAddForm") as HTMLFormElement;
genreAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addGenre();
});
