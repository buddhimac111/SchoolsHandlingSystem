import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import UseUser from "../hooks/UserHook";

const RequestPage = () => {
  const [userID, setuserID] = useState("");
  const [userName, setuserName] = useState("");
  const [requestType, setRequestType] = useState("");
  const [requestTypes, setRequestTypes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user } = UseUser();

  useEffect(() => {
    if (user === "student") {
      setRequestTypes(["Get leaving certificate", "Get character certificate"]);
    } else if (user === "teacher") {
      setRequestTypes(["Change credentials", "Request leave"]);
    } else {
      setRequestTypes([]);
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRequest = {
      userID,
      userName,
      user,
      requestType,
    };

    console.log(newRequest);

    axios
      .post("/api/student/request", newRequest)
      .then((response) => {
        setSuccess("Request submitted successfully!");
        setError("");
        setuserID("");
        setuserName("");
        setRequestType("");
      })
      .catch((error) => {
        setError("Error submitting request. Please try again later.");
        setSuccess("");
        setuserID("");
        setuserName("");
        setRequestType("");
      });
  };

  return (
    <>
      <div className="row">
        <h1 className="text-capitalize">{user} Request Page</h1>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form.Group className="mt-2" controlId="userID">
            <Form.Label className="text-capitalize">{user} ID</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter ${user} ID`}
              value={userID}
              onChange={(e) => setuserID(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="userName">
            <Form.Label className="text-capitalize">{user} Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter ${user} name`}
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-2" controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              className="text-capitalize"
              type="text"
              value={user}
              readOnly
            />{" "}
          </Form.Group>

          <Form.Group className="mt-2" controlId="requestType">
            <Form.Label>Request Type</Form.Label>
            <Form.Control
              as="select"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
            >
              <option value="">Select request type</option>
              {requestTypes.map((requestType, index) => (
                <option key={index} value={requestType}>
                  {requestType}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button className="mt-4" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default RequestPage;
