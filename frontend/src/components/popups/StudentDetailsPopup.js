import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import utils from "../../utils";

export default function StudentDetailsPopup({ show, setShow, data }) {
  if (!data._id) {
    return;
  }
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      size="xl"
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title>Student Details for student ID : {data._id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ms-2 mb-0 me-2" id="tblContainer">
          <div className="container-fluid ">
            <div className="row">
              <Form.Group controlId="name" className="col-12 mt-3 text-center">
                <img
                  src={utils.URI + "/" + data.picture}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                  className="rounded-circle"
                />
              </Form.Group>
              <Form.Group controlId="name" className="col-12 mt-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={data.name} readOnly />
              </Form.Group>

              <Form.Group controlId="address" className="col-12 mt-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={data.address} readOnly />
              </Form.Group>

              <Form.Group controlId="email" className="col-12 mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={data.email} readOnly />
              </Form.Group>

              <div className="row">
                <Form.Group controlId="email" className="col-6 mt-3">
                  <Form.Label>Parent Name</Form.Label>
                  <Form.Control
                    type="email"
                    value={data.parent.name}
                    readOnly
                  />
                </Form.Group>

                <Form.Group controlId="phone" className="col-6 mt-3">
                  <Form.Label>Parent Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.parent.phone}
                    readOnly
                  />
                </Form.Group>

                <Form.Group controlId="grade" className="col-12 mt-3">
                  <Form.Label>Student Class</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.DOB.split("T")[0]}
                    readOnly
                  />
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            setShow(false);
          }}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
