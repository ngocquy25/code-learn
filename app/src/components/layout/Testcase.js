import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";
import '../../styles/styles.css';

function Testcase({ question, code }){
    
    const [output1, setOutput1] = useState();
    const [message1, setMessage1] = useState();

    const [output2, setOutput2] = useState();
    const [message2, setMessage2] = useState();

    const handleClick = (id) => {
        fetch('https://codelearnapi.herokuapp.com/runcode', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionID: id,
                codeData: code
            })
        })
        .then(res => res.json())
        .then(data => {
            setOutput1(data[0].actualOutput);
            setOutput2(data[1].actualOutput);
            setMessage1(data[0].Message);
            setMessage2(data[1].Message);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return(
        <div className="testcase">
            {question.map(quest => (
            <div key={quest.question_id}>
            <Container>
                <Row>
                    <Col>
                        <div className="test-title">TEST CASE</div>
                    </Col>
                    <Col style={{textAlign: 'right'}}>
                        <Button variant="primary" type="submit"
                        onClick={handleClick(quest.question_id)}>Run code</Button>
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
                            <Tab.Content>
                                <Tab.Pane eventKey="first" >
                                    <p><b>Input:</b></p>
                                    <p>{quest.testcase_input_1.split('\\n').join('\n')}</p>
                                    <p><b>Expected Output:</b></p>
                                    <p>{quest.testcase_output_1.split('\\n').join('\n')}</p>
                                    <p><b>Actual Output:</b></p>
                                    <p>{output1}</p>
                                    <p><b>Message:</b></p>
                                    <p>{message1}</p>
                                    <p><b>Result: {quest.testcase_output_1 === output1? 'Passed':'Failed'}</b></p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <p><b>Input:</b></p>
                                    <p>{quest.testcase_input_2.split('\\n').join('\n')}</p>
                                    <p><b>Expected Output:</b></p>
                                    <p>{quest.testcase_output_2.split('\\n').join('\n')}</p>
                                    <p><b>Actual Output:</b></p>
                                    <p>{output2}</p>
                                    <p><b>Message:</b></p>
                                    <p>{message2}</p>
                                    <p><b>Result: {quest.testcase_output_2 === output2? 'Passed':'Failed'}</b></p>
                                </Tab.Pane>
                            </Tab.Content>
                        
                    </Col>
                </Row>
            </Tab.Container>
            </div>
            ))}
        </div>
    );
};

export default Testcase;