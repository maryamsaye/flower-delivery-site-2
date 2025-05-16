import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Flowers.css';

const Flowers = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    fetchFlowers();
  }, []);

  const fetchFlowers = () => {
    axios
      .get('/api/flowers')
      .then((res) => setFlowers(res.data))
      .catch((err) => console.error('Error fetching flowers:', err));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this flower?')) {
      try {
        await axios.delete(`/api/flowers/${id}`);
        fetchFlowers(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting flower:', error);
      }
    }
  };

  return (
    <div className="flower-container">
      <h1 className="flower-title">Flowers</h1>
      <div className="flower-grid">
        {flowers.map((flower) => {
          const imageUrl = `http://localhost:4002${flower.Image}`;

          return (
            <div className="flower-card" key={flower._id}>
              <img src={imageUrl} alt={flower.title} className="flower-image" />
              <div className="flower-details">
                <h3>{flower.title}</h3>
                <p>{flower.description}</p>
                <p className="category">Category: {flower.category}</p>
                <p className="price">${flower.price}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(flower._id)}
                >
                  −
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Flowers;
