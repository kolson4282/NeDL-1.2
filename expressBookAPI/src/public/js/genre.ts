const genreUri = "api/genres";

type Genre = {
  id: number;
  name: string;
};

let genres: Genre[] = [];

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
