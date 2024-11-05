import "./App.css";
import { useState, useEffect } from "react";
import { UserProvider } from "./context/UserContext";
import { Container } from "react-bootstrap";
import AppNavBar from "./components/AppNavBar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Error from "./pages/Error";
import Movies from './pages/Movies';
import MovieDetails from './components/MovieDetails';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminMovies from "./components/AdminView";
import AddMovie from './pages/AddMovie';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: false // Default to false
  });

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('https://movieapp-api-lms1.onrender.com/movies/getMovies', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setMovies(data.movies);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  function unsetUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin'); 
    setUser({ id: null, isAdmin: false });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === 'true'; 

    if (token) {
      setUser({ id: "authenticated", isAdmin: isAdmin }); 
    } else {
      setUser({ id: null, isAdmin: false });
    }
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavBar />
        <Container>
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/create" element={<AddMovie />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
