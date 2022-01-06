import React, { useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import UserService from "../services/user.service";
import { useTable } from "react-table";

const UserBooks = (props) => {
  const [userBooks, setUserBooks] = useState([]);
  const [book, setBook] = useState([]);
  const [user, setUser] = useState([]);

  const [updateData, setupdateData] = useState(
    {
      bookName: "",
      username: "",
      issuedDate: "",
      returnDate: "",
    },
  );

  // setupdateData({
  //   bookName: book.title,
  //   username: user.username,
  //   issuedDate: userBooks.issuedDate,
  //   returnDate: userBooks.returnDate,
  // });
  console.log(updateData);
  // const booksRef = useRef();

  // booksRef.current = userBook;

  useEffect(() => {
    retrieveBooks();
  }, []);

  const retrieveBooks = () => {
    UserService.getUserBooks()
      .then((response) => {
        setUserBooks(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const loadBook = () => {
    userBooks.map((book) => {
      UserService.getBook(book.bookId)
        .then((response) => {
          setupdateData(response.data.title);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const loadUser = () => {
    userBooks.map((user) => {
      UserService.getUser(user.userId)
        .then((response) => {
          setupdateData(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const refreshList = () => {
    retrieveBooks();
    loadBook();
    loadUser();
  };

  // refreshList();

  let data = userBooks.map((userBook) => (
    <tr>
      <td>{userBook.bookId}</td>
      <td>{userBook.userId}</td>
      <td>{userBook.issuedDate}</td>
      <td>{userBook.returnDate}</td>
    </tr>
  ));

  return (
    <div>
      <Table bordered style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>User Name</th>
            <th>Issued Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </Table>
    </div>
  );
};

export default UserBooks;
