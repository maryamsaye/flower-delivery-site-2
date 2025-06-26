import React, { useState, useRef } from 'react';
import axios from 'axios';
import './AddFlower.css';

const AddFlower = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    Image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        Image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, Image: null }));
      setPreviewImage(null);
    }
  };

  const handleUploadClick = () => fileInputRef.current.click();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('Image', formData.Image);

    try {
      await axios.post("https://flower-delivery-site.onrender.com/api/flowers", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      alert('Flower added successfully!');
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        Image: null,
      });
      setPreviewImage(null);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error('Error adding flower:', error.response?.data || error.message);
      alert('Failed to add flower. Check the console for details.');
    }
  };

  return (
    <div className="add-flower-container">
      <h2>Add New Flower</h2>
      <form onSubmit={handleSubmit} className="flower-form">
        <div className="upload-box" onClick={handleUploadClick}>
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="preview-image" />
          ) : (
            <div>📷 Upload</div>
          )}
        </div>
        <input
          type="file"
          name="Image"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <div className="input-row">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddFlower;
