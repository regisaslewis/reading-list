Regis's Reading List

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