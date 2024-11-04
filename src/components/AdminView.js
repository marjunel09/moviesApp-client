import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminMovies({ movies = [] }) { // Default to an empty array
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token'); // Check if user is logged in

    if (!isLoggedIn) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: 'calc(100vh - 200px)', textAlign: 'center' }}>
                <p>Please log in to manage movies.</p>
                <Button className="custom-button" onClick={() => navigate('/login')}>
                    Go to Login
                </Button>
            </div>
        ); // If not logged in, show a message and button to navigate to login
    }

    return (
        <div>
            <Button 
                className="mb-3 custom-button" 
                onClick={() => navigate('/movies/create')}
            >
                Create New Movie
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.director}</td>
                                <td>{movie.genre}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No movies available.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default AdminMovies;
