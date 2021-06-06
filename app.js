class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    
    }
    
    
    }
    
    class UI {
    
        addBookToList(book) {
            const list = document.getElementById('book-list');
    
            //Create tr element
            const row = document.createElement('tr');
        
            //insert cols
        
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href = "#" class = "delete">X</a></td>
            `;
        
            list.appendChild(row);
        }
        showAlert(message, className) {
    
        //create a div
    
        const div = document.createElement('div');
        // add classes
    
        div.className = `alert ${className}`;
    
        //Add text
    
        div.appendChild(document.createTextNode(message));
        // get parent
        const container = document.querySelector('.container');
    
        const form = document.querySelector('#book-form');
    
        //insert Alert
    
        container.insertBefore(div,form);
    
        //dissapear after 3 secs
        setTimeout(function(){
    
            document.querySelector(`.alert`).remove();
        },3000);
    
        }
        deleteBook(target) {
            if(target.className === 'delete'){
                target.parentElement.parentElement.remove();
                
            }
        }
    
    
        clearFields() {
    
            document.getElementById('title').value = "";
            document.getElementById('author').value = "";
            document.getElementById('isbn').value = "";
        }
    }
    
    //local storage class, so when we refresh it will still be there
    
    class Store{
    
        static getBooks(){
    
            let books;
            if(localStorage.getItem('books') === null)
            {
                 books = [];
            }
    
    
            else
            {
                //needs to be a js object so we run it through JSON.parse
                books = JSON.parse(localStorage.getItem('books'));
    
            }
    
            return books;
        }
        static displayBooks(){
            const books = Store.getBooks();

            books.forEach(function(book)
            {
                const ui = new UI;

                //add book to ui

                ui.addBookToList(book);

            });
    
        }
    
        static addBook(book){
            const books = Store.getBooks();
    
            books.push(book);
    
            localStorage.setItem('books', JSON.stringify(books));
    
            //get books from local storage
    
        }
    
        static removeBook(isbn){

            console.log(isbn);

    const books = Store.getBooks();

    books.forEach(function(book, index)
    {
        if(book.isbn === isbn)
        {
            books.splice(index, 1);
        }

    });
    localStorage.setItem('books', JSON.stringify(books));


        }
    
    
    }
    
    //Event listeners
    // DOM LOAD EVENT

    document.addEventListener('DOMContentLoaded', Store.displayBooks);



    document.getElementById('book-form').addEventListener('submit', 
    function(e){
        
        //get form values
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
    
    
    //instantiating a book
    const book = new Book(title, author, isbn);
    
    
    //instantiating a new UI
    const ui = new UI();
    
    console.log(ui);
        //validate
    
    
        const container = document.querySelector('.container');
    console.log(container);
    
    
        if (title === "" || author === "" || isbn === "") {



            /* 
            
            another if

            if  .parent element exsits ??? delete

            */



            const bookForm = document.getElementById("book-form");
             console.log(bookForm.previousElementSibling.textContent);


             if(bookForm.previousElementSibling.textContent === "Please fill in all fields")


             {
                console.log("wait");

             }


             else
             {
                console.log("go");
                ui.showAlert("Please fill in all fields", 'error');

             }
            // if(bookForm.previousElementSibling.previousElementSibling.textContent === "Add Book")

            // {
                
            // }

            // else
            // {
            //                 ui.showAlert("Please fill in all fields", 'error');

            // }

            //error alert
            /* 
            
            if div thing exsits stop
            */
    
            // ui.showAlert("Please fill in all fields", 'error');
    
        }
        else {
    
        //add book to list
    
            ui.addBookToList(book);
    
            // add to local storage
    
            Store.addBook(book);
        //shwo success
    
        // hey if alert error div class exists, stop it from running 
        // if.container contains a class called alert success
    
    
    
            ui.showAlert('Book Added', 'success');
        
    
    
    
            //clear fields after adding
            ui.clearFields();
    
    
            // how do i make it you cant spam to have a million fileds??
        }

        
    
    




    
        e.preventDefault();
    });
    
    

//deleting the error comment


    // document.getElementById('book-form').addEventListener('submit', 
    // function(e){

    //     const bookForm = document.getElementById('book-form');
    //     bookForm.parentElement.parentElement.remove();


    //     e.preventDefault();
    // });
    







    
    // Event listener for delete (involve event deligation)
    
    document.getElementById('book-list').addEventListener('click', function(e){
    
        
    const ui = new UI();

    //this removes it from temporary view in the div
    
    ui.deleteBook(e.target);
    
    //show alert
    

    //Remove From LS pemanently

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
    if(e.target.className === 'delete')
    {
    
        ui.showAlert('book removed', 'success');
    }
        e.preventDefault();
    })
    