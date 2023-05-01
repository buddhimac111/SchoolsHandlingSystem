import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import utils from "../../utils";

export default function TimetablePopup({ show, setShow, data }) {
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];
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
        <Modal.Title>Teacher Details for teacher ID : {data._id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ms-2 mb-0 me-2 mt-3" id="tblContainer">
          <div className="container-fluid mt-5">
            <div className="row">
              <table
                className="table table-bordered table-striped"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr className="table-dark">
                    <th>#</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                  </tr>
                </thead>
                <tbody>
                  {periods.map((period) => {
                    return (
                      <tr key={period}>
                        <td>{period}</td>
                        <td>{data.monday[period - 1]}</td>
                        <td>{data.tuesday[period - 1]}</td>
                        <td>{data.wednesday[period - 1]}</td>
                        <td>{data.thursday[period - 1]}</td>
                        <td>{data.friday[period - 1]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
