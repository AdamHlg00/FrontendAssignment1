// Returns the book related to the selected buy button
export function buyFunction(filteredBooks, cart) {
  return new Promise((resolve, reject) => {
    document.querySelectorAll('.buy').forEach((button) => {
      button.addEventListener('click', (event) => {
        let buttonId = event.target.dataset.buttonId
        let book = filteredBooks.find((book) => book.id.toString() === buttonId)
        cart.push(book)
        resolve(cart)
      })
    })
  })
}