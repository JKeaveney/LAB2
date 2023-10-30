function getUserInfo() {
    const username = document.getElementById("username").value;
    if (!username) return;
    fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then((data) => {
            const { avatar_url, name, bio, repos_url } = data;
            document.getElementById("avatar").src = avatar_url;
            document.getElementById("name").textContent = name || "Name not found";
            document.getElementById("bio").textContent = bio || "Bio not found";
            return fetch(repos_url);
        })
        .then((response) => response.json())
        .then((repos) => {
            const reposList = document.getElementById("repos");
            reposList.innerHTML = ""; //clear entries
            if (repos.length === 0) {
                reposList.innerHTML = "No repositories found.";
            } else {
                const numToShow = Math.min(repos.length, 5);
                for (let i = 0; i < numToShow; i++) {
                    const listItem = document.createElement("li");
                    listItem.textContent = repos[i].name;
                    reposList.appendChild(listItem);
                }
                if (repos.length > 5) {
                    const moreRepos = document.createElement("li");
                    moreRepos.textContent = `+ ${repos.length - 5} more repositories.`;
                    reposList.appendChild(moreRepos);
                }
            }
            document.querySelector(".user-info").style.display = "flex";
        })
        .catch((error) => {
            console.error("There was a problem fetching your data:", error);
        });
}
