import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Flowers.css';

const Flowers = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    axios
      .get('/api/flowers') // ✅ Just use a string here
      .then((res) => setFlowers(res.data))
      .catch((err) => console.error('Error fetching flowers:', err));
  }, []);

  return (
    <div className="flower-container">
      <h1 className="flower-title">Flowers</h1>
      <div className="flower-grid">
        {flowers.map((flower) => {
          const imageUrl = `http://localhost:4002${flower.Image}`;
          console.log('Image URL:', imageUrl);

          return (
            <div className="flower-card" key={flower._id}>
              <img
                src={imageUrl}
                alt={flower.title}
                className="flower-image"
              />
              <div className="flower-details">
                <h3>{flower.title}</h3>
                <p>{flower.description}</p>
                <p className="category">Category: {flower.category}</p>
                <p className="price">${flower.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Flowers;
