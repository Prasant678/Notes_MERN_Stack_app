import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login")
    }
    let location = useLocation();

    const handleHome = () => {
        navigate("/")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "transparent" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">INOTEBOOK</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='nav-item'>
                            <i className="fa-solid fa-house mx-2" onClick={handleHome} style={{marginTop: "12px"}} />
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link className="btn border-dark btn-outline-warning mx-1 text-dark fw-bold" to="/login" role="button">Log in</Link>
                            <Link className="btn border-dark btn-outline-info mx-1 text-dark fw-bold" to="/signup" role="button">Sign up</Link>
                        </form> : <button onClick={handleLogout} className='btn border-dark btn-outline-danger text-dark fw-bold'>Log out</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
