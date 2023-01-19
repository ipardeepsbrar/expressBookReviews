const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  let myPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      let myBooks = [];
      for (let i in books) {
        myBooks.push(books[i]);
      }
      resolve(myBooks);
    }, 2000);
  });

  myPromise1.then((myBooks) => {
    return res.status(300).json(myBooks);
  });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  let myPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      const mybook = books[isbn];
      resolve(mybook);
    }, 2000);
  });

  myPromise1.then((book) => {
    return res.status(300).json(book);
  });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  let myPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      let mybook = [];
      for (let i in books) {
        if (books[i].author === author) {
          mybook.push(books[i]);
        }
      }
      resolve(mybook);
    }, 2000);
  });

  myPromise1.then((book) => {
    return res.status(300).json(book);
  });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  let myPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      let mybook;
      for (let i in books) {
        if (books[i].title === title) {
          mybook = books[i];
        }
      }
      resolve(mybook);
    }, 2000);
  });
  myPromise1.then((book) => {
    return res.status(300).json(book);
  });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  let reviews;
  for (let i in books) {
    if (i === isbn) {
      reviews = books[i].reviews;
    }
  }
  return res.status(300).json(JSON.stringify(reviews));
});

module.exports.general = public_users;
