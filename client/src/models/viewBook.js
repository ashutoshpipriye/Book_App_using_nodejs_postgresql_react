import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

const Viewbook = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">View Book</Modal.Title>
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
            />
          </div>
          <div className="form-group">
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
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary mr-2" onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default Viewbook;
