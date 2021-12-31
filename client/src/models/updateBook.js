import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

const UpdateBook = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="title"
              id="title"
              value={props.title}
              minLength={10}
              maxLength={140}
              onChange={(e) => props.onInputChanges(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Book Author</label>
            <textarea
              type="text"
              className="form-control"
              name="author"
              placeholder="Author"
              id="author"
              value={props.author}
              minLength={10}
              maxLength={500}
              onChange={(e) => props.onInputChanges(e)}
            />
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="description">Book Description</label>
              <textarea
                type="text"
                className="form-control"
                name="description"
                placeholder="Description"
                id="description"
                value={props.description}
                minLength={10}
                maxLength={500}
                onChange={(e) => props.onInputChanges(e)}
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary mr-2" onClick={props.onHide}>
          Close
        </button>
        <button className="btn btn-success" onClick={() => props.updateBook()}>
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateBook;
