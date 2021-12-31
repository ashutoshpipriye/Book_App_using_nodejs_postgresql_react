import React, { useState, useEffect, useMemo, useRef } from "react";
import UserService from "../services/user.service";
import ViewBook from "../models/viewBook";
import UpdateBook from "../models/updateBook";
import { useTable } from "react-table";

const BoardAdmin = (props) => {
  const [books, setBooks] = useState([]);
  const [viewModalShow, setviewModalShow] = useState(false);
  const [editModalShow, seteditModalShow] = useState(false);

  const [updateData, setupdateData] = useState({
    title: "",
    author: "",
    description: "",
  });

  const onInputChanges = (event) => {
    setupdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  const openEditModal = () => {
    seteditModalShow(true);
  };

  const openViewModal = () => {
    setviewModalShow(true);
  };

  const booksRef = useRef();

  booksRef.current = books;

  useEffect(() => {
    retrieveBooks();
  }, []);

  const retrieveBooks = () => {
    UserService.getAllBooks()
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

  const loadBook = (rowIdx) => {
    const id = booksRef.current[rowIdx].id;
    UserService.getBook(id)
      .then((response) => {
        setupdateData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateBook = () => {
    var data = {
      title: updateData.title,
      author: updateData.author,
      description: updateData.description,
    };
    const id = updateData.id;
    UserService.updateBook(id, data)
      .then((response) => {
        console.log(response.data);
        seteditModalShow(false);
      })
      .catch((e) => {
        console.log(e);
      });
    refreshList();
  };

  const deleteBook = (rowIndex) => {
    const id = booksRef.current[rowIndex].id;

    UserService.deleteBook(id)
      .then((response) => {
        props.history.push("/addBook");

        let newBooks = [...books.current];
        newBooks.splice(rowIndex, 1);

        setBooks(newBooks);
      })
      .catch((e) => {
        console.log(e);
      });
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
        accessor: "isIssue",
        Cell: (props) => {
          return props.value ? "Not-Available" : "Available";
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
                  loadBook(rowIdx);
                  openViewModal();
                }}
              >
                View Book
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  loadBook(rowIdx);
                  openEditModal();
                }}
              >
                Update Book
              </button>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => deleteBook(rowIdx)}
              >
                Delete Book
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
      <UpdateBook
        show={editModalShow}
        onHide={() => seteditModalShow(false)}
        title={updateData.title}
        author={updateData.author}
        description={updateData.description}
        onInputChanges={onInputChanges}
        updateBook={updateBook}
      />
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

export default BoardAdmin;
