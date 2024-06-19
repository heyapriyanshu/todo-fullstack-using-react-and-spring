import { Link } from 'react-router-dom';
import { useState } from 'react'; // Import useState hook
import { useAuth } from './security/AuthContext';

export default function HeaderComponent() {
    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated;
    const [loading, setLoading] = useState(false); // State for loading spinner

    function handleLogout() {
        setLoading(true); // Show loading spinner

        // Simulate delay using setTimeout (1 second)
        setTimeout(() => {
            authContext.logout();
            setLoading(false); // Hide loading spinner after logout
        }, 1800); // 1000 milliseconds = 1 second
    }

    return (
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
                                    <Link className="nav-link" to="/logout" onClick={handleLogout}>
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
    );
}
