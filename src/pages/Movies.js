import React, { useState, useEffect, useContext } from 'react';
import UserMovies from '../components/UserView';
import AdminMovies from '../components/AdminView';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Movies() {
    const { user } = useContext(UserContext);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const token = localStorage.getItem('token'); // Check for token
                if (!token) {
                    throw new Error('User not logged in'); // If no token, throw an error
                }

                const response = await fetch('https://movieapp-api-lms1.onrender.com/movies/getMovies', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setMovies(data.movies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.id) { // Check if user is valid
            fetchMovies();
        } else {
            setLoading(false); // Set loading to false if user is not available
        }
    }, [user]);

    if (loading) return <div className="text-center">Loading...</div>;

    const isLoggedIn = localStorage.getItem('token'); // Check if user is logged in

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Available Movies</h2>
            {isLoggedIn ? ( // Use isLoggedIn check
                user && user.isAdmin ? ( // Check if user is admin
                    <AdminMovies movies={movies} loading={loading} />
                ) : (
                    <UserMovies movies={movies} />
                )
            ) : (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: 'calc(100vh - 200px)', textAlign: 'center' }}>
                    <p>Please log in to view movies.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/login')}>
                        Go to Login
                    </button>
                </div>
            )}
        </div>
    );
}

export default Movies;
