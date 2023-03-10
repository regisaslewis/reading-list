const bookList = document.getElementById("booklist");
const singleBook = document.getElementById("single-book");
const bookImage = document.getElementById("book-image");
const bookDetails = document.getElementById("book-details");
const postButton = document.getElementById("post-button");
const hiddenDiv = document.getElementById("new-book-div");
const finishedButton = document.getElementById("finished");
const unfinishedButton = document.getElementById("unfinished");
const coverImage = document.getElementById("cover-image");

document.addEventListener("DOMContentLoaded", () => {
  loadDatabase();
})

function showBig(ele) {
  fetch(`http://localhost:3000/novels/${ele.id}`)
    .then((resp) => resp.json())
    .then((data) => {
      buildInterior(data);
    })
}

function loadDatabase () {
  fetch(`http://localhost:3000/novels/1`)
    .then((resp) => resp.json())
    .then((data) => buildInterior(data))
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
    })
  })
}

function buildInterior(ele) {
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
  editDiv.innerHTML = `<h4>When finished, fill this out:</h4>`;
  bookImage.innerHTML = "";
  bookDetails.innerHTML = "";
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
        .then((data) => showBig(data)) 
    })
  }
}

function addBook() {
  if (hiddenDiv.style.display === "" || hiddenDiv.style.display === "none") {
    hiddenDiv.style.display = "block";
    postButton.textContent = "CLOSE";
  } else {
    hiddenDiv.style.display = "none";
    postButton.textContent = "Add New Book";
  }
}
postButton.addEventListener("click", addBook);

function cleanList() {
  bookList.innerHTML = "";
  hiddenDiv.style.display = "none";
  postButton.textContent = "Add New Book";
  document.getElementById("new-title").value = "";
  document.getElementById("new-author").value = "";
  document.getElementById("new-genre").value = "";
  document.getElementById("new-image").value = "";
  document.getElementById("new-title").value = "";
  if (document.getElementById("rating")) {
    document.getElementById("rating").value = "";
    document.getElementById("comment").value = "";
  }
  setTimeout(loadDatabase, "300");
}

function bookDone() {
  let rating = document.createElement("input");
  let comment = document.createElement("textarea");
  let newPostBtn = document.createElement("button");
  rating.type = "number";
  rating.id = "rating"
  rating.placeholder = "Rating";
  comment.placeholder = "Assessment";
  comment.style.width = "170px";
  comment.id = "comment";
  newPostBtn.textContent = "Post"
  newPostBtn.id = "newPost"
  hiddenDiv.appendChild(rating);
  hiddenDiv.appendChild(comment);
  hiddenDiv.appendChild(newPostBtn);
  newPostBtn.addEventListener("click", () => {
    postNew(true);
    cleanList();
  });
}
finishedButton.addEventListener("click", bookDone);

function postNew(boolean) {
  if (document.getElementById("new-title").value !== "") {
    let bodyObj = {
      title: document.getElementById("new-title").value,
      author: document.getElementById("new-author").value,
      genre: document.getElementById("new-genre").value,
      coverImage: document.getElementById("new-image").value
    };
    if (boolean === true) {
      bodyObj.completed = true;
      bodyObj.rating = Number(document.getElementById("rating").value);
      bodyObj.comment = document.getElementById("comment").value;
    } else {
        bodyObj.completed = false;
    }
    let postConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(bodyObj)
    }
    fetch(`http://localhost:3000/novels`, postConfig)
      .then((resp) => resp.json)
      .then((data) => data)
    }
}
unfinishedButton.addEventListener("click", () => {
  postNew(false);
  cleanList();
});