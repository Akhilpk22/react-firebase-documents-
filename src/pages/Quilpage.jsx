import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { database } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

// function stripHTMLTags(html) {
//   const doc = new DOMParser().parseFromString(html, 'text/html');
//   return doc.body.textContent || '';
// }

function Quilpage() {
  const { id } = useParams();
  const [docBody, setDocBody] = useState(null);
  const quillRef = useRef(null);

  const fetchDocBody = async () => {
    try {
      const docRef = doc(database, 'users', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { discretion } = docSnap.data();
        setDocBody(discretion);
      } else {
        console.log('Document does not exist!');
      }
    } catch (error) {
      console.error('Error fetching document body:', error);
    }
  };

  const handleDocBodyChange = (value, delta, source) => {
    if (source === 'user') {
      setDocBody(value);
    }
  };

  const handleSaveButtonClick = async () => {
    try {
      const docRef = doc(database, 'users', id);
      await updateDoc(docRef, {
        discretion: docBody,
      });
      alert('Document saved successfully!');
    } catch (error) {
      console.error('Error updating document body:', error);
    }
  };

  useEffect(() => {
    fetchDocBody();
  }, [id]);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.focus();
    }
  }, [quillRef]);

  return (
    <div className='vh-100'>
      <Container className='p-5'>
        <ReactQuill
          className='bg-body-secondary'
          ref={quillRef}
          value={docBody}
          onChange={handleDocBodyChange}
        />
        <Link to={'/Document'}>
          <button className='btn btn-primary mt-3' onClick={handleSaveButtonClick}>
            Save
          </button>
        </Link>
      </Container>
    </div>
  );
}

export default Quilpage;
