import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";
import '../../styles/styles.css';

function Testcase({ question }){
    
    const [output, setOutput] = useState();
    const [message, setMessage] = useState();
    const [result, setResult] = useState(false);

    return(
        <div class="testcase">
            <Container>
                <Row>
                    <Col>
                        <div class="test-title">TEST CASE</div>
                    </Col>
                    <Col style={{textAlign: 'right'}}>
                        <Button variant="primary" type="submit">Run code</Button>
                    </Col>
                </Row>
            </Container>
            
            <Tab.Container id="testcase-tabs" defaultActiveKey="first">
                <Row>
                    <Col sm={4}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">
                                    Testcase 1
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">
                                    Testcase 2
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={8} id="test-content">
                        {question.map(quest => (
                            <Tab.Content>
                                <Tab.Pane eventKey="first" >
                                    <p><b>Input:</b></p>
                                    <p>{quest.testcase_input_1}</p>
                                    <p><b>Expected Output:</b></p>
                                    <p>{quest.testcase_output_1}</p>
                                    <p><b>Actual Output:</b></p>
                                    <p>{output}</p>
                                    <p><b>Message:</b></p>
                                    <p>{message}</p>
                                    <p><b>Result: {result? 'Passed':'Failed'}</b></p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <p><b>Input:</b></p>
                                    <p>{quest.testcase_input_2}</p>
                                    <p><b>Expected Output:</b></p>
                                    <p>{quest.testcase_output_2}</p>
                                    <p><b>Actual Output:</b></p>
                                    <p>{output}</p>
                                    <p><b>Message:</b></p>
                                    <p>{message}</p>
                                    <p><b>Result: {result? 'Passed':'Failed'}</b></p>
                                </Tab.Pane>
                            </Tab.Content>
                        ))}
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default Testcase;