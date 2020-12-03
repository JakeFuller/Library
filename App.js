let myLibrary = [];

function Book(title, author, pageCount, read) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;
}
// Was used to demonstrate how prototyping works, not useful now.
// Book.prototype.info = function () {
//   if (this.read === true || this.read == "true") {
//     return `${this.title} by ${this.author}, ${this.pageCount} pages, read.`;
//   } else {
//     return `${this.title} by ${this.author}, ${this.pageCount} pages, not read yet.`;
//   }
// };

function addBookToLibrary(title, author, pages, read) {
  if (read == "yes" || read === true) {
    read = true;
  } else {
    read = false;
  }
  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log(myLibrary);
  renderLibrary();
}

function removeBookFromLibrary(e) {
  index = e.target.parentNode.id;
  myLibrary.splice(index, 1);
  renderLibrary();
}

function unRenderLibrary() {
  const library = document.getElementById("library");
  while (library.firstChild) {
    library.removeChild(library.lastChild);
  }
}

function renderLibrary() {
  unRenderLibrary();
  wrapper = document.querySelector("#wrapper");
  library = document.querySelector("#library");
  for (i = 0; i < myLibrary.length; i++) {
    newDiv = document.createElement("div");
    newDiv.classList = `book`;
    newDiv.id = i;
    bookTable = document.createElement("ul");
    bookProperties = Object.entries(myLibrary[i]);
    for (const [property, value] of bookProperties) {
      listProperty = document.createElement("li");
      listProperty.classList = `${property}`;
      if (typeof value === "boolean") {
        if (value === true) {
          listProperty.innerHTML = `<span class="long-word">Read<span>`;
        } else {
          listProperty.innerHTML = `<span class="long-word">Unread<span>`;
        }
      } else if (!isNaN(value)) {
        listProperty.innerHTML = `<span class="long-word">${value} pages<span>`;
      } else {
        listProperty.innerHTML = `<span class="long-word">${value}<span>`;
      }
      bookTable.appendChild(listProperty);
    }
    deleteBtn = document.createElement("button");
    deleteBtn.classList = "button-delete";
    deleteBtn.innerHTML = "&times;";
    deleteBtn.onclick = function (e) {
      removeBookFromLibrary(e);
    };
    toggleBtn = document.createElement("button");
    toggleBtn.classList = "button-toggle";
    toggleBtn.innerHTML = "&#9745;";
    toggleBtn.onclick = function (e) {
      toggleRead(e);
    };
    newDiv.appendChild(deleteBtn);
    newDiv.appendChild(bookTable);
    newDiv.appendChild(toggleBtn);
    library.appendChild(newDiv);
    wrapper.appendChild(library);
  }
}

function newBookForm() {
  let popup = document.getElementById("popUp");
  popup.style.display = "block";
  let close = document.querySelector(".close");
  close.addEventListener("click", function closePopUp() {
    popup.style.display = "none";
    close.removeEventListener("click", closePopUp);
  });
}

function getFormData() {
  let title = document.getElementById("title-form").value;
  let author = document.getElementById("author-form").value;
  let pages = document.getElementById("pages-form").value;
  let read = document.getElementById("read-form").value;
  addBookToLibrary(title, author, pages, read);
}

function toggleRead(e) {
  index = e.target.parentNode.id;
  book = myLibrary[index];
  if (book.read === true) {
    book.read = false;
  } else {
    book.read = true;
  }
  renderLibrary();
}

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 400, true);
const endersGame = new Book("Enders Game", "Orson Scott Card", 500, true);
const harryPotter = new Book("Harry Potter: Prisoner of Azkaban", "J.K. Rowling", 500, false);
const readyPlayerOne = new Book("Ready Player One", "Ernest Cline", 295, true);
myLibrary.push(theHobbit, endersGame, harryPotter, readyPlayerOne);

const addBook = document.querySelector("#addBook");
addBook.addEventListener("click", function () {
  newBookForm();
});

renderLibrary();
