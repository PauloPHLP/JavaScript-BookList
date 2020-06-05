//Book constructor.
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor.
function UI() {}

//UI prototype for add a new book to the list.
UI.prototype.addBookToList = function(book) {
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

//UI protorype to remove a book from the list.
UI.prototype.deleteBook = function(target) {
    //Checking the class of the element.
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//UI prototype to clean all the fields.
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '',
    document.getElementById('author').value = '',
    document.getElementById('isbn').value = '';
}

//UI prototype to show messages.
UI.prototype.showAlert = function(message, className) {
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
    //Showing a message.
    ui.showAlert('Book removed!', 'success');

    e.preventeDefault();
});