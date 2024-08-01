import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DeleteBook from './DeleteBook';

function BookDetails() {
  const [book, setBook] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/books/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(review)
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      // Refresh book data
      const bookResponse = await fetch(`http://localhost:5000/api/books/${id}`);
      if (!bookResponse.ok) {
        throw new Error('Failed to fetch updated book data');
      }
      const updatedBook = await bookResponse.json();
      setBook(updatedBook);
      setReview({ rating: 5, comment: '' });
    } catch (err) {
      console.error(err);
    }
  };

  if (!book) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
      <p className="text-lg mb-2">Author: {book.author}</p>
      <p className="text-base mb-4">Description: {book.description}</p>
      <Link to={`/edit-book/${book._id}`} className="text-blue-500 hover:underline">Edit Book</Link>
      <DeleteBook bookId={book._id} />

      <h3 className="text-xl font-semibold mt-6 mb-2">Reviews</h3>
      <ul className="list-disc pl-5">
        {book.reviews.map((review, index) => (
          <li key={index} className="mb-4">
            Rating: {review.rating}/5
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">Add a Review</h3>
      <form onSubmit={handleReviewSubmit} className="w-full max-w-md">
        <select
          value={review.rating}
          onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <textarea
          value={review.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit Review</button>
      </form>
    </div>
  );
}

export default BookDetails;
