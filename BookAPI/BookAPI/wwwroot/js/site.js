const bookUri = 'api/books';
const genreUri = 'api/genres';
let books = [];
let genres = [];

function getItems() {
    getGenres();
}

//--------------- Book Crud Stuff -----------
function getBooks() {
    fetch(bookUri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addTitleTextbox = document.getElementById('add-title');
    const addAuthorTextbox = document.getElementById('add-author');

    const item = {
        isRead: false,
        title: addTitleTextbox.value.trim(),
        author: addAuthorTextbox.value.trim(),
        genreId: document.getElementById('add-book-genre').value
    };

    fetch(bookUri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addTitleTextbox.value = '';
            addAuthorTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${bookUri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = books.find(item => item.id === id);

    _fillGenreSelect(document.getElementById('edit-book-genre'))

    document.getElementById('edit-title').value = item.title;
    document.getElementById('edit-author').value = item.author;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-book-genre').value = item.genreId;
    document.getElementById('edit-isRead').checked = item.isRead;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isRead: document.getElementById('edit-isRead').checked,
        title: document.getElementById('edit-title').value.trim(),
        author: document.getElementById('edit-author').value.trim(),
        genreId: document.getElementById('edit-book-genre').value
    };

    fetch(`${bookUri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'book' : 'books';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('books');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isReadCheckbox = document.createElement('input');
        isReadCheckbox.type = 'checkbox';
        isReadCheckbox.disabled = true;
        isReadCheckbox.checked = item.isRead;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isReadCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.title);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        textNode = document.createTextNode(item.author);
        td3.appendChild(textNode);


        genre = genres.find(genre => genre.id === item.genreId)
            let td4 = tr.insertCell(3);
        if (genre) {
            textNode = document.createTextNode(genre.name);
            td4.appendChild(textNode);
        }

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });

    books = data;
}

function _fillGenreSelect(selectNode) {
    selectNode.innerHTML = "";
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.innerHTML = genre.name;

        selectNode.appendChild(option);
    })
}

//----------- Genre Crud Stuff ------------------
function getGenres() {
    fetch(genreUri)
        .then(response => response.json())
        .then(data => _displayGenres(data))
        .then(() => _fillGenreSelect(document.getElementById("add-book-genre")))
        .then(() => getBooks())
        .catch(error => console.error('Unable to get genres.', error));
}

function addGenre() {
    const addNameTextbox = document.getElementById('add-genre-name');

    const item = {
        name: addNameTextbox.value.trim(),
    };

    fetch(genreUri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getGenres();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add genre.', error));
}

function deleteGenre(id) {
    fetch(`${genreUri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getGenres())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayGenreEditForm(id) {
    const item = genres.find(item => item.id === id);

    document.getElementById('edit-genre-name').value = item.name;
    document.getElementById('edit-genre-id').value = item.id;
    document.getElementById('editGenreForm').style.display = 'block';
}

function updateGenre() {
    const itemId = document.getElementById('edit-genre-id').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.getElementById('edit-genre-name').value.trim()
    };

    fetch(`${genreUri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getGenres())
        .catch(error => console.error('Unable to update item.', error));

    closeGenreInput();

    return false;
}

function closeGenreInput() {
    document.getElementById('editGenreForm').style.display = 'none';
}

function _displayGenreCount(itemCount) {
    const name = (itemCount === 1) ? 'genre' : 'genres';

    document.getElementById('genre-counter').innerText = `${itemCount} ${name}`;
}

function _displayGenres(data) {
    const tBody = document.getElementById('genres');
    tBody.innerHTML = '';
    if (!data) {
        return;
    }

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayGenreEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteGenre(${item.id})`);

        let tr = tBody.insertRow();

        let td2 = tr.insertCell(0);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        let td4 = tr.insertCell(1);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(2);
        td5.appendChild(deleteButton);
    });

    genres = data;
}