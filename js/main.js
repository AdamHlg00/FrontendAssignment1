import '../scss/style.scss'
import { getJSON } from './utils/getJSON.js'
import { imageHelper } from './utils/imageHelper'
import {
  sortByTitleAsc, sortByTitleDesc, sortByPriceAsc,
  sortByPriceDesc, sortByAuthorAsc, sortByAuthorDesc,
  addSortingOptions
} from './utils/sorting'

import { getCategories, getAuthors, addFilters } from './utils/filtering'
import { displayModal } from './utils/informationModal'

import * as bootstrap from 'bootstrap'
import { buyFunction } from './utils/buy'

let chosenSortOption = 'Title (Ascending)',     // Default sort option
  books,
  chosenCategoryFilter = 'all',     // Default category filter
  chosenAuthorFilter = 'all',     // Default author filter
  chosenPriceFilterMin = 0,     // Default minimum price
  chosenPriceFilterMax = 800      // Default maximum price

let cart = []     // Buyer's cart start empty

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
async function displayBooks() {
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

  // Sorting
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

  // Would have used map here, but couldn't get the bootstrap grid system to work properly with it
  // Creates HTML for displaying the books
  let html = ''
  html += '<div class="container overflow-hidden">'
  html += '<div class="row">'
  for (let book of filteredBooks) {
    html += '<div class="col-sm-12 col-md-6 col-lg-4 p-2 border border-white border-3 bg-aqua book">'
    //Gets the books corresponding image using the title
    html += `<img class="bookImage" data-image-id="${book.id}" src="${imageHelper(book.title)}">`
    html += `<p>${book.title}</p>`
    html += `<p>${book.price} SEK</p>`
    html += `<div><button class="btn btn-danger buy" data-button-id="${book.id}">Buy</button></div>`
    html += '</div>'
  }

  html += '</div>'
  html += '</div>'

  document.querySelector('.bookList').innerHTML = html

  // Modal for additional information
  // Adds books into cart
  // Race needed to allow cart to function properly
  Promise.race([displayModal(filteredBooks, cart), buyFunction(filteredBooks, cart)])
    .then((updatedCart) => {
      console.log(updatedCart)
      cart = updatedCart
    })
    .catch((error) => {
      console.error(error)
    })


  let cartButton = document.querySelector('.cartButton')
  cartButton.addEventListener('click', async (event) => {

    let totalPrice = 0

    let modalTitle = document.querySelector('.modal-title')
    let modalBody = document.querySelector('.modal-body')
    let modalFooter = document.querySelector('.modal-footer')
    modalTitle.innerHTML = 'YOUR CART'

    let cartWithoutDuplicates = [...new Set(cart)]
    cartWithoutDuplicates.sort()

    let html = '<div class="container">'
    html += '<div class="row">'

    for (let i = 0; i < cartWithoutDuplicates.length; i++) {
      let book = cartWithoutDuplicates[i]
      let booksToCount = await filterFunction(book.id, cart)
      let bookCount = booksToCount.length
      let price = calculatePrice(book, bookCount)
      totalPrice += price

      html += '<p class="col-3 modalText">Title</p>'
      html += '<p class="col-3 modalText">Amount</p>'
      html += '<p class="col-3 modalText">Unit price</p>'
      html += '<p class="col-3 modalText">Price</p>'

      html += `
        <p class="col-3">${book.title}</p>
        <p class="col-3">${bookCount}</p>
        <p class="col-3">${book.price} SEK</p>
        <p class="col-3">${price} SEK</p>
      `
    }

    html += '</div>'
    html += '</div>'

    html += '<span class="modalText">Total price: </span>'
    html += `<span class="totalPrice">${totalPrice} SEK</span>`

    modalBody.innerHTML = html
    modalFooter.innerHTML = ''

    let modal = new bootstrap.Modal(document.getElementById('myModal'))
    modal.show()

    function filterFunction(id, cart) {
      let booksToCount = cart.filter((book) => {
        return book.id === id
      })
      return (booksToCount)
    }

    function calculatePrice(book, bookCount) {
      let price = book.price * bookCount
      return (price)
    }
  })
}

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

start()
