import React, { useState } from "react";
import UserService from "../services/user.service";

const AddBook = () => {
  const initialBookState = {
    title: "",
    author: "",
    description: "",
  };
  const [book, setBook] = useState(initialBookState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const saveBook = () => {
    var data = {
      title: book.title,
      author: book.author,
      description: book.description,
    };

    UserService.createBook(data)
      .then((response) => {
        setBook({
          title: response.data.title,
          author: response.data.author,
          description: response.data.description,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newBook = () => {
    setBook(initialBookState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBook}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={book.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author Name</label>
            <input
              type="text"
              className="form-control"
              id="author"
              required
              value={book.author}
              onChange={handleInputChange}
              name="author"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Book Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={book.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveBook} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBook;
