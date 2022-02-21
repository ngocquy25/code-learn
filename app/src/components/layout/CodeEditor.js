import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Row, Col, Tab, Nav, Button, Navbar, Form, Accordion, ToggleButton } from "react-bootstrap";
import { CgSun } from "react-icons/cg";
import { HiMoon, HiRefresh } from "react-icons/hi";
import { GrPowerReset } from "react-icons/gr";

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/styles.css';

export default function CodeEditor({ question }){

    const langOptions = [
        { value: 'javascript', label: 'Javascript (node v14.7.0)' },
        { value: 'cpp', label: 'C++ (g++ 9.2.1)' },
        { value: 'python', label: 'Python (3.9.1)' },
        { value: 'java', label: 'Java (17.0.1)' }
    ]

    const [code, setCode] = useState('');
    const [currentId, setCurrentId] = useState(0);
    const [lang, setLang] = useState(langOptions[0].value);
    const [theme, setTheme] = useState('vs-dark');

    const changeTheme = () => {
        if (theme === 'light') setTheme('vs-dark');
        else setTheme('light');
    }

    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const [output1, setOutput1] = useState('');
    const [message1, setMessage1] = useState('');
    const [output2, setOutput2] = useState('');
    const [message2, setMessage2] = useState('');

    const handleSubmit = async () => {
        setCurrentId(question[0].question_id);

        let content = JSON.stringify({
            questionID: question[0].question_id,
            codeData: code
        })

        console.log("post:", content);

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
                        <ToggleButton onClick={changeTheme} className="icon-wrapper">
                            {theme === "light" ? <CgSun className="icon"/> : <HiMoon className="icon"/>}
                        </ToggleButton>
                    </Nav.Item>
                    <Nav.Item className="me-auto">
                        <ToggleButton onClick={() => setCode('')} className="icon-wrapper">
                            <HiRefresh className="icon" color="white"/>
                        </ToggleButton>
                    </Nav.Item>
                    <Nav.Item className="ml-auto">
                        <Form.Select className="language" onChange={e => setLang(e.target.value)}>
                            {langOptions.map(lang => (
                                <option key={lang.value} value={lang.value}>{lang.label}</option>
                            ))}
                        </Form.Select>
                    </Nav.Item>
                </Nav>
            </Navbar>

            <Editor
                height="50%"
                width="99%"
                className="monaco-editor"
                theme={theme}
                defaultLanguage="javascript"
                language={lang}
                defaultValue="// Enter your code here"
                value={code}
                onChange={(value) => setCode(value)}
                onMount={handleEditorDidMount}
            />
               
            <div className="testcase">
                {question.map(quest => (
                <div key={quest.question_id}>
                    <Accordion flush>
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
                            onClick={handleSubmit}>Run code</Button>                   
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};
