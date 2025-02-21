document.addEventListener("DOMContentLoaded", function() {
    const listPanel = document.getElementById("list")
    const showPanel = document.getElementById("show-panel")
    const user = { id : 1 , username : "Pouros"}
    // fetch all the books and display theit title 
    function fetchBooks(){
        fetch("http://localhost:3000/books")
        .then(response => response.json())
        .then(books => {
            listPanel.innerHTML = "";
            books.forEach(book => addBookToList(book))
        })
        .catch(error => console.error("Error fetching data from the server :",error))
    }
    
    // Create a function to add the list of books to the list panel
    
    function addBookToList(book){
        const li = document.createElement("li")
        li.textContent = `${book.title}`
        // Create an event listener to show the book information when the list of the book name is clicked
        li.addEventListener("click", () => showBookDetails(book))
        listPanel.appendChild(li)
    }
    
    // Create a function to show the book details  
    
    function showBookDetails(book){
        showPanel.innerHTML = `
        <img src = "${book.img-url}" alt = "${book.title}">
        <h2>${book.title}</h2>
        <p>${book.description}</p>
        <ul id = "user-list"> ${book.user.map(user => `<li>${user.username}</li>`).join("")}</ul>
        <button id = "like-button">${hasUserLiked(book)? "Unlike" : "like"}</button>
        `;
        const likeButton = document.getElementById("like-button")
        likeButton.addEventListener("click",() => toggleLike(book))
    }
    
    // create a function to check whether the current user has liked the book 
    function hasUserLiked(book){
        return book.users.some(user => user.id === currentUser.id)
    }
    
    // function to toggle the like likeButton
    
    function toggleLike(book){
        if(hasUserLiked){
            // remove the current user from the list 
            book.users = book.users.filter(user => user.id !== currentUser.id)
        }
        else {
            books.users.push(currentUser)
        }
        updateBook(book)
    }
    
    // create a function to update the json data 
    
    function updateBook(book){
        fetch("http://localhost:3000/books",{
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                Accept : "application/json",
            },
            body:JSON.stringify({users:book.users})
        })
        .then(reponse => response.json())
        .then(updatedBook => {
            showBookDetails(updatedBook)
        })
        .catch(error => console.error("Error updating data :",error))
    }
});
