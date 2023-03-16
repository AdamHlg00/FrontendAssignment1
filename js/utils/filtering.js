let categories = [],
  authors = []

// Gets all categories of books
export function getCategories(books) {
  let withDuplicates = books.map(book => book.category)

  categories = [...new Set(withDuplicates)]
  categories.sort()
}

// Gets all authors
export function getAuthors(books) {
  let withDuplicates = books.map(book => book.author)

  authors = [...new Set(withDuplicates)]
  authors.sort()
}

// Adds the fitler options in html
export function addFilters() {
  document.querySelector('.filters').innerHTML = /*html*/`

    <!--Category filter options-->
    <label><span>Filter by category:</span>
      <select class="categoryFilter">
        <option>all</option>
        ${categories.map(category => `<option>${category}</option>`).join('')}
      </select>
    </label>

    <!--Author filter options-->
    <label><span>Filter by authors:</span>
      <select class="authorFilter">
        <option>all</option>
        ${authors.map(author => `<option>${author}</option>`).join('')}
      </select>
    </label>
    
    <!--Minimum price filter options-->
    <label><span>Filter by price-spans:</span>
      <select class="priceFilterMin">
        <option>0</option>
        <option>200</option>
        <option>400</option>
        <option>600</option>
      </select>
      -
      <!--Maximum price filter options-->
      <select class="priceFilterMax">
        <option>800</option>
        <option>600</option>
        <option>400</option>
        <option>200</option>
      </select>
    </label>
  `
}