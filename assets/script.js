const inputBookTitle = document.getElementById("inputBookTitle")
const inputBookAuthor = document.getElementById("inputBookAuthor")
const inputBookYear = document.getElementById("inputBookYear")
const inputBookIsComplete = document.getElementById("inputBookIsComplete")
const searchBookTitle = document.getElementById("searchBookTitle")
const BOOKS = "BOOKS"

function addBuku() {
  const bookTitle = inputBookTitle.value
  const bookAuthor = inputBookAuthor.value
  const bookYear = inputBookYear.value
  const bookIsComplete = inputBookIsComplete.checked
  const book = {
      id: +new Date(),
      bookTitle,
      bookAuthor,
      bookYear,
      bookIsComplete,
  }
  const books = getBooks()
  books.push(book)
  localStorage.setItem(BOOKS, JSON.stringify(books))
  inputBookTitle.value = ""
  inputBookAuthor.value = ""
  inputBookYear.value = ""
  inputBookIsComplete.checked = false
  renderBooks()
  return false
}

function getBooks() {
  const books = localStorage.getItem(BOOKS)
  return books ? JSON.parse(books) : []
}

function deleteBook(id) {
  const books = getBooks()
  console.log(books)
  const newBooks = books.filter((book) => book.id !== id)
  localStorage.setItem(BOOKS, JSON.stringify(newBooks))
  renderBooks()
}

function toggleIsComplete(id) {
    const books = getBooks()
    const newBooks = books.map((book) => {
        if (book.id === id) {
            book.bookIsComplete = !book.bookIsComplete
        }
        return book
    })
    localStorage.setItem(BOOKS, JSON.stringify(newBooks))
    renderBooks()
}

function clearBooks() {
  document.getElementById("completeBookshelfList").innerHTML = ""
  document.getElementById("incompleteBookshelfList").innerHTML = ""
}

function searchBooks() {
  const books = getBooks()
  const keyword = searchBookTitle.value
  const filteredBooks = books.filter((book) => {
    return book.bookTitle.toLowerCase().includes(keyword.toLowerCase())
  })
  renderBooks(filteredBooks)
  return false
}

function renderBooks(paramsBooks) {
  clearBooks()
  const books = paramsBooks ?? getBooks()
  for (const book of books) {
    let bookList = ""
    bookList += `<article class="book_item">
                  <h3>${book.bookTitle}</h3>
                  <p>Penulis: ${book.bookAuthor}</p>
                  <p>Tahun: ${book.bookAuthor}</p>

                  <div class="action">
                    <button class="green" onclick=toggleIsComplete(${book.id})>${book.bookIsComplete ? "Selesai dibaca" : "Belum Selesai dibaca"}</button>
                    <button class="red" onclick="deleteBook(${book.id})">Hapus buku</button>
                  </div>
                </article>`
    if (book.bookIsComplete) {
      document.getElementById("completeBookshelfList").innerHTML += bookList
    }
    else  {
      document.getElementById("incompleteBookshelfList").innerHTML += bookList
    }
  }
}

function main() {
  getBooks()
  renderBooks()
}

main()