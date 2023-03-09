const bookList = document.getElementById("booklist");
const singleBook = document.getElementById("single-book");
const bookImage = document.getElementById("book-image");
const bookDetails = document.getElementById("book-details");

document.addEventListener("DOMContentLoaded", loadDatabase)

function showBig(ele) {
  fetch(`http://localhost:3000/novels/${ele.id}`)
    .then((resp) => resp.json())
    .then((data) => buildInterior(data))
}

function loadDatabase () {
  fetch(`http://localhost:3000/novels`)
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((e) => {
      let tile = document.createElement("div");
      let title = document.createElement("div");
      tile.className = "booktile";
      tile.innerHTML = `<img src=${e.coverImage}>`
      title.className = "p-div",
      title.textContent = e.title;
      bookList.appendChild(tile);
      tile.appendChild(title);
      tile.addEventListener("mouseenter", () => {
        tile.style.transform = "scale(1.1)";
        title.style.display = "block";
      })
      tile.addEventListener("mouseleave", () => {
        tile.style.transform = "scale(1)";
        title.style.display = "none";
      })
      tile.addEventListener("click", () => showBig(e));
      fetch(`http://localhost:3000/novels/1`)
        .then((resp) => resp.json())
        .then((data) => buildInterior(data))
    })
  })
}

function buildInterior(ele) {
  let coverImage = document.createElement("img");
  let bookInfo = document.createElement("div");
  let completeDiv = document.createElement("div");
  let ratingInput = document.createElement("input");
  let commentInput = document.createElement("textarea");
  let finishButton = document.createElement("button");
  ratingInput.id = "rater";
  ratingInput.type = "number";
  ratingInput.placeholder = "Rating";
  ratingInput.min = "01";
  ratingInput.max = "10"
  commentInput.id = "commenter";
  commentInput.placeholder = "Assessment";
  finishButton.id = "finisher";
  finishButton.textContent = "Finished";
  completeDiv.innerHTML = `<h3>Rating:<br>${ele.rating} / 10</h3>
  <h4>My Assessment:<br><br>${ele.comment}`
  let editDiv = document.createElement("div");
  editDiv.id = "edit-box";
  editDiv.innerHTML = `<h4>When finished, fill this out</h4>`;
  bookImage.innerHTML = "";
  bookDetails.innerHTML = "";
  coverImage.className = "big-book";
  coverImage.src = ele.coverImage;
  bookInfo.className = "book-info";
  if (ele.completed === true) {
    ele.completed = "Yes";
  } else {
    ele.completed = "Working on it";
  }
  bookInfo.innerHTML = `<h2>Title:<br>${ele.title}</h2>
  <h2>Author:<br>${ele.author}</h2>
  <h3>Genre:<br>${ele.genre}</h3>
  <h4>Have I completed it yet:<br>${ele.completed}</h4>`
  bookImage.appendChild(coverImage);
  bookDetails.appendChild(bookInfo);
  if (ele.completed === "Yes") {
    bookInfo.appendChild(completeDiv);
  } else {
    bookInfo.appendChild(editDiv);
    editDiv.appendChild(ratingInput);
    editDiv.appendChild(commentInput);
    editDiv.appendChild(finishButton);

    finishButton.addEventListener("click", () => {
      let configObj = {
        completed: true,
        rating: Number(ratingInput.value),
        comment: commentInput.value
      };
      let editConfig = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(configObj)
      };
  
      fetch(`http://localhost:3000/novels/${ele.id}`, editConfig)
        .then((resp) => resp.json())
        .then((data) => {
          showBig(data);
        }) 
    })
  }
}