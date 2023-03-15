export function sortByTitleAsc(books) {
  books.sort(({ title: aTitle }, { title: bTitle }) =>
    aTitle > bTitle ? 1 : -1)
}

export function sortByTitleDesc(books) {
  books.sort(({ title: aTitle }, { title: bTitle }) =>
    aTitle > bTitle ? -1 : 1)
}

export function sortByPriceAsc(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice > bPrice ? 1 : -1)
}

export function sortByPriceDesc(books) {
  books.sort(({ price: aPrice }, { price: bPrice }) =>
    aPrice > bPrice ? -1 : 1)
}

export function sortByAuthorAsc(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor > bAuthor ? 1 : -1)
}

export function sortByAuthorDesc(books) {
  books.sort(({ author: aAuthor }, { author: bAuthor }) =>
    aAuthor > bAuthor ? -1 : 1)
}