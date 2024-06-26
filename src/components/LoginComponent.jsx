import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';
import Typewriter from 'typewriter-effect';
import './ListTodosComponent.css';

function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // State for loading
    const [message, setMessage] = useState(''); // Unified state for messages
    const [isRegistering, setIsRegistering] = useState(false);

    const navigate = useNavigate();
    const authContext = useAuth();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    async function handleLogin() {
        setLoading(true); // Set loading state to true
        setMessage(''); // Clear any previous messages

        // Set a timer for showing the disclaimer
        const timer = setTimeout(() => {
            setMessage('The server is waking up. This may take 1-2 minutes. Please wait...');
        }, 5000);

        try {
            const response = await authContext.login(username, password);
            clearTimeout(timer); // Clear the timer if the call returns within 5 seconds
            if (response) {
                
                navigate(`/welcome`);
            } else {
                setMessage('Authentication Failed. Please check your credentials.');
                
            }
        } finally {
            setLoading(false); // Set loading state back to false
        }
    }

    async function handleRegister() {
        setLoading(true); // Set loading state to true
        setMessage(''); // Clear any previous messages

        // Set a timer for showing the disclaimer
        const timer = setTimeout(() => {
            setMessage('The server is waking up. This may take 1-2 minutes. Please wait...');
        }, 5000);

        const userData = {
            email,
            firstName,
            lastName,
            password
        };

        try {
            const response = await authContext.register(userData);
            clearTimeout(timer); // Clear the timer if the call returns within 5 seconds
            if (response) {
                setIsRegistering(false);
                setMessage('Registered successfully. Please login.');
            } else {
                setMessage('Registration Failed. Please check your details.');
            }
        } finally {
            setLoading(false); // Set loading state back to false
        }
    }

    function handleRegisterToggle() {
        setIsRegistering(!isRegistering);
        setMessage(''); // Clear any previous messages
    }

    return (
        <section className="login-container" style={{ width: '100%', height: '100vh' }}>
            <div className="tint-overlay"></div>
            <div className="px-4 py-5 px-md-5 text-center text-lg-start position-relative">
                {/* Tint effect overlay */}
                
                <div className="container">
                    <div className="row gx-lg-5 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h3 style={{ color: "hsl(210, 29%, 25%)", fontSize: 85, textAlign: 'center' }}>
                                <Typewriter
                                    options={{
                                        strings: ["TO-DO List", "Target List", "Wish-List", "Grocery List"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </h3>
                        </div>
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card login-card">
                                <div className="card-body py-5 px-md-5">
                                    <div className="text-center">
                                        <h1 className="fw-bold mb-5" style={{ color: "hsl(210, 29%, 25%)" }}>
                                            {isRegistering ? 'Register Now!' : 'Time for Login Now!'}
                                        </h1>
                                    </div>
                                    {message && (
                                        <div className={`text-center mb-3 ${message.includes('successfully') ? 'text-success' : 'text-warning'}`}>
                                            {message}
                                        </div>
                                    )}
                                    {isRegistering ? (
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <h6 className="form-label" htmlFor="form3Example1">First name</h6>
                                                        <input
                                                            type="text"
                                                            id="form3Example1"
                                                            className="form-control"
                                                            value={firstName}
                                                            onChange={handleFirstNameChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <h6 className="form-label" htmlFor="form3Example2">Last name</h6>
                                                        <input
                                                            type="text"
                                                            id="form3Example2"
                                                            className="form-control"
                                                            value={lastName}
                                                            onChange={handleLastNameChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <h6 className="form-label" htmlFor="form3Example3">Email address</h6>
                                                <input
                                                    type="email"
                                                    id="form3Example3"
                                                    className="form-control"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <h6 className="form-label" htmlFor="form3Example4">Password</h6>
                                                <input
                                                    type="password"
                                                    id="form3Example4"
                                                    className="form-control"
                                                    value={password}
                                                    onChange={handlePasswordChange}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-lg mb-4"
                                                    onClick={handleRegister}
                                                    disabled={loading} // Disable button if loading
                                                >
                                                    {loading ? 'Loading...' : 'Register'}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-success btn-lg mb-4 ms-3"
                                                    onClick={handleRegisterToggle}
                                                >
                                                    Back to Login
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <form>
                                            <div className="form-outline mb-4">
                                                <h6 className="form-label" htmlFor="form3Example3">Email Address</h6>
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={handleUsernameChange}
                                                    id="form3Example3"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <h6 className="form-label" htmlFor="form3Example4">Password</h6>
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={handlePasswordChange}
                                                    id="form3Example4"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    className="btn btn-success btn-lg mb-4"
                                                    type="button"
                                                    name="login"
                                                    onClick={handleLogin}
                                                    disabled={loading} // Disable button if loading
                                                >
                                                    {loading ? 'Loading...' : 'Login'}
                                                </button>
                                                <button
                                                    className="btn btn-outline-success btn-lg mb-4 ms-3"
                                                    type="button"
                                                    name="register"
                                                    onClick={handleRegisterToggle}
                                                >
                                                    Register
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginComponent;
