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

const deleteTitle = null;

// open form when addBook button is clicked
addBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookModal[0].style.display = 'flex';
});

// close form when add cancel button is clicked
addBookCancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookModal[0].style.display = 'none';
});
