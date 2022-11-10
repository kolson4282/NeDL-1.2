"use strict";
fetch("/api/books")
    .then((res) => res.json())
    .then((data) => {
    const bookList = document.getElementById("books");
    data.forEach((book) => (bookList.innerHTML += `<li>${book.title}</li>`));
});
//# sourceMappingURL=script.js.map