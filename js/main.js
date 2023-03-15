import '../scss/style.scss'
import { getJSON } from './utils/getJSON.js'
import { imageHelper } from './utils/imageHelper'

let chosenSortOption = 'Title (Ascending)',     // Default sort option
  books

async function start() {
  books = await getJSON('/json/books.json')

  addSortingOptions()
  displayBooks()
}

function addSortingOptions() {
  document.querySelector('.sortingOptions').innerHTML = /*html*/`
    <label><span>Sort by:</span>
      <select class="sortOption">
        <option>Title (Ascending)</option>
        <option>Title (Descending)</option>
        <option>Price (Ascending)</option>
        <option>Price (Descending)</option>
        <option>Author (Ascending)</option>
        <option>Author (Descending)</option>
      </select>
    </label>
  `

  document.querySelector('.sortOption').addEventListener('change', event => {
    chosenSortOption = event.target.value
    displayBooks()
  })
}

function sortByTitleAsc(books) {
  books.sort(({ title: aTitle }, { title: bTitle }) =>
    aTitle > bTitle ? 1 : -1)
}

function sortByTitleDesc(books) {
  books.sort(({ title: aTitle }, { title: bTitle }) =>
    aTitle > bTitle ? -1 : 1)
}

function sortByPriceAsc(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice > bPrice ? 1 : -1)
}

function sortByPriceDesc(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice > bPrice ? -1 : 1)
}

function sortByAuthorAsc(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor > bAuthor ? 1 : -1)
}

function sortByAuthorDesc(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor > bAuthor ? -1 : 1)
}

// Displays books
function displayBooks() {
  let html = ''
  let filteredBooks = books     // Not filtered yet!

  if (chosenSortOption === 'Title (Ascending)') {
    sortByTitleAsc(filteredBooks)
  }

  if (chosenSortOption === 'Title (Descending)') {
    sortByTitleDesc(filteredBooks)
  }

  if (chosenSortOption === 'Price (Ascending)') {
    sortByPriceAsc(filteredBooks)
  }

  if (chosenSortOption === 'Price (Descending)') {
    sortByPriceDesc(filteredBooks)
  }

  if (chosenSortOption === 'Author (Ascending)') {
    console.log('hej')
    sortByAuthorAsc(filteredBooks)
  }

  if (chosenSortOption === 'Author (Descending)') {
    sortByAuthorDesc(filteredBooks)
  }

  for (let book of books) {
    // Displays each books image
    let image = imageHelper(book.title)
    html += /*html*/`<img class="bookImage" src="${image}" alt="Image of a book">`

    // Displays the information of each book
    html += '<div class="book">'
    for (let key in book) {
      let value = book[key]
      html += /*html*/`<p><span>${key}:</span> ${value}</p>`
    }
    html += '</div>'
  }
  document.querySelector('.bookList').innerHTML = html
}

start()
