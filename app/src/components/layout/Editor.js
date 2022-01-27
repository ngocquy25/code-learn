import React, { useState } from "react";
import AceEditor from "react-ace";

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";

import '../../styles/styles.css';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-xcode";

export default function Editor({ question }){

    let codedata = "";

    const [code, setCode] = useState('');
    const [currentId, setCurrentId] = useState(0);

    const onChange = value => {
        // console.log(value);
        codedata = value;
    }

    const [output1, setOutput1] = useState('');
    const [message1, setMessage1] = useState('');
    const [output2, setOutput2] = useState('');
    const [message2, setMessage2] = useState('');

    const handleClick = async () => {
        setCurrentId(question[0].question_id);
        setCode(codedata);
        // currentId = question[0].question_id;

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
            // setTestcase(data);
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
            <div className="editor">
                <AceEditor
                    placeholder="Enter your code here"
                    mode="python"
                    theme="xcode"
                    name="code-editer"
                    onChange={onChange}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    editorProps={{ $blockScrolling: false }}
                    style={{width: '100%', height: '100%'}}
                    value={code}
                    setOptions={{
                        // enableBasicAutocompletion: true,
                        // enableLiveAutocompletion: true,
                        // enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4,
                    }}
                />
            </div>
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
                                onClick={handleClick}>Run code</Button>
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
                                    <p className="content">
                                        {quest.testcase_input_1.split('\\n').join('\n')}
                                    </p>
                                    <p><b>Expected Output:</b></p>
                                    <p className="content">
                                        {quest.testcase_output_1.split('\\n').join('\n')}
                                    </p>
                                    <p><b>Actual Output:</b></p>
                                    <p className="content">
                                        { currentId === quest.question_id?
                                        output1.split('\\n').join('\n'): ''}
                                    </p>
                                    <p><b>Message:</b></p>
                                    <p className="content">
                                        { currentId === quest.question_id?
                                        message1.split('\\n').join('\n'): ''}
                                    </p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <p><b>Input:</b></p>
                                    <p className="content">
                                        {quest.testcase_input_2.split('\\n').join('\n')}
                                    </p>
                                    <p><b>Expected Output:</b></p>
                                    <p className="content">
                                        {quest.testcase_output_2.split('\\n').join('\n')}
                                    </p>
                                    <p><b>Actual Output:</b></p>
                                    <p className="content">
                                        { currentId === quest.question_id?
                                        output2.split('\\n').join('\n'): ''}
                                    </p>
                                    <p><b>Message:</b></p>
                                    <p className="content">
                                        { currentId === quest.question_id?
                                        message2.split('\\n').join('\n'): ''}
                                    </p>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                </div>
                ))}
            </div>
        </div>
    );
};
