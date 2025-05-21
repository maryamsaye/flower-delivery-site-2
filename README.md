# Flower Delivery Website

This is a full-stack flower delivery web application consisting of a **React frontend** and a **Node.js/Express backend** with **MongoDB** for data storage and **Multer** for image uploads. The application allows users to add, view, and delete flower products with images.

---

##  Live Demo

- **Frontend:** [https://your-frontend-url.onrender.com](https://your-frontend-url.onrender.com)
- **Backend:** [https://flower-delivery-site-2.onrender.com](https://flower-delivery-site-2.onrender.com)

 **Presentation Video:**  
[Watch on Loom]
render link []

---

## Frontend – React

### Features

- Add new flowers via a form with image upload
- Display flowers in a responsive card grid
- Preview uploaded images
- Delete flowers
- API integration with backend using `axios`
- Custom CSS for styling

### Environment Setup

Create a `.env` file in the `/client` directory:

```env
REACT_APP_API_URL=https://flower-delivery-site-2.onrender.com
 Getting Started
bash
Copy
Edit
cd client
npm install        # Install dependencies
npm start          # Run development server
npm run build      # Create production build
 Backend – Node.js, Express, MongoDB
Features
RESTful API for flower CRUD operations

Image upload handling using multer

Stores uploaded images in uploads/ directory

Serves static image files

Uses MongoDB via Mongoose for database operations

.env configuration for environment variables

 Environment Setup
Create a .env file in the /server directory:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=4002
 Getting Started
bash
Copy
Edit
cd server
npm install         # Install backend dependencies
npm start           # Start server in production mode
npm run dev         # Start server with nodemon (development)
 API Endpoints
Method	Endpoint	Description
GET	/api/flowers	Get all flowers
POST	/api/flowers	Add a new flower
DELETE	/api/flowers/:id	Delete a flower by ID
GET	/uploads/:filename	Access uploaded image file
GET	/api/users/getusers	Fetch sample user data

 ##Static File Access
Uploaded flower images are publicly accessible via:

bash
Copy
Edit
https://flower-delivery-site-2.onrender.com/uploads/<filename>
Example:

bash
Copy
Edit
https://flower-delivery-site-2.onrender.com/uploads/flower1_1715601234567.jpg
 Backend Dependencies
express

mongoose

multer

dotenv

nodemon (development)


## Author
Name: Maryam Abdu Saye
Email: marynsaye@gmail.com
GitHub: https://github.com/maryamsaye/flower-delivery-site-2

## License
This project is licensed under the MIT License. See the LICENSE file for details.
