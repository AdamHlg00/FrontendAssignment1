import '../scss/style.scss'
import { getJSON } from './utils/getJSON.js'
import { imageHelper } from './utils/imageHelper'
import {
  sortByTitleAsc, sortByTitleDesc, sortByPriceAsc,
  sortByPriceDesc, sortByAuthorAsc, sortByAuthorDesc,
  addSortingOptions
} from './utils/sorting'

import { getCategories, getAuthors, addFilters } from './utils/filtering'

let chosenSortOption = 'Title (Ascending)',     // Default sort option
  books,
  chosenCategoryFilter = 'all',     // Default category filter
  chosenAuthorFilter = 'all',     // Default author filter
  chosenPriceFilterMin = 0,     // Default minimum price
  chosenPriceFilterMax = 800      // Default maximum price

// Main function
async function start() {
  books = await getJSON('/json/books.json')

  getCategories(books)
  getAuthors(books)
  addFilters()
  addFilterEvents()
  addSortingOptions()
  addSortingEvents()
  displayBooks()
}

// Adds event listeners for sorting options
function addSortingEvents() {
  document.querySelector('.sortOption').addEventListener('change', event => {
    chosenSortOption = event.target.value
    displayBooks()
  })
}

// Adds event listeners for filter options
function addFilterEvents() {
  // Category event listener
  document.querySelector('.categoryFilter').addEventListener('change', event => {
    chosenCategoryFilter = event.target.value
    displayBooks()
  })

  // Author event listener
  document.querySelector('.authorFilter').addEventListener('change',
    event => {
      chosenAuthorFilter = event.target.value
      displayBooks()
    })

  // Minimum price event listener
  document.querySelector('.priceFilterMin').addEventListener('change',
    event => {
      chosenPriceFilterMin = event.target.value
      displayBooks()
    })

  // Maximum price event listener
  document.querySelector('.priceFilterMax').addEventListener('change',
    event => {
      chosenPriceFilterMax = event.target.value
      displayBooks()
    })
}

// Displays books
function displayBooks() {
  // Filtering categories
  let filteredBooksCategory = books.filter(
    ({ category }) => chosenCategoryFilter === 'all' || chosenCategoryFilter === category
  )

  // Filtering authors
  let filteredBooksAuthor = books.filter(
    ({ author }) => chosenAuthorFilter === 'all' ||
      chosenAuthorFilter === author
  )

  // FIltering authors
  let filteredBooksPrice = books.filter(
    ({ price }) => price >= chosenPriceFilterMin
      && price <= chosenPriceFilterMax
  )

  // Filtering books based on authors and categories
  let partlyFilteredBooks = filteredBooksCategory.filter((book) => filteredBooksAuthor.includes(book))

  // Filtering the previous filtered result based on prices
  let filteredBooks = partlyFilteredBooks.filter((book) =>
    filteredBooksPrice.includes(book))

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
    sortByAuthorAsc(filteredBooks)
  }

  if (chosenSortOption === 'Author (Descending)') {
    sortByAuthorDesc(filteredBooks)
  }

  // Maps the values of a book to their respective positions in HTML
  let htmlArray = filteredBooks.map(({
    id, title, author, category, price, description
  }) => /*html*/`
    <div class="book">
      <img class="bookImage" src="${imageHelper(title)}" alt="Image of a book">     <!--Gets the books corresponding image using the title-->
      <p><span>id: </span>${id}</p>
      <p><span>title: </span>${title}</p>
      <p><span>author: </span>${author}</p>
      <p><span>category: </span>${category}</p>
      <p><span>price: </span>${price}</p>
      <p><span>description: </span>${description}</p>
    </div>
  `)

  document.querySelector('.bookList').innerHTML = htmlArray.join('')
}

start()
