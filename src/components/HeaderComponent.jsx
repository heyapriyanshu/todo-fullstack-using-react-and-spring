import { Link } from 'react-router-dom';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

export default function HeaderComponent() {
    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated;
    const [loading, setLoading] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate()

    function handleLogout() {
        setLoading(true);
        setShowLogoutModal(false);
        navigate("/logout")
        setTimeout(() => {
            authContext.logout();
            setLoading(false);
            
        }, 1800);
    }

    return (
        <>
            <header className="border-bottom border-light border-5 mb-5 p-2">
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg">
                            <p className="navbar-brand ms-2 fs-2 text-muted badge badge-primary text-wrap" style={{ width: "6rem" }}>
                                <Link className="nav-link" to="/welcome">Todo App</Link>
                            </p>
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav">
                                    <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/welcome">Home</Link>}</li>
                                    <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}</li>
                                </ul>
                            </div>
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">{!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}</li>
                                <li className="nav-item fs-5">{!isAuthenticated && <Link className="nav-link" to="/register">Register</Link>}</li>
                                <li className="nav-item fs-5">
                                    {isAuthenticated && (
                                        <Link className="nav-link" to="#" onClick={() => setShowLogoutModal(true)}>
                                            {loading ? (
                                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                            ) : (
                                                "Logout"
                                            )}
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            {showLogoutModal && <div className="modal-backdrop"></div>}
            {showLogoutModal && (
                <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Logout</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowLogoutModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to logout?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowLogoutModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
