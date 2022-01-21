import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";
import '../../styles/styles.css';

export default function TestcaseSection(){
    // let [question, setQuestion] = useState([]);
  
    // useEffect(() => {
    //   fetch("http://localhost:3001/31")
    //     .then(res => res.json())
    //     .then(data => {
    //         setQuestion(data);
    //       },
    //       (error) => {
    //         setQuestion(error);
    //       }
    //     )
    // }, []);

    return(
        <div class="testcase-section">
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
            
            {/* {question.map(quest => {
                const {
                    testcase_input_1,
                    testcase_output_1,
                    testcase_input_2,
                    testcase_output_2
                } = quest;
                return ( */}
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
                            <Tab.Content>
                                <Tab.Pane eventKey="first" >
                                    <p>Input:</p>
                                    <p>5</p>
                                    <p>Expected Output:</p>
                                    <p>15</p>
                                    <p>Actual Output:</p>
                                    <p>Result:</p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <p>Input:</p>
                                    <p>7</p>
                                    <p>Expected Output:</p>
                                    <p>28</p>
                                    <p>Actual Output:</p>
                                    <p>Result:</p>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                {/* );
            })} */}
        </div>
    );
};