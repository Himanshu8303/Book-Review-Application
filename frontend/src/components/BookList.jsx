import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      <ul className="list-disc pl-5">
        {books.map((book) => (
          <li key={book._id} className="mb-2">
            <Link to={`/books/${book._id}`} className="text-blue-500 hover:underline">{book.title}</Link> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
