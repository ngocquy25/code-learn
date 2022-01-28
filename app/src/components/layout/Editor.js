import React, { useState } from "react";
import AceEditor from "react-ace";
import SplitPane from 'react-split-pane';

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";

import '../../styles/styles.css';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-terminal";

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
            <SplitPane
                split='horizontal'
                defaultSize='50%'
                minSize={400}
                maxSize={window.innerHeight-70}
            >
                <AceEditor
                    placeholder="Enter your code here"
                    mode="python"
                    theme="terminal"
                    name="code-editer"
                    onChange={onChange}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    editorProps={{ $blockScrolling: false }}
                    style={{width: '100%', height: '100%'}}
                    value={code}
                />
                
                <div className="testcase">
                    {question.map(quest => (
                    <div key={quest.question_id}>
                    <Container id="testcase-title">
                        <div className="testname">TEST CASE</div>
                        <Button id="btn-run" variant="primary" type="submit"
                            onClick={handleClick}>Run code</Button>
                    </Container>
                    
                    <Tab.Container defaultActiveKey="first">
                        <Row style={{paddingTop: '20px'}}>
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
                    </div>
                    ))}
                </div>
            </SplitPane>
        </div>
    );
};
