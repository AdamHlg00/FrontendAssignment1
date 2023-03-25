import * as bootstrap from 'bootstrap'

// Handles showing and updating of the cart
export function cartFunction(cart) {
  let cartButton = document.querySelector('.cartButton')
  cartButton.addEventListener('click', async (event) => {

    let totalPrice = 0

    let modalTitle = document.querySelector('.modal-title')
    let modalBody = document.querySelector('.modal-body')
    let modalFooter = document.querySelector('.modal-footer')
    modalTitle.innerHTML = 'YOUR CART'

    // Creates a copy of the cart without duplicates
    // Used when displaying unit and row prices
    let cartWithoutDuplicates = [...new Set(cart)]
    cartWithoutDuplicates.sort()

    let html = '<div class="container">'
    html += '<div class="row">'

    // Repeats for each book id that was added into the cart
    for (let i = 0; i < cartWithoutDuplicates.length; i++) {
      let book = cartWithoutDuplicates[i]
      // Checks how many of a book id was bought, used when calculating row price
      let booksToCount = await filterFunction(book.id, cart)
      let bookCount = booksToCount.length
      // Returns row price
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

    // Creates and displays the cart information as a modal
    let modal = new bootstrap.Modal(document.getElementById('myModal'))
    modal.show()

    // A simple filter function to filter books of an id
    function filterFunction(id, cart) {
      let booksToCount = cart.filter((book) => {
        return book.id === id
      })
      return (booksToCount)
    }

    // A simple calculation function to calculate the row prices
    function calculatePrice(book, bookCount) {
      let price = book.price * bookCount
      return (price)
    }
  })
}