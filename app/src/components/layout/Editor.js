import React, { useState } from "react";
import AceEditor from "react-ace";

import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Tab, Nav, Button, Navbar, Form, Accordion } from "react-bootstrap";

import '../../styles/styles.css';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-monokai";

export default function Editor({ question }){

    let codedata = "";

    const [code, setCode] = useState('');
    const [currentId, setCurrentId] = useState(0);
    const [lang, setLang] = useState('javascript');
    const [theme, setTheme] = useState('monokai');

    // const langOptions = [
    //     { value: 'javascript', label: 'Javascript (node v14.7.0)' },
    //     { value: 'csharp', label: 'C++ (g++ 9.2.1)' },
    //     { value: 'python', label: 'Python (3.9.1)' },
    //     { value: 'java', label: 'Java (17.0.1)'}
    //   ]

    const onChange = value => {
        codedata = value;
    }

    const [output1, setOutput1] = useState('');
    const [message1, setMessage1] = useState('');
    const [output2, setOutput2] = useState('');
    const [message2, setMessage2] = useState('');

    const handleClick = async () => {
        setCurrentId(question[0].question_id);
        setCode(codedata);

        let content = JSON.stringify({
            questionID: question[0].question_id,
            codeData: codedata
        })

        console.log("post:",content)

        try {
            const res = await fetch('https://codelearnapi.herokuapp.com/runcode', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: content
            });

            const data = await res.json();
            console.log("return:", data);
            setOutput1(data[0].actualOutput);
            setMessage1(data[0].Message);
            setOutput2(data[1].actualOutput);
            setMessage2(data[1].Message);
        }
        catch (e) {
            console.log(e);
        }
    };


    return(
        <div className="right">
            <Navbar bg="dark" variant="dark" className="right-nav">
                <Nav className="container-fluid">
                    <Nav.Item>
                        {/* change theme here */}
                        
                    </Nav.Item>
                    <Nav.Item className="ml-auto">
                        <Form.Select className="language" onChange={(value) => setLang(value)}>
                            <option value="javascript">Javascript (node v14.7.0)</option>
                            <option value="csharp">C++ (g++ 9.2.1)</option>
                            <option value="python">Python (3.9.1)</option>
                            <option value="java">Java (17.0.1)</option>
                        </Form.Select>
                    </Nav.Item>
                </Nav>
            </Navbar>

            <AceEditor
                placeholder="Enter your code here"
                mode={lang}
                theme="monokai"
                name="code-editer"
                onChange={onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                editorProps={{ $blockScrolling: false }}
                style={{width: '100%', height: '400px'}}
                value={code}
            />    
               
            <div className="testcase">
                {question.map(quest => (
                <div key={quest.question_id}>
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="testcase-title">TEST CASE</Accordion.Header>
                            <Accordion.Body>
                                <Tab.Container defaultActiveKey="first">
                                    <Row>
                                        <Col sm={3}>
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
                                        <Col id="test-content">
                                            <Tab.Content>
                                                <Tab.Pane eventKey="first">
                                                    <Row>
                                                        <Col className="field" sm={5}>Input:</Col>
                                                        <Col className="content" sm={6}>
                                                            {quest.testcase_input_1.split('\\n').join('\n')}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="field" sm={5}>Expected Output:</Col>
                                                        <Col className="content" sm={6}>
                                                            {quest.testcase_output_1.split('\\n').join('\n')}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="field" sm={5}>Actual Output:</Col>
                                                        <Col className="content" sm={6}>
                                                            { currentId === quest.question_id?
                                                            output1.split('\\n').join('\n'): ''}    
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="field" sm={5}>Message:</Col>
                                                        <Col className="content" sm={6}>
                                                            { currentId === quest.question_id?
                                                            message1.split('\\n').join('\n'): ''}
                                                        </Col>
                                                    </Row>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <Row>
                                                        <Col className="field" sm={5}>Input:</Col>
                                                        <Col className="content" sm={7}>
                                                            {quest.testcase_input_2.split('\\n').join('\n')}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="field" sm={5}>Expected Output:</Col>
                                                        <Col className="content" sm={7}>
                                                            {quest.testcase_output_2.split('\\n').join('\n')}
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="field" sm={5}>Actual Output:</Col>
                                                        <Col className="content" sm={7}>
                                                            { currentId === quest.question_id?
                                                            output2.split('\\n').join('\n'): ''}    
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="field" sm={5}>Message:</Col>
                                                        <Col className="content" sm={7}>
                                                            { currentId === quest.question_id?
                                                            message2.split('\\n').join('\n'): ''}
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
                    <div className="footer">
                        <Button id="btn-submit" variant="primary" type="submit"
                            onClick={handleClick}>Run code</Button>                   
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};
