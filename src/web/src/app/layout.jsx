import React from 'react';
import './global.css';

const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <h1>Your Website Title</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; {new Date().getFullYear()} Your Company Name</p>
            </footer>
        </div>
    );
};

export default Layout;