const bookList = document.getElementById("booklist");

document.addEventListener("DOMContentLoaded", loadDatabase)

function loadDatabase () {
  fetch(`http://localhost:3000/novels`)
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((e) => {
      let tile = document.createElement("div");
      tile.className = "booktile";
      tile.innerHTML = `<img src=${e.coverImage}>
      <div class="p-div"><p>${e.title}</p></div>`
      bookList.appendChild(tile);
    })
  })
}
