import React, { useState, useEffect, useMemo, useRef } from "react";
import UserService from "../services/user.service";
import ViewBook from "../models/viewBook";
import { useTable } from "react-table";
import AuthService from "../services/auth.service";

const BoardUser = (props) => {
  const [books, setBooks] = useState([]);
  const [viewModalShow, setviewModalShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const booksRef = useRef();

  const [updateData, setupdateData] = useState({
    title: "",
    author: "",
    description: "",
  });

  booksRef.current = books;

  const openViewModal = (cell) => {
    if (cell.column.id == "title") {
      setviewModalShow(true);
    }
  };

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

  const loadBook = (rowIdx, cell) => {
    const id = booksRef.current[rowIdx].id;
    UserService.getBook(id)
      .then((response) => {
        setupdateData(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const issueBook = (rowIdx) => {
    var data = {
      isIssue: true,
      userId: currentUser.id,
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
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  issueBook(rowIdx);
                }}
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
                      <td
                        onClick={() => {
                          loadBook(row.id);
                          openViewModal(cell);
                        }}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ViewBook
        show={viewModalShow}
        onHide={() => setviewModalShow(false)}
        title={updateData.title}
        author={updateData.author}
        description={updateData.description}
      />
    </div>
  );
};

export default BoardUser;
