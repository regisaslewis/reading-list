const bookList = document.getElementById("booklist");
const singleBook = document.getElementById("single-book");
const bookImage = document.getElementById("book-image");
const bookDetails = document.getElementById("book-details");
const postButton = document.getElementById("post-button");
const hiddenDiv = document.getElementById("new-book-div");
const finishedButton = document.getElementById("finished");
const unfinishedButton = document.getElementById("unfinished");
const coverImage = document.getElementById("cover-image");
const bookInfo = document.getElementById("book-info");
const completeDiv = document.getElementById("complete-div");
const editDiv = document.getElementById("edit-div");

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

function loadDatabase (num=1) {
  fetch(`http://localhost:3000/novels/${num}`)
    .then((resp) => resp.json())
    .then((data) => buildInterior(data))
  fetch(`http://localhost:3000/novels`)
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((e) => {
      let tile = document.createElement("div");
      let tileImage = document.createElement("img");
      let title = document.createElement("div");
      tile.className = "booktile";
      tileImage.src = e.coverImage;
      title.className = "p-div",
      title.textContent = e.title;
      bookList.appendChild(tile);
      tile.appendChild(tileImage);
      tile.appendChild(title);
      tile.addEventListener("mouseenter", () => {
        tile.style.cursor = "pointer";
        tile.style.transform = "scale(1.1)";
        title.style.display = "block";
      })
      tile.addEventListener("mouseleave", () => {
        tile.style.cursor = "default";
        tile.style.transform = "scale(1)";
        title.style.display = "none";
      })
      tile.addEventListener("click", () => showBig(e));
    })
  })
}

function buildInterior(ele) {
  let editTitle = document.createElement("h4");
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
  editTitle.textContent = "When finished, fill this out:";
  bookImage.innerHTML = "";
  coverImage.src = ele.coverImage;
  if (ele.completed === true) {
    ele.completed = "Yes";
  } else {
    ele.completed = "Working on it";
  }
  document.getElementById("big-title").textContent = ele.title;
  document.getElementById("big-author").textContent = ele.author;
  document.getElementById("big-genre").textContent = ele.genre;
  document.getElementById("big-completed").textContent = ele.completed;
  document.getElementById("big-rating").textContent = `${ele.rating} / 10`
  document.getElementById("big-assess").textContent = ele.comment;
  bookImage.appendChild(coverImage);
  bookDetails.appendChild(bookInfo);
  if (ele.completed === "Yes") {
    completeDiv.style.display = "block";
    editDiv.style.display = "none";
  } else {
    editDiv.innerHTML = "";
    completeDiv.style.display = "none";
    editDiv.style.display = "flex";
    editDiv.appendChild(editTitle);
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
  fetch(`http://localhost:3000/novels`)
    .then((resp) => resp.json())
    .then(() => {
      let highestID = document.querySelectorAll(".booktile").length;
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
      loadDatabase(highestID + 1);
  })
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