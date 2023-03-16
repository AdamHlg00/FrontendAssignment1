// Sorts books by title in ascending order
export function sortByTitleAsc(books) {
  books.sort(({ title: aTitle }, { title: bTitle }) =>
    aTitle > bTitle ? 1 : -1)
}

// Sorts books by title in descending order
export function sortByTitleDesc(books) {
  books.sort(({ title: aTitle }, { title: bTitle }) =>
    aTitle > bTitle ? -1 : 1)
}

// Sorts books by price in ascending order
export function sortByPriceAsc(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice > bPrice ? 1 : -1)
}

// Sorts books by price in descending order
export function sortByPriceDesc(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice > bPrice ? -1 : 1)
}

// Sorts books by authors in ascending order
export function sortByAuthorAsc(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor > bAuthor ? 1 : -1)
}

// Sorts books by authors in descending order
export function sortByAuthorDesc(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor > bAuthor ? -1 : 1)
}

// Adds the sorting options in html
export function addSortingOptions() {
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
}