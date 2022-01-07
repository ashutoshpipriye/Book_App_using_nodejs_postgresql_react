import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import UserService from "../services/user.service";

const UserBooks = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveBooks();
  }, []);

  const retrieveBooks = () => {
    UserService.getUsers()
      .then((response) => {
        setUsers(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let data = users.map((users) => (
    <tr>
      <td>{users.username}</td>
      <td>{users.email}</td>
      <td>{users.roles.map((role) => role.name.toUpperCase())}</td>
      <td>{users.createdAt}</td>
    </tr>
  ));

  return (
    <div>
      <Table bordered style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Register Date</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </Table>
    </div>
  );
};

export default UserBooks;
