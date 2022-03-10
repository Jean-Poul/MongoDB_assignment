import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { URLJokes } from "./settings";

const AllJokes = () => {

    const [joke, setJoke] = useState("");
    const fetchAllJokes = () => {
        fetch(URLJokes).then(res => res.json()).then(data => {
            setJoke(data);
        })
    }

    //loads joke first time
    useEffect(() => {
        fetchAllJokes();

    }, []);

    return (
        <div>

            <Container>
                <h2>Jokes</h2>
                <Row className="mt-4">
                    <Col>
                        <h4>Chuck Norris Joke:</h4>
                        <p><a href={joke.joke1Reference}>Source</a></p>
                        <p>{joke.joke1}</p>

                    </Col>
                    <Col>
                        <h4>Dad Joke:</h4>
                        <p><a href={joke.joke2Reference}>Source</a></p>
                        <p>{joke.joke2}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary mt-3" onClick={() => fetchAllJokes()}>Get new jokes</Button>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default AllJokes;