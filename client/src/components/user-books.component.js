import React, { useState, useEffect, useMemo, useRef } from "react";
import UserService from "../services/user.service";
import { useTable } from "react-table";

const UserBooks = (props) => {
  const [userBooks, setUserBooks] = useState([]);
  const [userBook, setuserBook] = useState([]);

  const booksRef = useRef();

  booksRef.current = userBook;

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

  const loadBook = (rowIdx) => {
    userBooks.map((book) => {
      UserService.getBook(book.bookId)
        .then((response) => {
          setuserBook(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const loadUser = (rowIdx) => {
    userBooks.map((book) => {
      UserService.getUser(book.userId)
        .then((response) => {
          setuserBook(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const refreshList = () => {
    retrieveBooks();
  };
  // loadBook();
  // loadUser();

  const columns = useMemo(
    () => [
      {
        Header: "Book Name",
        accessor: "bookId",
      },
      {
        Header: "User Name",
        accessor: "userId",
      },
      {
        Header: "Issued Date",
        accessor: "issuedDate",
      },
      {
        Header: "Return Date",
        accessor: "returnDate",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: userBooks,
    });

  return (
    <div className="list row">
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBooks;
