import * as bootstrap from 'bootstrap';

const boardGameURI = 'api/boardgames'

/*  Get Board Games  */

const getAllBoardGames = async () => {
    const res = await fetch(boardGameURI);
    const boardGames = await res.json();
    displayGames(boardGames);
}


/*  Display Board Games  */

//button for use in adding rows.
const button = document.createElement('button');
button.classList.add("btn")

//table body to display results in
const boardGameTableBody = document.getElementById('boardGameTableBody')

const displayGames = (boardGames) => {
    boardGameTableBody.innerHTML = "";

    boardGames.forEach(game => {
        const row = boardGameTableBody.insertRow();

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox';
        checkbox.classList.add("form-check-input");
        checkbox.disabled = true;
        checkbox.checked = game.played;
        const playedCell = row.insertCell();
        playedCell.append(checkbox);

        const title = row.insertCell();
        title.append(game.title);

        const players = row.insertCell();
        players.append(game.numberOfPlayers);

        const link = document.createElement('a');
        link.classList.add("btn", "btn-link");
        link.href = game.directionsLink;
        link.target = "_blank";
        link.innerText = "Link";
        const linkCell = row.insertCell();
        linkCell.append(link);

        const timesPlayed = row.insertCell();
        timesPlayed.append(game.playedTimes);

        const addPlayedButton = button.cloneNode(false);
        addPlayedButton.innerHTML = "Add Played";
        addPlayedButton.onclick = () => addOneToPlayed(game);
        addPlayedButton.classList.add("btn-primary")
        const playedTimesCell = row.insertCell();
        playedTimesCell.append(addPlayedButton);

        const editButton = button.cloneNode(false);
        editButton.innerHTML = "Edit";
        editButton.onclick = () => showEditGameModal(game);
        editButton.classList.add("btn-secondary")
        const editCell = row.insertCell();
        editCell.append(editButton);

        const deleteButton = button.cloneNode(false);
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = () => deleteGame(game.id);
        deleteButton.classList.add("btn-danger")
        const deleteCell = row.insertCell();
        deleteCell.append(deleteButton);
    })

    /*<tr>
        < td > <input class="form-check-input" type="checkbox" disabled /></td >
        <td>Catan</td>
        <td>4</td>
        <td><a class="btn btn-link" href='https://www.catan.com/understand-catan/game-rules' target="_blank">Link</a></td>
        <td>10</td>
        <td><button class="btn btn-primary">Add Played</button></td>
        <td><button class="btn btn-secondary" id="editGameButton">Edit</button></td>
        <td><button class="btn btn-danger">Delete</button></td>
    </tr >*/
}

/*  Save New Game  */

const newGameModal = new bootstrap.Modal("#newGameModal");

const hideNewGameModal = () => {
    newGameModal.hide();
}

const showNewGameModal = () => {
    document.getElementById('newGameAlert').innerHTML = ""
    newGameModal.show();
}

const saveGame = async () => {
    const titleInput = document.getElementById("title");
    const directionsInput = document.getElementById("directions");
    const playersInput = document.getElementById("players");
    const playedTimesInput = document.getElementById("playedTimes")

    const game = {
        title: titleInput.value,
        directionsLink: directionsInput.value,
        numberOfPlayers: playersInput.value || 0,
        playedTimes: playedTimesInput.value || 0,
    }
    
    try {
        if (game.title == "" || game.directionsLink == "") {
            throw new Error("Could not add the game. Please update the form. ")
        }
        const res = await fetch(boardGameURI, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        })
        const json = await res.json();
        if (json.status >= 400 && json.status <= 500) {
            throw json
        }
        getAllBoardGames();
        titleInput.value = "";
        directionsInput.value = "";
        playersInput.value = "";
        playedTimesInput.value = "0"
        hideNewGameModal();
    } catch (err) {
        const newGameAlert = document.getElementById('newGameAlert');
        showAlert(newGameAlert, "Could not add game")
        console.error("An error occured: ", err)
    }
}

/*  Edit Game  */

const editGameModal = new bootstrap.Modal("#editGameModal");

const hideEditGameModal = () => {
    editGameModal.hide();
}

const showEditGameModal = (game) => {
    document.getElementById('editGameAlert').innerHTML = ""

    document.getElementById('editID').value = game.id;
    document.getElementById('editTitle').value = game.title;
    document.getElementById('editDirections').value = game.directionsLink;
    document.getElementById('editPlayers').value = game.numberOfPlayers;
    document.getElementById('editPlayedTimes').value = game.playedTimes;

    editGameModal.show();
}

const updateGame = async () => {

    const id = parseInt(document.getElementById('editID').value)
    const game = {
        id: id,
        title: document.getElementById("editTitle").value.trim(),
        directionsLink: document.getElementById("editDirections").value.trim(),
        numberOfPlayers: parseInt(document.getElementById("editPlayers").value),
        playedTimes: parseInt(document.getElementById("editPlayedTimes").value),
    }
    try {
        if (game.title == "" || game.directionsLink == "") {
            throw new Error("Could not update the game. ")
        }
       const res = await fetch(`${boardGameURI}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        })
        if (res.status >= 400) {
            throw res
        }
        getAllBoardGames();
        hideEditGameModal();
    } catch (err) {
        const editGameAlert = document.getElementById('editGameAlert');
        showAlert(editGameAlert, "Could not update game")
        console.error("Unable to update item: ", err)
    }

}

const addOneToPlayed = async (game) => {
    game.playedTimes++;
    try {
        await fetch(`${boardGameURI}/${game.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        })
        getAllBoardGames();
    } catch (err) {
        console.error("Unable to update item: ", err)
    }
}

/*  Delete Game  */

const deleteGame = async (id) => {
    try {
        await fetch(`${boardGameURI}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        getAllBoardGames();
    } catch (err) {
        console.error("An error occured", err)
    }
}

/*  Alerts  */

const showAlert = (element, message, type = "danger") => {
    element.innerHTML = ""
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    element.append(wrapper)
}

/*  Event listeners and start up stuff  */

const openNewModalButton = document.getElementById("openNewGameModal")
openNewModalButton.onclick = showNewGameModal;

const saveButton = document.getElementById("save")
saveButton.onclick = saveGame;

const updateButton = document.getElementById("update")
updateButton.onclick = updateGame;

getAllBoardGames();
