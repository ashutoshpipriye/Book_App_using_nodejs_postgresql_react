import React, { useState, useEffect, useMemo, useRef } from "react";
import UserService from "../services/user.service";
import { useTable } from "react-table";

const BoardUser = (props) => {
  const [books, setBooks] = useState([]);
  const booksRef = useRef();

  booksRef.current = books;

  useEffect(() => {
    retrieveBooks();
  }, []);

  const retrieveBooks = () => {
    UserService.getAvailableBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBooks();
  };

  // const viewBook = (rowIndex) => {
  //   const id = booksRef.current[rowIndex].id;

  //   props.history.push("/books/" + id);
  // };

  const issueBook = (rowIdx) => {
    var data = {
      isIssue: true,
    };
    const id = booksRef.current[rowIdx].id;
    UserService.issueBook(id, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    refreshList();
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Author",
        accessor: "author",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Available",
        accessor: "Available",
        Cell: (props) => {
          return props.isIssue ? "Issued" : "Available";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              {/* <span onClick={() => openBook(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span> */}

              <button
                className="btn btn-outline-secondary"
                type="button"
                // onClick={issueBook(rowIdx)}
                onClick={() => issueBook(rowIdx)}
              >
                Issue Book
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: books,
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

export default BoardUser;
