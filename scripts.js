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
    addBookButton.innerText = "Add Book to Library";
    addBookButton.id = "add-button";
    addBookButton.type = "button";

    // addBookButton event listener
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

   // toggle read checkbox and appendment to the card
   let readButtonLabel = document.createElement('label');
   readButtonLabel.innerText = 'Read?'
   const readButton = document.createElement("input")
   readButton.type = "checkbox";
   readButton.id = "form-checkbox";
   card.appendChild(readButtonLabel);
   card.appendChild(readButton);

   // appends the elements to the main div
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

// book constructor function
function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

// function that adds the values that the user inputs into the library
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



    // adds a remove button, which will be useful to remove the cards from the div
    let removeButton = document.createElement('button');
    removeButton.id = 'remove-button' + newBook.id;
    removeButton.innerText = 'Delete Book';
    libraryCard.append(removeButton);
    
    // uses an event listener to call the function that deletes the card
    removeButton.addEventListener("click", function(){
        deleteLibraryCard(this.parentElement);
    })

   // add a toggle read checkbox and its label
    let toggleButton = document.createElement('input');
    toggleButton.type = 'checkbox';
    toggleButton.classList.add('toggle-card');
    toggleButton.checked = newBook.isRead;
    let toggleLabel = document.createElement('h5');
    toggleLabel.innerText = 'Read?';
    libraryCard.append(toggleButton);
    libraryCard.append(toggleLabel);

    // appends everything into the library div
    theLibrary.appendChild(libraryCard);

    libraryCard.querySelector('.toggle-card').addEventListener('click', function(){
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
    let cardCheckbox = libraryCard.querySelector('.toggle-card').checked;
    if(cardCheckbox === true){
        libraryCard.id = 'read-book';
    } else {
        libraryCard.id = 'unread-book';
    }
}



