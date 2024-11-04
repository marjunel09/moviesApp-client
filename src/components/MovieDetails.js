// pages/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function MovieDetails() {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://movieapp-api-lms1.onrender.com/movies/getMovie/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Movie not found');
                }

                const data = await response.json();
                setMovie(data); // Assuming your API returns the movie object
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError(error.message); // Set error message
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]); // Fetch when ID changes

    if (loading) return <div className="text-center">Loading...</div>;

    if (error) return <div className="text-center">{error}</div>; // Display error message

    if (!movie) return <div className="text-center">Movie not found.</div>;

    return (
        <div className="container mt-4">
            <Card className="shadow-sm rounded movie-details-card">
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                        <strong>Director:</strong> {movie.director}
                    </Card.Text>
                    <Card.Text>
                        <strong>Year:</strong> {movie.year}
                    </Card.Text>
                    <Card.Text>
                        <strong>Description:</strong> {movie.description}
                    </Card.Text>
                    <Card.Text>
                        <strong>Genre:</strong> {movie.genre}
                    </Card.Text>
                    <Button variant="primary" onClick={() => window.history.back()}>Back to Movies</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default MovieDetails;
