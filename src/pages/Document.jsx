import React from "react";
// import model
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// data base impot setp
import { database } from "../firebase/config";

// import inside the firebase
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Document() {
  // model creatation
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //  ending

  // this channal colletion reference  to add new  variable
  const CollectionRef = collection(database, "users");

  // all the document to display state
  const [documentlist, setDocumentlist] = useState([]);
  // this state document name
  const [documentName, setDocumentName] = useState("");
  // this state discription
  const [documentdis, setDocumentdis] = useState("");

  //  get MEthod
  const getdocumentlList = async () => {
    const data = await getDocs(CollectionRef);

    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),

      id: doc.id,
    }));
    setDocumentlist(filteredData);
    setDocumentName("");
    setDocumentdis("");
    console.log(filteredData);
  };
  useEffect(() => {
    getdocumentlList();
  }, []);

  // Delete document
  const deleteDocs = async (id) => {
    const Doc = doc(database, "users", id);
    await deleteDoc(Doc)
      .then(() => {
        // Document deleted successfully, now update the channel list
        getdocumentlList();
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
      });
    alert("Are you sure delete  this item");
  };

  // POST METHOD in the section
  const postData = async () => {
    await addDoc(CollectionRef, {
      // those two  state passed
      language: documentName,
      discretion: documentdis,
    })
      .then(() => {
        // Data added successfully, now update the channel list
        getdocumentlList();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    alert("successfully added");
  };

  return (
    <>
      <div className="">
        <Link to={"/"}>
          <Button
            variant="danger"
            className="m-2 fw-bolder border-1 rounded-4  "
          >
            Home
          </Button>
        </Link>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Button
          style={{ fontSize: "30px", fontFamily: "Abril Fatface" }}
          className="mt-4 p-2 rounded-3 btn text-black bg-body-secondary "
          variant="primary"
          onClick={handleShow}
        >
          Create Record
        </Button>
      </div>

      {/* model display */}
      <Modal className="modal-md" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Any Time</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            className="w-100 p-3 fw-bolder "
            ype="text"
            placeholder="Enter Your Document Name "
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
          />
          <input
            className="w-100 p-3 mt-3"
            ype="text"
            placeholder="Enter Your Document details "
            value={documentdis}
            onChange={(e) => setDocumentdis(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn bg-black text-white accordion-collapse me-3"
            onClick={postData}
          >
            Submit
          </button>
          <button
            className="btn bg-success  accordion-collapse"
            onClick={handleClose}
          >
            Colesd
          </button>
        </Modal.Footer>
      </Modal>
      {/* ending part */}
      <Row className="m-2 mt-5">
        {documentlist.map((docsitem) => (
          <Col key={docsitem.id} sm={12} md={6} lg={4}>
            <Card className="mb-3 shadow">
              <Card.Body>
                <div className="text-center">
                  <h1
                    className="border-1 mt-2 fw-bolder overflow-hidden"
                    style={{ maxWidth: "100%" }}
                  >
                    {docsitem.language}
                  </h1>
                </div>
                <Link style={{ textDecoration: 'none', color: 'black', fontFamily: '' }} to={`/Quilpage/${docsitem.id}`}>
  <p className="mt-3 text-start" dangerouslySetInnerHTML={{ __html: docsitem.discretion  }}></p>
</Link>

                <div className="d-flex  justify-content-center  align-items-center">
                  <Button
                    variant="danger"
                    className="w-25 fw-bolder border-1 rounded-4  "
                    onClick={() => deleteDocs(docsitem.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Document;
