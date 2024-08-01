import React from 'react';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="text-center text-blue-900 p-6 bg-white bg-opacity-75 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-opacity-90">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Book Review App</h1>
        <p className="text-xl">Browse books, leave reviews, and more!</p>
      </div>
    </div>
  );
}

export default Home;
