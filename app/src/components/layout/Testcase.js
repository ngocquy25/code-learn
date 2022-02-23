import React from "react";
import { Row, Col, Tab, Nav, Accordion } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/styles.css';


const Testcase = ({question, current, output }) => {

    const getText = text => {
        return text.split('\\n').join('\n');
    }

    return(
        <div className="testcase">
            {question.map(({
                question_id,
                testcase_input_1,
                testcase_output_1,
                testcase_input_2,
                testcase_output_2
            }) => (
                <div key={question_id}>
                    <Accordion flush >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="testcase-title">TEST CASE</Accordion.Header>
                            <Accordion.Body>
                                <Tab.Container defaultActiveKey="first">
                                    <Row>
                                        <Col sm={3}>
                                            <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first">Testcase 1</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second">Testcase 2</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col id="test-content">
                                            <Tab.Content>
                                                <Tab.Pane eventKey="first">
                                                    <Row>
                                                        <Col className="field" sm={5}>Input:</Col>
                                                        <Col className="content" sm={6}>
                                                            {getText(testcase_input_1)}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="field" sm={5}>Expected Output:</Col>
                                                        <Col className="content" sm={6}>
                                                            {getText(testcase_output_1)}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="field" sm={5}>Actual Output:</Col>
                                                        <Col className="content" sm={6}>
                                                            { current === question_id? getText(output[0].actualOutput) : '' }
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="field" sm={5}>Message:</Col>
                                                        <Col className="content" sm={6}>
                                                            { current === question_id? getText(output[0].Message) : '' }
                                                        </Col>
                                                    </Row>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <Row>
                                                        <Col className="field" sm={5}>Input:</Col>
                                                        <Col className="content" sm={7}>
                                                            {getText(testcase_input_2)}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="field" sm={5}>Expected Output:</Col>
                                                        <Col className="content" sm={7}>
                                                            {getText(testcase_output_2)}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="field" sm={5}>Actual Output:</Col>
                                                        <Col className="content" sm={7}>
                                                            { current === question_id? getText(output[1].actualOutput) : '' }
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="field" sm={5}>Message:</Col>
                                                        <Col className="content" sm={7}>
                                                            { current === question_id? getText(output[1].Message) : '' }
                                                        </Col>
                                                    </Row>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            ))}
        </div>
    )
};

export default Testcase;

