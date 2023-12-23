import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const ContactModal = ({ showModal, handleClose, title, content }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content ? (
          <div>
            <div className="tab-content"></div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Country ID</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {content.results.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.phone}</td>
                    <td>{item.country.id}</td>
                    <td>{item.country.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

const Problem2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(null);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleContacts = async (url) => {
    try {
      const data = await fetchData(url);
      setContent(data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-lg btn-outline-primary"
          type="button"
          onClick={() => handleContacts('https://contact.mediusware.com/api/contacts/?page=1')}
        >
          All Contacts
        </button>
        <button
          className="btn btn-lg btn-outline-warning"
          type="button"
          onClick={() => handleContacts('https://contact.mediusware.com/api/country-contacts/us/?page=1')}
        >
          US Contacts
        </button>
      </div>

      <ContactModal
        showModal={showModal}
        handleClose={handleClose}
        title="Contacts Modal"
        content={content}
      />
    </div>
  );
};

export default Problem2;
