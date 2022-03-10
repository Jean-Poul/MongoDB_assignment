import React, { useState, useEffect } from 'react';
import { URLScrapeSequential, URLScrapeParallel } from './settings';
import { Table, Container, Row, Col, Button } from "react-bootstrap";

const AllScrape = () => {

    const [sequental, setSequental] = useState("");
    const fetchAllSequental = () => {
        fetch(URLScrapeSequential).then(res => res.json()).then(data1 => {
            setSequental(data1);
        })
    }

    const [parallel, setParallel] = useState("");
    const fetchAllParallel = () => {
        fetch(URLScrapeParallel).then(res => res.json()).then(data2 => {
            setParallel(data2);
        })
    }

    //loads joke first time
    useEffect(() => {
        fetchAllSequental();
        fetchAllParallel();
    }, []);

    return (

        <div>
            <Container>
                <Row>
                    <Col>
                        <h2>Fetching</h2>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Table bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th colSpan="2">{sequental.title}<br></br>
                                        <span className="text-muted">Time spent: {sequental.timeSpent}</span></th>
                                </tr>
                            </thead>
                            {sequental.tags && sequental.tags.map(element =>
                                <tbody key={element.url}>
                                    <tr><th>url:</th><td>{element.url}</td></tr>
                                    <tr><th>divCount:</th><td>{element.divCount}</td></tr>
                                    <tr><th>bodyCount:</th><td>{element.bodyCount}</td></tr>
                                    <tr><td colSpan="2">&nbsp;</td></tr>
                                </tbody>
                            )}
                        </Table>
                    </Col>
                    <Col>

                        <Table bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th colSpan="2">{parallel.title}<br></br>
                                        <span className="text-muted">Time spent: {parallel.timeSpent}</span></th>
                                </tr>
                            </thead>
                            {parallel.tags && parallel.tags.map(element =>
                                <tbody key={element.url}>
                                    <tr><th>url:</th><td>{element.url}</td></tr>
                                    <tr><th>divCount:</th><td>{element.divCount}</td></tr>
                                    <tr><th>bodyCount:</th><td>{element.bodyCount}</td></tr>
                                    <tr><td colSpan="2">&nbsp;</td></tr>
                                </tbody>
                            )}
                        </Table>

                    </Col>
                </Row>
                <Row>

                    <Col className="text-center">
                        <Button className="mt-4" variant="primary" onClick={() => { fetchAllSequental(); fetchAllParallel() }}>Fetch scrape</Button>{' '}
                    </Col>

                </Row>
            </Container>
        </div>


    );

}

export default AllScrape;