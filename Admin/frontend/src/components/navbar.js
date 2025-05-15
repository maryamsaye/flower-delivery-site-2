// import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <h1>Admin Panel</h1>
                <div className="admin">
                    <button className="grey">Flowers</button>
                    <button className="wyt">Add Flowers</button>
                </div>
                
            </div>
        </header>
    )
}

export default Navbar;