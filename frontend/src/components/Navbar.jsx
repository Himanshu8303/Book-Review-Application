import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ loggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the function to handle logout logic (e.g., clearing tokens)
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/books" className="hover:underline">Books</Link></li>
        <li><Link to="/add-book" className="hover:underline">Add Book</Link></li>
        {loggedIn ? (
          <li><button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button></li>
        ) : (
          <>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
