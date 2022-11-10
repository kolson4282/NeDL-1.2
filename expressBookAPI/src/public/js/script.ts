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
