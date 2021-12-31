const { authJwt } = require("../middleware");

module.exports = (app) => {
  const books = require("../controllers/books.contoller");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Create a new Book
  router.post("/", books.saveBook);

  // Retrieve all books
  router.get("/", books.getBooks);

  // Retrieve single book
  router.get("/:id", books.getBook);

  // Update a Book with id
  router.put("/:id", books.issueBook);

  // Delete a Book with id
  router.delete("/:id", books.deleteBook);

  app.use("/api/books", router);
};
