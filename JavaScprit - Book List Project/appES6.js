//Creating a book class.
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//Creating an UI class.
class UI {
    //Method to add a book to the list.
    addBookToList(book) {
        //Getting the book list element.
        const bookList = document.getElementById('book-list');
        //Creating a new tr element.
        const row = document.createElement('tr');
        //Inserting content.
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X<a></td>
        `;

        bookList.appendChild(row);
    }

    //Method to show an alert message.
    showAlert(message, className) {
        //Creating a new DIV element.
        const div = document.createElement('div');
        //Adding a class into the element.
        div.className = `alert ${className}`;
        //Adding a text node.
        div.appendChild(document.createTextNode(message));
        //Getting parent.
        const container = document.querySelector('.container');
        //Getting form.
        const form = document.querySelector('#book-form');
        //Insert the alert.
        container.insertBefore(div, form);
        //Setting timeout.
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    //Method to delete a book from the list.
    deleteBook(target) {
        //Checking the class of the element.
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    //Method to clear all the fields.
    clearFields() {
        document.getElementById('title').value = '',
        document.getElementById('author').value = '',
        document.getElementById('isbn').value = '';
    }
}

//Creating a Local Storage class.
class Store {
    //Adding a book.
    static addBook(book) {
        //Getting the books list.
        const books = Store.checkLocalStorage();

        //Pushing a new book to the list.
        books.push(book);
        
        //Saving the new list on the local storage.
        localStorage.setItem('books', JSON.stringify(books));
    }

    //Displaying all books.
    static displayBooks() {
        //Getting the books list.
        const books = Store.checkLocalStorage();

        //Showing all books.
        books.forEach(function(book) {
            const ui = new UI;

            ui.addBookToList(book);
        });
    }

    //Removing a book.
    static removeBook(isbn) {
        //Getting the books list.
        const books = Store.checkLocalStorage();

        //Removing book from the list.
        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        //Saving the new list on the local storage.
        localStorage.setItem('books', JSON.stringify(books));
    }

    //Checking local storage.
    static checkLocalStorage() {
        let books;

        //Checking if the local storage is empty.
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
}

//Event listener for DOM load event.
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event listener for form.
document.getElementById('book-form').addEventListener('submit', function(e) {
    //Getting all values from the user.
    const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;

    //Instantiating a new book.
    const book = new Book(title, author, isbn);
 
    //Instantiating a new UI.
    const ui = new UI();

    //Validating fields.
    if (title === '', author === '', isbn === '') {
        //Showing an error message.
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        //Adding a book to the list.
        ui.addBookToList(book);
        //Adding a book to the Local Storage.
        Store.addBook(book);
        //Showing a success message.
        ui.showAlert('Book added!', 'success');
        //Cleaning the fields.
        ui.clearFields();        
    }

    e.preventDefault();
});

//Event listener for delete.
document.getElementById('book-list').addEventListener('click', function(e) {
    //Instantiating a new UI.
    const ui = new UI();
    //Deleting the book.
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //Showing a message.
    ui.showAlert('Book removed!', 'success');

    e.preventeDefault();
});