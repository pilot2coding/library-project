// global variables
let bookFormCard = null;
let myLibrary = [];

// function that uses a button to create a form where the user inputs the required fields to add a new book
function createBookInterface(){

    // creates the div where the inputs will go
    const card = document.createElement("div");
    card.id = 'book-interface';
    bookFormCard = card;
    
    // adding elements to card div
    const cardTitle = document.createElement("h1");
    cardTitle.innerText = "Add a New Book!"
    card.appendChild(cardTitle);

    // declare new button and use it to add elements to the library
    const addBookButton = document.createElement("button");
    addBookButton.innerText = "Add Book";
    addBookButton.id = "add-button";
    addBookButton.type = "button";

    // addBookButton event listener
    addBookButton.addEventListener('click', function(){
        /*bookToLibrary();
        renderLibraryItem(newBook);*/
        const newBook = bookToLibrary();
        if(newBook){
            renderLibraryItem(newBook);
        }
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

   // toggle read checkbox and appendment to the card
   let readText = document.createElement('span');
   readText.innerText = 'Read?'
   const toggleContainer = document.createElement('div')
   toggleContainer.classList.add('toggle-switch');
   
   const readCheckbox = document.createElement("input")
   readCheckbox.type = "checkbox";
   readCheckbox.id = "form-checkbox";
   readCheckbox.classList.add("toggle-checkbox");
   card.appendChild(readText);
   card.appendChild(readCheckbox);

   const toggleLabel = document.createElement("label");
   toggleLabel.setAttribute("for", "form-checkbox");

   toggleContainer.append(readCheckbox);
   toggleContainer.append(toggleLabel);

   // appends the elements to the main div
   card.appendChild(readText);
   card.appendChild(toggleContainer);
   card.appendChild(addBookButton);
   document.getElementById('book-input-section').appendChild(card);
   return card;
}

// event listener that opens and closes the form
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

/* book constructor function - deprecated with the class Book
function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}*/

class Book{
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.id = crypto.randomUUID();
    }
}

// testing books class 
const onWar = new Book('On War - Volume 1', 'Carl von Clausewitz',
    874, true
);
const onChina = new Book('On China', 'Henry Kissinger', 1375, false);

const theRepublic = new Book('The Republic', 'Plato', 973, true)

let testBookArray = [onWar, onChina, theRepublic];

testBookArray.forEach(book =>{
    myLibrary.push(book);
})

myLibrary.forEach(book=> {
    renderLibraryItem(book);
})

// adds the new book to the library
function bookToLibrary(){
    // gets the values from the inputs and creates a new book
    let bookAuthor = document.getElementById('author').value.trim();
    let bookTitle = document.getElementById('title').value.trim();
    let bookPages = document.getElementById('pages').value.trim();
    let bookRead = document.getElementById('form-checkbox').checked;

    // creates form validation
       if(!bookAuthor || !bookTitle || !bookPages || bookPages <= 0){
        alert("Please, introduce valid information.")
        return;
    };

    // creates the book and adds it to the library array
    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    myLibrary.push(newBook);

    // resets the input values
    document.getElementById('author').value = "";
    document.getElementById('title').value = "";
    document.getElementById('pages').value = "";

    return newBook;
}

// renders the book inside the graphic interface
function renderLibraryItem(newBook){
    // gets the library div and creates new divs, called library cards
    const theLibrary = document.getElementById('library');
    const libraryCard = document.createElement('div');
    libraryCard.classList.add('library-card');
    libraryCard.setAttribute('data-id', newBook.id);

    // for CSS purposes, an id of the card will be modified according to the read status
    if(newBook.isRead === true){
        libraryCard.id = 'read-book';
    } else {
        libraryCard.id = 'unread-book';
    }

    // creates new HTML elements and fills them with the input values
    let theTitle = document.createElement('h3');
    theTitle.innerText = newBook.title;
    let theTitleLabel = document.createElement('h5');
    theTitleLabel.innerText = 'Title';

    let theAuthor = document.createElement('h3')
    theAuthor.innerText = newBook.author;
    let theAuthorLabel = document.createElement('h5');
    theAuthorLabel.innerText = 'Author';

    let thePages = document.createElement('h3');
    thePages.innerText = newBook.pages;
    let thePagesLabel = document.createElement('h5');
    thePagesLabel.innerText = 'Pages';

    // an array to easily append the elements into the library cards
    itemsArray = [theTitle, theTitleLabel, theAuthor, theAuthorLabel, thePages, thePagesLabel];
    
    itemsArray.forEach(item =>{
        libraryCard.appendChild(item);
    });   

    // old and deprecated code
    /*let toggleButton = document.createElement('input');
    toggleButton.type = 'checkbox';
    toggleButton.classList.add('toggle-checkbox');
    toggleButton.checked = newBook.isRead;
    let toggleLabel = document.createElement('h5');
    toggleLabel.innerText = 'Read?';
    libraryCard.append(toggleButton);
    libraryCard.append(toggleLabel);*/

    // add a toggle read checkbox and its label
    let cardReadText = document.createElement('span');
    cardReadText.innerText = 'Read?';
    const cardToggleContainer = document.createElement('div');
    cardToggleContainer.classList.add('toggle-card-container');

    const cardReadCheckbox = document.createElement('input');
    cardReadCheckbox.type = 'checkbox';
    cardReadCheckbox.id = 'card-checkbox-' + newBook.id;
    cardReadCheckbox.classList.add('toggle-card-checkbox');
    cardReadCheckbox.checked = newBook.isRead;

    const cardToggleLabel = document.createElement('label');
    cardToggleLabel.setAttribute("for", "card-checkbox-" + newBook.id);
    
    cardToggleContainer.appendChild(cardReadCheckbox);
    cardToggleContainer.appendChild(cardToggleLabel);

    libraryCard.append(cardReadText);
    libraryCard.append(cardToggleContainer);

    // adds a remove button, which will be useful to remove the cards from the div
    let removeButton = document.createElement('button');
    removeButton.id = 'remove-button' + newBook.id;
    removeButton.innerText = 'Delete Book';
    libraryCard.append(removeButton);
    
    // uses an event listener to call the function that deletes the card
    removeButton.addEventListener("click", function(){
        deleteLibraryCard(this.parentElement);
    })

    // appends everything into the library div
    theLibrary.appendChild(libraryCard);

    libraryCard.querySelector('.toggle-card-checkbox').addEventListener('click', function(){
        toggleCard(libraryCard);
    })

    console.log(myLibrary)

}

// function that erases the book from the library div and the library array
function deleteLibraryCard(libraryCard){
    libraryCard.parentElement.removeChild(libraryCard);

    let cardID = libraryCard.getAttribute("data-id");

    let filteredLibrary = myLibrary.filter(book=> book.id !== cardID);
    myLibrary = filteredLibrary;

    console.log(myLibrary);
    return myLibrary;
}

// function that modifies the library array isRead status and the class of the card
function toggleCard(libraryCard){
    let cardCheckbox = libraryCard.querySelector('.toggle-card-checkbox').checked;
    if(cardCheckbox === true){
        libraryCard.id = 'read-book';
    } else {
        libraryCard.id = 'unread-book';
    }

    let cardID = libraryCard.getAttribute("data-id");

    const bookFound = myLibrary.find(book => cardID === book.id);
    if(bookFound){
        bookFound.isRead = cardCheckbox;
    }
    console.log(myLibrary);
}



