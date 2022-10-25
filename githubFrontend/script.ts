const form = document.querySelector("form") as HTMLFormElement;
const userIDInput = document.getElementById("userID") as HTMLInputElement;
const repoList = document.getElementById("repos") as HTMLUListElement;
const repoInfo = document.getElementById("repoInfo") as HTMLElement;

const getInfo = async (user: string) => {
  //desplay all of the repos for a selected user.
  const results = await fetch(`https://api.github.com/users/${user}/repos`);
  const data: { html_url: string; name: string; contents_url: string }[] =
    await results.json();
  data.forEach((repo) => {
    //currently using buttons. Each button will cause the page to display that repos contents.
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = repo.name;
    button.onclick = () => {
      repoInfo.innerHTML = "";
      getRepoInfo(repo.contents_url.replace("{+path}", ""), repo.name);
    };
    li.append(button);
    repoList.append(li);
  });
};

const getRepoInfo = async (repoURL: string, repoName: string) => {
  //Initial info for the repo. Gives all of the root level files and folders.
  const results = await fetch(repoURL);
  const contents: {
    url: string;
    name: string;
    type: string;
    download_url: string;
  }[] = await results.json();
  const div = document.createElement("div");
  repoInfo.innerHTML += `<h2>${repoName}</h2>`;
  contents.forEach((file) => {
    //each file and folder is a button, that when clicked displays it's contents.
    const button = document.createElement("button");
    button.innerText = file.name;
    button.onclick = () => {
      getFileInfo(file, div, repoInfo);
      div.innerText = "";
    };
    repoInfo.append(button);
  });
};

const getFileInfo = async (
  file: {
    url: string;
    name: string;
    type: string;
    download_url: string;
  },
  div: HTMLElement,
  parentDiv: HTMLElement
) => {
  //display the info for a selected file or folder.
  parentDiv.append(div); //this makes it easier to delete stuff later...
  const nextDiv = document.createElement("div");

  div.innerHTML += `<h2>${file.name}</h2>`;
  if (file.type == "file") {
    //if a file, display the text contents of the file, along with a title showing which file it is.
    const results = await fetch(file.download_url);
    const contents = await results.text();
    const p = document.createElement("p");
    p.innerText = contents;
    p.classList.add("code");
    div.append(p);
  } else {
    //else if this is a  folder, call this function to display the folders contents.
    const results = await fetch(file.url);
    const contents: any[] = await results.json();
    contents.forEach((file) => {
      const button = document.createElement("button");
      button.innerText = file.name;
      button.onclick = () => {
        nextDiv.innerText = "";
        getFileInfo(file, nextDiv, div);
      };
      div.append(button);
    });
  }
};

const submit = (e: Event) => {
  e.preventDefault();
  repoList.innerHTML = "";
  repoInfo.innerHTML = "";
  getInfo(userIDInput.value);
};

form.onsubmit = submit;
