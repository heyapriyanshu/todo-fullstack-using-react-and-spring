import React from 'react';
import linkedinLogo from './image.png'; // Replace with your LinkedIn logo image path

const ErrorComponent = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <div
                style={{
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f0f0f0',
                    maxWidth: '80%',
                }}
            >
                <h1>I apologize for any inconvenience caused.</h1>
                <div>
                    Please try again later or reach out to me at <a href="https://www.linkedin.com/in/priyanshuranjan-/" target="_blank" rel="noopener noreferrer"><img src={linkedinLogo} alt="LinkedIn Logo" style={{ width: '24px', height: '24px', verticalAlign: 'middle', marginLeft: '5px' }} /></a>
                </div>
            </div>
        </div>
    );
};

export default ErrorComponent;
