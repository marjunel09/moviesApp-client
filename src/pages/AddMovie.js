import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddMovie() {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({
        title: '',
        director: '',
        year: '',
        description: '',
        genre: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://movieapp-api-lms1.onrender.com/movies/addMovie', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieData),
            });

            if (!response.ok) {
                throw new Error('Failed to add movie');
            }

            // Navigate back to the admin movies page after successful submission
            navigate('/movies');
        } catch (error) {
            console.error('Error adding movie:', error);
            // Optionally, handle the error state (e.g., show an error message)
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Add New Movie</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={movieData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="director">
                    <Form.Label>Director</Form.Label>
                    <Form.Control
                        type="text"
                        name="director"
                        value={movieData.director}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type="number"
                        name="year"
                        value={movieData.year}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={movieData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="genre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                        type="text"
                        name="genre"
                        value={movieData.genre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Add Movie
                </Button>
            </Form>
        </div>
    );
}

export default AddMovie;
