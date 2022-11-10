fetch("/api/books")
  .then((res) => res.json())
  .then((data) => {
    const bookList = document.getElementById("books") as HTMLElement;
    data.forEach((book) => (bookList.innerHTML += `<li>${book.title}</li>`));
  });
