import { imageHelper } from "./imageHelper"

import * as bootstrap from 'bootstrap'

// Displays modal containing additional information when a book is clicked
export function displayModal(filteredBooks) {
  const images = document.querySelectorAll('.bookList .bookImage')

  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function (event) {
      let clickedBook = filteredBooks.filter((book) => {
        return book.id.toString() === event.target.id
      })
      console.log(clickedBook[0].title)
      let modalTitle = document.querySelector('.modal-title')
      let modalBody = document.querySelector('.modal-body')
      modalTitle.innerHTML = clickedBook[0].title
      modalBody.innerHTML = `
        <img class="bookImageModal" src="${imageHelper(clickedBook[0].title)}">
        <p><div class="modalText">Title:</div> ${clickedBook[0].title}
        <p><div class="modalText">Category:</div> ${clickedBook[0].category}</p>
        <p><div class="modalText">Author:</div> ${clickedBook[0].author}</p>
        <p><div class="modalText">Price:</div> ${clickedBook[0].price} SEK</p>
        <p><div class="modalText">Description:</div> ${clickedBook[0].description}</p>
      `
      let modal = new bootstrap.Modal(document.getElementById('myModal'))
      modal.show()
    })
  }
}