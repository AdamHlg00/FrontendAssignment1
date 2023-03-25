import { imageHelper } from "./imageHelper"

import * as bootstrap from 'bootstrap'

// Displays modal containing additional information when a book is clicked
export function displayModal(filteredBooks, cart) {
  return new Promise((resolve, reject) => {
    document.querySelectorAll('.bookImage').forEach(async (image) => {
      // Event listeners are added so the images can be clicked
      image.addEventListener('click', (event) => {
        let imageId = event.target.dataset.imageId
        // Finds the book who has the same id as the clicked image
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
        // Creates and shows the additional information as a modal
        let modal = new bootstrap.Modal(document.getElementById('myModal'))
        modal.show()

        // Handles what happens when the buy button in the additional information modal is clicked
        modalFooter.querySelector('.buy').addEventListener('click', (event) => {
          let buttonId = event.target.dataset.buttonId
          // Finds the book with the same id as the button clicked
          let book = filteredBooks.find((book) => book.id.toString() === buttonId)
          cart.push(book)
          resolve(cart)
          modal.hide()      // Hides the modal after the buy button is clicked
        })
      })
    })
  })
}