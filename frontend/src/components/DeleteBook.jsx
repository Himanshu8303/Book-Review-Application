import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DeleteBook({ bookId }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        setError(null);
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
          method: 'DELETE',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete book');
        }

        navigate('/books');
      } catch (err) {
        console.error('Delete error:', err);
        setError(err.message);
      }
    }
  };

  return (
    <div className="mt-4">
      <button 
        onClick={handleDelete} 
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Book
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default DeleteBook;
