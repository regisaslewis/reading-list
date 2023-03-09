Regis's Book List

Part 1: The Plan

  I've always wanted to have a comprehensive list of all of the books I've read in my lifetime.  Not necessarily a public thing, just a document or database where I could look (with some degree of pride, hopefully) at a growing collection of books that I've read.

  There's no end, really, to how far back I could go with something like this, however, to get things started, I'd more or less like to just get a handful of the most recent books I've read and any that I'm currently working my way through.

  Within the database, I'd include details about the book itself (author, title, an image, and maybe a brief description) as well as info about whether I've finished the book yet and perhaps a comment or review score about the book.

  My proposed order for constructing the webpage is to set up a very rough skeleton of the HTML, getting the main areas sectioned off and allow for input and interaction.  Then, a little styling could be added in CSS to visually clarify each area.

  The bulk of the work will be adding functionality through JavaScript.  There are three tasks I'd like like the site to be able to perform.
    1) Using fetch, GET the contents of my collection and display them on screen.
      - I could also allow individual titles to be clicked on, focusing on each title individually, using another GET request.
    2) Allowing new titles to be added to the database using POST.
    3) Then, I should be able to edit the contents of an entry with PATCH, when a book is finished or if other information needs to be altered.

  Once the fetch functionality is squared away and operating as intended, then I plan on adding a little more to snazz up the site.  Nothing's set in stone yet, but I'm thinking that the information concerning where I am in the process of reading the book would look better as an element that appears when the mouse hovers over the image of the book's cover.  Or something in that vein.  I'll have to consider it more once I get further along.

Part 2: Building the Structure

  So, the layout is more or less decided on.  I wasn't sure if I was going to do a sidebar with titles appearing along the left edge of the page or something fixed to the top, but in the end, I decided to actually place the book list at the bottom.  The header is up top, also fixed in place.  This will keep the important content central.

  Something about setting it up this way it feels more like a book.  There are a few more elements of styling I'll add later on, but those will have to be appended to DOM elements.

  While I know that styling isn't necessary for building a site or an app and that functionality is far more critical, having some semblance of a structure truly helps me flesh out how, where, and when events should happen once I get to the JavaScript.  Making code in a vaccuum can be less engaging without being able to see the work I'm doing affect an actual space.  The stark white background of an empty page looms and glares, soulless, abandoned.  This feels more like working with my hands than working in the purely abstract.

Part 3: Populating the Database

  As I said in the plan, I'm not going to get as exhaustive as I could with the contents of the book list.  Eventually, I could see myself doing so.  For now, though, I'm just going to work with a small number of examples.  What I've included are two books that I've finished recently and one that I'm currently working on.

  The reason for including one I've yet completed is so that there is something edit later on, when that functionality has been added.  This will also allow me to show the differences in content that appears on the page between a book I've finished reading and one I haven't.

Part 4: Setting up the page's initial state with DOMContentLoaded

  Now that I've added some content to the database, it's time to figure out how the page will look as soon a visitor arrives.  This will utilize the most general fetch, one that pulls all the contents of the database and appends it to the screen.

  In order to get each element of database to appear on screen without any input by the user, I employeed an event listener on the document itself with the first parameter set to "DOMContentLoaded."  This simply begins a function as soon the elements of an HTML file have loaded.  By doing so, any complex or convoluted functions that might need to occur in other areas of the page can be ignored and allow some action to take place.

  In this case, it's a GET request of all the contents of the database.  The function looks like this: 

  ```
  const bookList = document.geteElementById("booklist");

  function loadDatabase () {
  fetch(`http://localhost:3000/novels`)
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((e) => {
      let tile = document.createElement("div");
      tile.className = "booktile";
      tile.innerHTML = `<img src=${e.coverImage}>`
      bookList.appendChild(tile);
    })
  })
}
  ```

  Now, by iterating through the contents of the database with .forEach(), instead of an empty row, the div along the bottom of the page includes the cover image of books in my list.  I'll add the title as an element that appears when the mouse hovers over the image later.  But for now, there are a few things to note.  By adding the "className" to each "tile," all the styling I've already established in CSS is immediately applied.  If I need to go in and tweak anything, it will affect them all, not just one at a time.  In the CSS, I added a light border to one side and a box-shadow to the other, simulating pages and shadow on the smaller images.

  So far, so good.  Now, to put in some more functionality.

  Part 5: Populating each entry
  
  Once the full list of books was present in it's horizontal home along the bottom of the page, I can finally get something to happen with the giant, empty center.  This is the main stage, so to speak, where the important information should be.

  I added an event listener to each "tile" in the list of books, so that, once clicked, it will fill append the details from the database onto the central area.  This took another fetch request, on that uses the ID number of each entry to present that specific one.

  Here's how it looks:

  ```
  function showBig(ele) {
  fetch(`http://localhost:3000/novels/${ele.id}`)
    .then((resp) => resp.json())
    .then((data) => buildInterior(data))
}
  ```

  Simply put, when the showBig() function is input, it will activate a much larger, more complex function that I've worked out to show all the contents from the book entry that's been clicked on.  The "ele" parameter will be taken from the iteration through the database found in the forEach method of the loadDatabase() function.
  
  Basically, showBig() is a callback function nested within the loadDatabase() function that gains its info the same way I got the cover image for each of the "tiles".

  Then, there's the big one.  The function buildInterior() needed to be a little more complex.  Not only will it need to append more information than just the cover image, it will need to add functionality to any entry that I haven't finished reading.  This will allow incomplete books to be updated with a rating and comment once I've finsihed reading them.  Here is the code:

  ```
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
  ```

  Starting off, I declarde all the variables I'll need to create in either circumstance (if the book has been finished or has not).  Then, all of the details of each newly created element was added (id, placeholders, text, and HTML).  Once that was done, I went ahead and put down the content for any book I've already completed reading, since no further functionality is needed in that case.  

  For books that I haven't read, the "completed" key in their db.json file is set to the boolean *false*.  Any *false* entry will need the comment and rating section removed and replaced with input fields whose values will provide that data once I'm done reading.

  By appending all those elements -- the two input fields and the button -- I could then add an event listener to the button that takes the values from the input fields, uses the PATCH method to update the db.json file for the individual entry, and then callback showBig() for the current entry with the updated info, all without refreshing the page.

  While it looks like a lot of code, it is honestly establishing the new elements that took up most of it, something that would be easily relegated to HTML if they weren't being created on the fly as the event listener is activated.  If you cancel out all those lines, there are simply two if...else statements, a PATCH request and a GET request in the buildInterior() function, so not all that crazy, really.
