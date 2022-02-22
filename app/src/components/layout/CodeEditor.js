import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Nav, Button, Navbar, Form, ToggleButton } from "react-bootstrap";
import { CgSun } from "react-icons/cg";
import { HiMoon, HiRefresh } from "react-icons/hi";

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/styles.css';
import Testcase from "./Testcase";

const CodeEditor = ({ question }) => {

    const langOptions = [
        { value: 'javascript', label: 'Javascript (node v14.7.0)' },
        { value: 'cpp', label: 'C++ (g++ 9.2.1)' },
        { value: 'python', label: 'Python (3.9.1)' },
        { value: 'java', label: 'Java (17.0.1)' }
    ]

    const [code, setCode] = useState('');
    const [lang, setLang] = useState(langOptions[0].value);
    const [theme, setTheme] = useState('vs-dark');
    const [currentOutput, setCurrentOutput] = useState();
    const [output, setOutput] = useState([]);

    const changeTheme = () => {
        if (theme === 'light') setTheme('vs-dark');
        else setTheme('light');
    }

    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const handleSubmit = async () => {
        setCurrentOutput(question[0].question_id);

        let content = JSON.stringify({
            questionID: question[0].question_id,
            codeData: editorRef.current.getValue()
        });

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
            setOutput(data);
        }
        catch (e) {
            console.log(e);
        }
    };

    return(
        <div className="right">
            <Navbar bg="dark" variant="dark" className="shadow-down" sticky="top">
                <Nav className="container-fluid">
                    <Nav.Item>
                        <ToggleButton className="icon-wrapper" onClick={changeTheme} >
                            {theme === "light" ? 
                            <CgSun className="icon"/> : <HiMoon className="icon"/>}
                        </ToggleButton>
                    </Nav.Item>
                    <Nav.Item className="me-auto">
                        <ToggleButton className="icon-wrapper" onClick={() => setCode('')} >
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
                className="monaco-ide"
                width="100%"
                theme={theme}
                defaultLanguage="javascript"
                language={lang}
                defaultValue="// Enter your code here"
                value={code}
                onChange={(value) => setCode(value)}
                onMount={handleEditorDidMount}
                options={{
                    fontSize: 14,
                    tabSize: 4,
                    minimap: {
                        enabled: false
                    }
                }}
            />
               
            <Testcase question={question} current={currentOutput} output={output}/>

            <Navbar bg="dark" variant="dark" className="footer shadow-up">
                <Button className="btn-submit" variant="primary" type="submit"
                    onClick={handleSubmit}>Run code</Button>  
            </Navbar>
        </div>
    );
};

export default CodeEditor;
