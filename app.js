/* eslint-disable func-names */
const themeToggle = document.getElementById('themeToggle');
const lightThemeLink = document.getElementById('lightThemeLink');
const darkThemeLink = document.getElementById('darkThemeLink');
const sunIcon = document.getElementsByClassName('gg-sun')[0];
const moonIcon = document.getElementsByClassName('gg-moon')[0];
let prefersDarkScheme;

function applyTheme() {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (prefersDarkScheme) {
    themeToggle.checked = true;
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
  } else {
    // System prefers light theme
    themeToggle.checked = false;
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
  }
}

// Listen for changes in the prefers-color-scheme media feature
document.addEventListener('DOMContentLoaded', applyTheme);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

// Theme-button for changing the theme color
themeToggle.addEventListener('change', function () {
  prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (this.checked && prefersDarkScheme) {
    // Dark theme
    lightThemeLink.media = '(prefers-color-scheme: dark)';
    darkThemeLink.media = '(prefers-color-scheme: light)';
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
  } else if (!this.checked && prefersDarkScheme) {
    // Light theme
    lightThemeLink.media = '(prefers-color-scheme: light)';
    darkThemeLink.media = '(prefers-color-scheme: dark)';
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
  } else if (this.checked && !prefersDarkScheme) {
    // Dark theme
    lightThemeLink.media = '(prefers-color-scheme: dark)';
    darkThemeLink.media = '(prefers-color-scheme: light)';
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
  } else if (!this.checked && !prefersDarkScheme) {
    // Light theme
    lightThemeLink.media = '(prefers-color-scheme: light)';
    darkThemeLink.media = '(prefers-color-scheme: dark)';
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
  }
});

const emptyInfo = document.getElementById('noBookDisplay');
const addBookSummit = document.getElementById('addBookBtn');
const addBookBtn = document.getElementById('addBook');
const addBookModal = document.getElementsByClassName('addBookModal');
const addBookCancelBtn = document.getElementById('cancelBtn');
const addBookForm = document.getElementById('addBookForm');
let deleteTitle = null;

function Book(title, author, pages, noOfPagesRead) {
  this.title = title;
  this.by = 'by';
  this.author = author;
  this.dateAdded = new Date();
  this.pages = pages;
  this.noOfPagesRead = noOfPagesRead;
  this.percent = +((noOfPagesRead / pages) * 100).toFixed(1);
  this.created = new Date();
  this.status;
  this.color;
}

// eslint-disable-next-line consistent-return
Book.prototype.bookProgress = function () {
  if (this.percent === 0) {
    return { color: 'red', status: 'Unread' };
  } if (this.percent === 100) {
    return { color: 'green', status: 'Completed' };
  } if (this.percent > 0 || this.percent < 100) {
    return { color: 'yellow', status: 'Inprogress' };
  }
};

class Library {
  constructor() {
    this.collection = [];
  }

  checkLibrary() {
    if (this.collection.length < 1) {
      emptyInfo.style.display = 'block';
    } else {
      emptyInfo.style.display = 'none';
    }
  }

  createBook() {
    // get all the values of the nook from the the form
    const bookTitle = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const noOfPagesRead = document.getElementById('pagesread').value;

    // Create the book object using the paramaters collected from the form
    // Then add the newly created book to the library array
    this.collection.push(new Book(bookTitle, author, pages, noOfPagesRead));
    addBookForm.reset();
    addBookModal[0].style.display = 'none';
  }

  removeBook = (toDeleteTitle) => {
    this.collection = this.collection.filter((book) => book.title !== toDeleteTitle);
  };

  sortByDateAdded() {
    this.collection.sort((a, b) => a.dateAdded - b.dateAdded);
  }

  sortBooksAlphabetically() {
    this.collection.sort((book1, book2) => {
      const title1 = book1.title.toLowerCase();
      const title2 = book2.title.toLowerCase();
      if (title1 < title2) {
        return -1;
      } if (title1 > title2) {
        return 1;
      }
      return 0;
    });
  }
}

// Create a library instance

const library = new Library();
library.checkLibrary();

