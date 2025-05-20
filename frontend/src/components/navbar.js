import { Link } from "react-router-dom";
import './navbar.css'; // Make sure your styles are loaded

const Navbar = () => {
return (
    <header>
    <div className="container">
        <h1>Admin Panel</h1>
        <div className="admin">
        <Link to="/">
            <button className="grey">Flowers</button>
        </Link>
        <Link to="/add">
            <button className="wyt">Add Flowers</button>
        </Link>
        </div>
    </div>
    </header>
);
};

export default Navbar;
