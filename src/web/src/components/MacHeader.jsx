import React from 'react';
import './MacHeader.css'; // Assuming you have a CSS file for styling

const MacHeader = () => {
    return (
        <header className="mac-header">
            <div className="logo">
                <img src="/path/to/your/logo.png" alt="Logo" /> {/* Update with your logo path */}
            </div>
            <nav className="nav-links">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default MacHeader;