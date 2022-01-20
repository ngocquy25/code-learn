import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../../styles/styles.css';

export default function TestcaseSection(){
    return(
        <div class="testcase-section">
            <Container>
                <Row>
                    <Col xs={1}>Testcase 1</Col>
                    <Col xs={4}>
                        <Row>5</Row>
                        <Row>Expected Result: 15</Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};