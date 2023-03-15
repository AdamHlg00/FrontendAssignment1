import '../scss/style.scss'
import { getJSON } from './utils/getJSON.js'
import { imageHelper } from './utils/imageHelper'
import {
  sortByTitleAsc, sortByTitleDesc, sortByPriceAsc,
  sortByPriceDesc, sortByAuthorAsc, sortByAuthorDesc
} from './utils/sorting'

let chosenSortOption = 'Title (Ascending)',     // Default sort option
  books,
  chosenCategoryFilter = 'all',
  chosenAuthorFilter = 'all',
  chosenPriceFilterMin = 0,
  chosenPriceFilterMax = 800,
  categories = [],
  authors = [],
  prices = []

async function start() {
  books = await getJSON('/json/books.json')

  getCategories()
  getAuthors()
  addFilters()
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

function getCategories() {
  let withDuplicates = books.map(book => book.category)

  categories = [...new Set(withDuplicates)]
  categories.sort()
}

function getAuthors() {
  let withDuplicates = books.map(book => book.author)

  authors = [...new Set(withDuplicates)]
  authors.sort()
}

function getPrices() {
  let withDuplicates = books.map(book => book.price)

  prices = [...new Set(withDuplicates)]

  prices.sort()
}

function addFilters() {
  document.querySelector('.filters').innerHTML = /*html*/`
    <label><span>Filter by category:</span>
      <select class="categoryFilter">
        <option>all</option>
        ${categories.map(category => `<option>${category}</option>`).join('')}
      </select>
    </label>

    <label><span>Filter by authors:</span>
      <select class="authorFilter">
        <option>all</option>
        <option>Holgersson A.</option>
        <option>Lorem I.</option>
      </select>
    </label>
    
    <label><span>Filter by price-spans:</span>
      <select class="priceFilterMin">
        <option>0</option>
        <option>200</option>
        <option>400</option>
        <option>600</option>
      </select>
      -
      <select class="priceFilterMax">
        <option>800</option>
        <option>600</option>
        <option>400</option>
        <option>200</option>
      </select>
    </label>
  `

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
