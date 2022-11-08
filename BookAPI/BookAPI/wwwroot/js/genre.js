const genreUri = 'api/genres';
let genres = [];

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

function _fillGenreSelect(selectNode) {
    selectNode.innerHTML = "";
    if (genres.length === 0) {
        const option = document.createElement('option');
        option.value = "";
        option.innerText = "Please add a genre to the genre list.";
        option.disabled = true;
        option.selected = true;

        selectNode.appendChild(option);
    } else {
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.innerHTML = genre.name;

            selectNode.appendChild(option);
        })
    }
}