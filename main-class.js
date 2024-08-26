const myLibrary = [];



class Book {
  constructor({ title, author, pages, readStatus }) {
    this.title = title; // string
    this.author = author; // string
    this.pages = pages; // number
    this.readStatus = readStatus; // string -> 'finished reading', 'not read yet', 'reading'
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }

  toggleReadStatus() {
    if (this.readStatus === 'reading') {
      this.readStatus = 'finished reading';
    } else if (this.readStatus === 'finished reading') {
      this.readStatus = 'not yet read';
    } else {
      this.readStatus = 'reading';
    }
  }
}

// Add some books to the library
const book1 = {
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  pages: 295,
  readStatus: "finished reading",
};
const book2 = {
  title: "The Fellowship of the Ring",
  author: "J.R.R. Tolkien",
  pages: 398,
  readStatus: "reading",
};
const book3 = {
  title: "The Two Towers",
  author: "J.R.R. Tolkien",
  pages: 327,
  readStatus: "not read yet",
};

[book1, book2, book3].forEach((book) => {
  myLibrary.push(new Book(book));
});

function addBookToLibrary(title, author, pages, readStatus) {
  myLibrary.push(new Book({ title, author, pages, readStatus }));
}

// DIALOG MODAL
const dialog = document.querySelector("dialog");
const showButton = document.getElementById("addBookButton");
const closeButton = document.getElementById("closeDialogButton");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

// Display the library
const displayCurrentLibrary = () => {
  document.getElementById("library").innerHTML = myLibrary
    .map((book, index) => {
      const divCard = document.createElement("div");
      divCard.classList.add("card");
      divCard.classList.add("m-3");
      divCard.classList.add("w-25");
      divCard.classList.add("text-center");

      const divCardBody = document.createElement("div");
      divCardBody.classList.add("card-body");

      const h5 = document.createElement("h5");
      h5.classList.add("card-title");
      h5.textContent = `${book.title} by ${book.author}`;

      const pPages = document.createElement("p");
      pPages.classList.add("card-text");
      pPages.textContent = `${book.pages} pages`;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-danger", "w-75","m-2" , "deleteButton");
      deleteButton.setAttribute("data-index", index);
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", (event) => {
        deleteBook(event.target.getAttribute("data-index"));
      });

      const toggleReadStatusButton = document.createElement("button");
      toggleReadStatusButton.classList.add("btn", "btn-outline-info","w-75", "m-2", "readingStatusButton");
      toggleReadStatusButton.textContent = `${book.readStatus}`;
      toggleReadStatusButton.setAttribute("data-index", index);

      // Append elements to their respective parents
      divCardBody.appendChild(h5);
      divCardBody.appendChild(pPages);
      divCardBody.appendChild(deleteButton);
      divCardBody.appendChild(toggleReadStatusButton);
      divCard.appendChild(divCardBody);

      // Convert the divCard element to an HTML string and return it
      return divCard.outerHTML;
    })
    .join(" ");

  // add event listener to the delete button
  const deleteButton = document.querySelectorAll(".deleteButton");
  deleteButton.forEach(
    (button) =>
      (button.onclick = (event) => {
        deleteBook(event.target.getAttribute("data-index"));
      })
  );

  // add event listener to the read status button
  const readingStatusButton = document.querySelectorAll(".readingStatusButton");
  readingStatusButton.forEach(
    (button) =>
      (button.onclick = (event) => {
        const index = event.target.getAttribute("data-index");
        myLibrary[index].toggleReadStatus();
        displayCurrentLibrary();
      })
  );

};

// Function to delete a book from the library
const deleteBook = (index) => {
  myLibrary.splice(index, 1);
  displayCurrentLibrary();

};

// Add a new book to the library
const addBookButton = document.getElementById("saveBookButton");

addBookButton.addEventListener("click", (event) => {
  event.preventDefault();

  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let readStatus = document.querySelector("#readingStatus").value;

  console.log(title, author, pages, readStatus);

  if (
    title == null ||
    title == "" ||
    author == null ||
    author == "" ||
    pages == null ||
    pages == ""
  ) {
    alert("Fields must be filled out");
    return false;
  }

  dialog.close();
  addBookToLibrary(title, author, pages, readStatus);
  displayCurrentLibrary();
});

displayCurrentLibrary();
