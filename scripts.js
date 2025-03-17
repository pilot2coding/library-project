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

    // declare new button
    const addBookButton = document.createElement("button");
    addBookButton.innerText = "Add Book to Library";
    addBookButton.id = "add-button";

    // function that loops through an array to add elements to the div
    const elementsArray = ["Book Title", "Author", "Number of Pages"];
    const idArray = ['title', 'author', 'pages'];
    function createElements(elementsArray, card){
        elementsArray.forEach((element, index) => {
            let elementLabel = document.createElement("label");
            let elementInput = document.createElement("input");
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
function Book(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function bookToLibrary(){
    let bookAuthor = document.getElementById('author').innerText;
    let bookTitle = document.getElementById('title').innerText;
    let bookPages = document.getElementById('pages').innerText;
    let newBook = Book(bookTitle, bookAuthor, bookPages);
    console.log(newBook);
}

document.querySelector('#add-button').addEventListener('click', function(){
    bookToLibrary(this);
});