/*
function loadIndex() {
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', 'https://sq-bookinfo.azurewebsites.net/book_info.json');
    indexRequest.onload = function() {
        console.log("Index JSON:" + indexRequest.responseText);
        var index = JSON.parse(indexRequest.responseText);
        for (i=0; i<index.length; i++) {
            URLArray.push(index[i].ContactURL);
        }
        console.log("URLArray: " + JSON.stringify(URLArray));
        loadContacts();
    }
    indexRequest.send();
}

function loadContacts() {
    contactArray.length = 0;
    loadedContact = 0;

    if (URLArray.length > loadedContact) {
        loadNextContact(URLArray[loadedContact]);
    }
}

}*/

var URLArray = [];
var contactArray = [];
var contactIndex = 0;
var bookTitle;
var bookAuthor;
var bookGenre;

function initApp() {
    loadIndex();
}
function next() {
    contactIndex++;

    if (contactIndex > contactArray.length-1) {
        contactIndex = 0;  }
    viewCurrentContact();
}

function previous() {
    contactIndex--;

    if (contactIndex < 0) {
        contactIndex = contactArray.length-1;
    }
    viewCurrentContact();
}

function add() {
    var contact = {
        "bookTitle": "",
        "bookAuthor": "",
        "bookGenre": ""
    }
    
    if (document.getElementById("bookTitle").value != "") {
        contactArray.push(contact);
        sortArray();
        contactIndex = -1;
    }
}

function loadIndex() {
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', 'https://sq-bookinfo.azurewebsites.net/book_info.json');
    indexRequest.onload = function() {
        console.log("Index JSON:" + indexRequest.responseText);
        var index = JSON.parse(indexRequest.responseText);

        for (i=0; i<index.length; i++) {
            URLArray.push(index[i].ContactURL);
        }
        console.log("URLArray: " + JSON.stringify(URLArray));
        loadContacts();
    }
    indexRequest.send();
}

function loadContacts() {
    contactArray.length = 0;
    loadedContact = 0;

    if (URLArray.length > loadedContact) {
        loadNextContact(URLArray[loadedContact]);
    }
}

function loadNextContact(URL) {
    console.log("URL: " + URL);
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL);
    contactRequest.onload = function() {
        console.log(contactRequest.responseText);
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        console.log("Book: " + contact.BookTitle);
        contactArray.push(contact);

        loadedContact++;

        if (URLArray.length > loadedContact) {
            loadNextContact(URLArray[loadedContact]);
        } else {
            sortArray();
            viewCurrentContact();
        }
    }
    contactRequest.send();
}

function viewCurrentContact() {
    var currentContact = contactArray[contactIndex];
    console.log(currentContact);

    document.getElementById("bookID").value = currentContact.bookTitle;
    document.getElementById("authorID").value = currentContact.bookAuthor;
    document.getElementById("genreID").value = currentContact.bookGenre;

   }





