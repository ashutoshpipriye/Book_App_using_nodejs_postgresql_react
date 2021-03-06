import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import UserService from "../services/user.service";

const UserBooks = (props) => {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    retrieveBooks();
  }, []);

  const retrieveBooks = () => {
    UserService.getUserBooks()
      .then((response) => {
        setUserBooks(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let data = userBooks.map((userBook) => (
    <tr>
      <td>{userBook.title}</td>
      <td>{userBook.users.map((user) => user.username)}</td>
      <td>{userBook.users.map((user) => user.user_books.issuedDate)}</td>
      <td>{userBook.users.map((user) => user.user_books.returnDate)}</td>
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
