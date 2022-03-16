import React from "react";
import { Row, Col, Tab, Nav, Accordion } from "react-bootstrap";
import { BsCheckLg, BsXLg } from "react-icons/bs";

import 'bootstrap/dist/css/bootstrap.css';
import './Testcase.css';


const Testcase = ({question, current, output}) => {

    // const getText = text => {
    //     return text.split('\\n').join('\n');
    // }

    return(
        <div className="testcase">
            {question.map(({
                question_id,
                test_case
            }) => (
            <Accordion key={question_id} defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="testcase-header">TEST CASE</Accordion.Header>
                    <Accordion.Body>
                        <Tab.Container defaultActiveKey={1} >
                            { current !== question_id?
                            <Row>
                                <Col sm={3} id="testcase-title">
                                    <Nav variant="pills" className="flex-column">
                                    {test_case.map(({
                                        testcase_id
                                    }) => (
                                        <Nav.Item key={testcase_id}>
                                            <Nav.Link eventKey={testcase_id}>Test Case {testcase_id}</Nav.Link>
                                        </Nav.Item>                                     
                                    ))}                                        
                                    </Nav> 
                                </Col>
                                <Col id="testcase-content">
                                    <Tab.Content>
                                    {test_case.map(({
                                        testcase_id,
                                        _input,
                                        _output
                                    }) => (
                                        <Tab.Pane eventKey={testcase_id} key={testcase_id}>
                                            <Row>
                                                <Col className="field" sm={4}>Input:</Col>
                                                <Col className="value" sm={6}>{_input}</Col>
                                            </Row>
                                            <Row>
                                                <Col className="field" sm={4}>Expected Output:</Col>
                                                <Col className="value" sm={6}>{_output}</Col>
                                            </Row>
                                            <Row>
                                                <Col className="field" sm={4}>Actual Output:</Col>
                                                <Col className="value" sm={6}></Col>
                                            </Row>
                                            <Row>
                                                <Col className="field" sm={4}>Message:</Col>
                                                <Col className="value" sm={6}></Col>
                                            </Row>                                                                                               
                                        </Tab.Pane>
                                    ))}
                                    </Tab.Content>
                                </Col>
                            </Row>:
                            <Row>
                                <Col sm={3} id="testcase-title">
                                    <Nav variant="pills" className="flex-column">
                                    {output.map(({
                                        id, message
                                    }) => (
                                        <Nav.Item key={id}>
                                            <Nav.Link eventKey={id}>
                                                <Row>
                                                    <Col>Test Case {id}</Col>
                                                    <Col sm={3}>
                                                        { message === "Right answer"? 
                                                            <BsCheckLg className="icon-check"/> 
                                                            : <BsXLg className="icon-x"/>}
                                                    </Col>
                                                </Row>
                                            </Nav.Link>
                                        </Nav.Item>                                     
                                    ))}
                                    </Nav>
                                </Col>
                                <Col id="testcase-content">
                                    <Tab.Content>
                                    {output.map(({
                                        id,
                                        input,
                                        expectedOutput,
                                        actualOutput,
                                        message
                                    }) => (
                                        <Tab.Pane eventKey={id} key={id}>
                                            <Row>
                                                <Col className="field" sm={4}>Input:</Col>
                                                <Col className="value" sm={6}>{input}</Col>
                                            </Row>
                                            <Row>
                                                <Col className="field" sm={4}>Expected Output:</Col>
                                                <Col className="value" sm={6}>{expectedOutput}</Col>
                                            </Row>
                                            <Row>
                                                <Col className="field" sm={4}>Actual Output:</Col>
                                                <Col className="value" sm={6}>{actualOutput}</Col>
                                            </Row>
                                            <Row>
                                                <Col className="field" sm={4}>Message:</Col>
                                                <Col className="value" sm={6}>{message}</Col>
                                            </Row>                                                        
                                        </Tab.Pane>
                                    ))}
                                    </Tab.Content>
                                </Col>
                            </Row>                            
                            }
                        </Tab.Container>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            ))}
        </div>
    )
};

export default Testcase;

