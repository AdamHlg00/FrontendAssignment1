import { imageHelper } from "./imageHelper"

import * as bootstrap from 'bootstrap'
import { buyFunction } from "./buy"

// Displays modal containing additional information when a book is clicked
export function displayModal(filteredBooks, cart) {
  return new Promise((resolve, reject) => {
    document.querySelectorAll('.bookImage').forEach(async (image) => {
      image.addEventListener('click', (event) => {
        let imageId = event.target.dataset.imageId
        let clickedBook = filteredBooks.find((book) => book.id.toString() === imageId)

        let modalTitle = document.querySelector('.modal-title')
        let modalBody = document.querySelector('.modal-body')
        let modalFooter = document.querySelector('.modal-footer')

        modalTitle.innerHTML = clickedBook.title
        modalBody.innerHTML = `
        <img class="bookImageModal" src="${imageHelper(clickedBook.title)}">
        <p><div class="modalText">Title:</div> ${clickedBook.title}
        <p><div class="modalText">Category:</div> ${clickedBook.category}</p>
        <p><div class="modalText">Author:</div> ${clickedBook.author}</p>
        <p><div class="modalText">Price:</div> ${clickedBook.price} SEK</p>
        <p><div class="modalText">Description:</div> ${clickedBook.description}</p>
      `
        modalFooter.innerHTML = `
        <button class="btn btn-danger buy" data-button-id="${imageId}">Buy</button>
      `
        let modal = new bootstrap.Modal(document.getElementById('myModal'))
        modal.show()

        modalFooter.querySelector('.buy').addEventListener('click', (event) => {
          let buttonId = event.target.dataset.buttonId
          let book = filteredBooks.find((book) => book.id.toString() === buttonId)
          cart.push(book)
          resolve(cart)
          modal.hide()
        })
      })
    })
  })
}