const filePath = '/images/books/'

// Combines the name of a book and the file path to images to create full image path
export function imageHelper(bookTitle) {
  let imageName = bookTitle.replace(/[^a-zA-Z0-9]/g, '')      // Removes special characters
  let fullFilePath = filePath + imageName + '.jpg'
  return fullFilePath
}