// Display books in the container
function displayBook() {
  const container = document.getElementById('container');
  container.innerHTML = '';

  library.collection.forEach((book) => {
    const booksClass = document.createElement('div');
    booksClass.classList.add('books');

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const titleText = document.createElement('p');
    titleText.classList.add('title');
    titleText.innerText = book.title;

    const byText = document.createElement('p');
    byText.classList.add('by');
    byText.innerText = 'by';

    const authorText = document.createElement('p');
    authorText.classList.add('author');
    authorText.innerText = book.author;

    const pagesNo = document.createElement('p');
    pagesNo.classList.add('page-no');
    pagesNo.innerText = `${book.pages} Pages`;

    const dateAdded = document.createElement('p');
    dateAdded.classList.add('date-added');
    dateAdded.innerText = `${book.dateAdded.toLocaleDateString()}`;

    const bookProgressInfo = document.createElement('div');
    bookProgressInfo.classList.add('bookProgress');

    const infoBlock = document.createElement('div');
    infoBlock.classList.add('info-block');

    const progress = document.createElement('p');
    progress.classList.add('progress');
    progress.innerText = `${book.percent}%`;

    const bookStatus = document.createElement('div');
    bookStatus.classList.add('bookStatus');

    const bookStatusIndicator = document.createElement('span');
    bookStatusIndicator.classList.add('bookStatusIndicator');
    bookStatusIndicator.style.backgroundColor = book.bookProgress().color;

    const bookStatusIndicatorText = document.createElement('p');
    bookStatusIndicatorText.classList.add('bookStatusIndicatorText');
    bookStatusIndicatorText.innerText = book.bookProgress().status;

    const deleteBookBtn = document.createElement('button');
    deleteBookBtn.classList.add('delete');
    deleteBookBtn.innerText = 'X';
    deleteBookBtn.addEventListener('click', () => {
      deleteTitle = book.title;
      library.removeBook(deleteTitle);
      displayBook();
    });

    bookCard.appendChild(titleText);
    bookCard.appendChild(byText);
    bookCard.appendChild(authorText);
    bookCard.appendChild(pagesNo);

    bookProgressInfo.appendChild(infoBlock);
    infoBlock.appendChild(dateAdded);
    infoBlock.appendChild(progress);
    bookProgressInfo.appendChild(bookStatus);
    bookStatus.appendChild(bookStatusIndicator);
    bookStatus.appendChild(bookStatusIndicatorText);

    booksClass.appendChild(bookCard);
    booksClass.appendChild(bookProgressInfo);
    booksClass.appendChild(deleteBookBtn);
    container.appendChild(booksClass);
  });

  library.checkLibrary();
}

// Function to display an error message for a specific input field
function displayErrorMessage(inputElement, errorMessage) {
  // Get the parent li element of the input field
  const liElement = inputElement.parentElement;

  // Create and add the error message element
  const errorElement = document.createElement('span');
  errorElement.className = 'errorMessage';
  errorElement.textContent = errorMessage;
  liElement.appendChild(errorElement);

  // Add the error class to the parent li element
  liElement.classList.add('errorDiv');
}

// Function to clear all error messages and error classes
function clearErrorMessages() {
  // Get all error messages
  const errorMessages = document.getElementsByClassName('errorMessage');

  // Remove error messages
  while (errorMessages.length > 0) {
    errorMessages[0].parentNode.removeChild(errorMessages[0]);
  }

  // Remove error classes from li elements
  const errorLiElements = document.getElementsByClassName('errorDiv');

  Array.from(errorLiElements).forEach((liElement) => liElement.classList.remove('errorDiv'));
}

// Function to validate the form
function validateForm() {
  const bookTitle = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  const noOfPagesRead = document.getElementById('pagesread');

  // Track form validity
  let isValid = true;

  // Reset error messages
  clearErrorMessages();

  // Check if the title is empty
  if (bookTitle.value.trim() === '') {
    displayErrorMessage(bookTitle, 'Please enter a book title.');
    isValid = false;
  }

  // Check if the author is empty
  if (author.value.trim() === '') {
    displayErrorMessage(author, 'Please enter an author.');
    isValid = false;
  }

  // Check if the pages is empty or not a positive number
  if (pages.value.trim() === '' || Number(pages.value) <= 0) {
    displayErrorMessage(pages, 'Please enter a valid number of pages.');
    isValid = false;
  }

  // Check if the pages read is empty or not a positive number
  if (noOfPagesRead.value.trim() === '' || Number(noOfPagesRead.value) < 0) {
    displayErrorMessage(noOfPagesRead, 'Please enter a valid number of pages read.');
    isValid = false;
  }

  // Check if the pages read is greater than the total pages
  if (Number(noOfPagesRead.value) > Number(pages.value)) {
    displayErrorMessage(noOfPagesRead, 'Pages read cannot be greater than the total pages.');
    isValid = false;
  }

  return isValid;
}

// open form when addBook button is clicked
addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookModal[0].style.display = 'flex';
});

// close form when add cancel button is clicked
addBookCancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearErrorMessages();
  addBookForm.reset();
  addBookModal[0].style.display = 'none';
});

// when add book button is clicked, create book and add the book to the library collection
addBookSummit.addEventListener('click', (e) => {
  // Prevent the form from submitting
  e.preventDefault();
  // Perform form validation
  if (validateForm()) {
    library.createBook();
    displayBook();
  }
});

// Add event listener to the sort select element
const sortSelect = document.getElementById('sortBy');
sortSelect.addEventListener('change', () => {
  const sortBy = sortSelect.value;
  if (sortBy === 'alphabetically') {
    library.sortBooksAlphabetically();
  } else if (sortBy === 'dateAdded') {
    library.sortByDateAdded();
  }
  displayBook();
});

// Get the view toggle buttons and container
const viewGrid = document.getElementById('grid');
const viewList = document.getElementById('list');
const container = document.getElementById('container');

// Function to toggle grid view
function toggleGridView() {
  container.classList.remove('list-view');
}

// Function to toggle list view
function toggleListView() {
  container.classList.add('list-view');
}

// Add event listeners to the view toggle buttons
viewGrid.addEventListener('change', toggleGridView);
viewList.addEventListener('change', toggleListView);
