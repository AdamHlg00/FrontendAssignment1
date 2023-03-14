import '../scss/style.scss'
import { getJSON } from './utils/getJSON.js'
import { imageHelper } from './utils/imageHelper'

async function start() {
  let books = await getJSON('/json/books.json')

  let html = ''
  for (let book of books) {
    // Displays each books image
    let image = imageHelper(book.title)
    html += `<img class="bookImage" src="${image}" alt="Image of a book">`

    // Displays the information of each book
    html += '<div class="book">'
    for (let key in book) {
      let value = book[key]
      html += `<p><span>${key}:</span> ${value}</p>`
    }
    html += '</div>'
  }
  document.querySelector('.bookList').innerHTML = html
}

start()
