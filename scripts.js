// global variables
let bookFormCard = null;
const myLibrary = [];

// function that uses a button to create a form where the user inputs the required fields to add a new book
function createBookInterface(){

    // creates the div where the inputs will go
    const card = document.createElement("div");
    bookFormCard = card;
    
    // adding elements to card div
    const cardTitle = document.createElement("h1");
    cardTitle.innerText = "Add a New Book!"
    card.appendChild(cardTitle);

    // declare new button and use it to add elements to the library
    const addBookButton = document.createElement("button");
    addBookButton.innerText = "Add Book to Library";
    addBookButton.id = "add-button";
    addBookButton.addEventListener('click', function(){
        bookToLibrary();
    });

    // function that loops through an array to add elements to the div
    const elementsArray = ["Book Title", "Author", "Number of Pages"];
    const idArray = ['title', 'author', 'pages'];
    function createElements(elementsArray, card){
        elementsArray.forEach((element, index) => {
            let elementLabel = document.createElement("label");
            let elementInput = document.createElement("input");
            elementLabel.innerText = element;
            elementInput.id = idArray[index];
            if(element==="Number of Pages"){
                elementInput.type = "number";
            }else{
                elementInput.type = "text";
            };
            card.appendChild(elementLabel);
            card.appendChild(elementInput);
        });
            
    }
    // Calls the function
   createElements(elementsArray, card);

   // appends the elements to the main div
   card.appendChild(addBookButton);
   document.getElementById('book-input-section').appendChild(card);
   return card;
}

document.querySelector('.button').addEventListener("click", function(){
    if(bookFormCard===null){
        createBookInterface(this)
        document.querySelector(".button").innerText = "Close Form";
    } else{
        document.getElementById('book-input-section').removeChild(bookFormCard);
        document.querySelector(".button").innerText = "Add Book";
        bookFormCard = null;
    }
})

// book constructor function
function Book(title, author, pages, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
}

// function that adds the values that the user inputs into the library
function bookToLibrary(){
    // gets the values from the inputs and creates a new book
    let bookAuthor = document.getElementById('author').value;
    let bookTitle = document.getElementById('title').value;
    let bookPages = document.getElementById('pages').value;
    let newBook = new Book(bookTitle, bookAuthor, bookPages);

    // adds the book to the library array
    myLibrary.push(newBook);

    // resets the input values
    document.getElementById('author').value = "";
    document.getElementById('title').value = "";
    document.getElementById('pages').value = "";

    // gets the library div and creates new divs, called library cards
    const theLibrary = document.getElementById('library');
    const libraryCard = document.createElement('div');
    libraryCard.id = 'library-card';

    // creates new HTML elements and fills them with the input values
    let theTitle = document.createElement('h2');
    theTitle.innerText = newBook.title;

    let theAuthor = document.createElement('h3')
    theAuthor.innerText = newBook.author;

    let thePages = document.createElement('h3');
    thePages.innerText = newBook.pages;

    // an array to easily append the elements into the library cards
    itemsArray = [theTitle, theAuthor, thePages];

    itemsArray.forEach(item =>{
        libraryCard.appendChild(item)
    });

    // adds a remove button, which will be useful to remove the cards from the div
    removeButton = document.createElement('button');
    removeButton.id = 'remove-button';
    removeButton.innerText = 'Delete Book';
    libraryCard.append(removeButton);
    

    theLibrary.appendChild(libraryCard);

}

