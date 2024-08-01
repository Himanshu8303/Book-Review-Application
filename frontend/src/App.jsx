

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
        
//       </div>
//     </Router>
//   );
// }

// export default App;



// App.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import Register from './components/Register';
import Login from './components/Login';
import DeleteBook from './components/DeleteBook';


function App() {
  const [loggedIn, setLoggedIn] = useState(true); // Example state

  const handleLogout = () => {
    // Clear authentication tokens or perform logout logic here
    setLoggedIn(false); // Update state
  };

  return (
    <Router>
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DeleteBook />} />
        </Routes>
    </Router>
  );
}

export default App;
