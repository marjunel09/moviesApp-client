import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function UserMovies({ movies }) {
    const navigate = useNavigate(); 

    return (
        <Row>
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <Col md={4} key={movie._id} className="mb-3">
                        <Card className="shadow-sm rounded movie-card">
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>
                                    <strong>Director:</strong> {movie.director}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Genre:</strong> {movie.genre}
                                </Card.Text>
                                <Button 
                                    className="custom-button" 
                                    onClick={() => navigate(`/movies/${movie._id}`)}
                                >
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            ) : (
                <Col className="text-center">
                    <p>No movies available.</p>
                </Col>
            )}
        </Row>
    );
}

export default UserMovies;
