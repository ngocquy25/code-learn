import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
// import { ResponsiveMonacoEditor } from "responsive-react-monaco-editor";
import { Nav, Button, Navbar, Form, ToggleButton, Spinner } from "react-bootstrap";
import { HiMoon, HiRefresh } from "react-icons/hi";
import { BsSunFill } from "react-icons/bs";

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/styles.css';
import Testcase from "./Testcase";

const CodeEditor = ({ question }) => {

    const langOptions = [
        { value: 'none', label: 'Select language'},
        { value: 'javascript', label: 'Javascript (node v14.7.0)' },
        { value: 'cpp', label: 'C++ (g++ 9.2.1)' },
        { value: 'python', label: 'Python (3.9.1)' },
        { value: 'java', label: 'Java (17.0.1)' },
    ];

    const [defaultCode, setDefaultCode] = useState('');
    const [code, setCode] = useState('');
    const [lang, setLang] = useState('none');
    const [theme, setTheme] = useState('vs-dark');
    const [currentOutput, setCurrentOutput] = useState();
    const [output, setOutput] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleLanguage = (e, init_code) => {
        let l = e.target.value
        if (l === "none") {
            setDefaultCode('');
            setCode('');
        } else {
            setLang(l);
            if (l === "python") l = "py";
            else if (l === "javascript") l = "js";
            let c = init_code.find(x => x._language === l)._function;
            setDefaultCode(c);
            setCode(c);
        }
    }

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
        let l = lang;
        if (l === "python") l = "py";
        else if (l === "javascript") l = "js";

        let content = JSON.stringify({
            question: question[0].question_id,
            language: l,
            code: code
        });

        console.log("post:", content);

        try {
            setLoading(true);
            const res = await fetch('http://runcode.cyberlearn.vn/submit', {
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
            setLoading(false);
        }
        catch (e) {
            console.log(e);
        }
    };

    // useEffect(() => {
    //     handleSubmit()
    // }, []);

    return(
        <>
            <div className="right">
            {question.map(({
                question_id,
                init_code
            }) => (
            <div key={question_id}>
            <Navbar bg="dark" variant="dark" className="shadow-down">
                <Nav className="container-fluid">
                    <Nav.Item className="first-item">
                        <ToggleButton className="icon-wrapper" onClick={changeTheme} >
                            {theme === "light" ? 
                            <HiMoon className="icon-nav"/> : <BsSunFill className="icon-nav"/>}
                        </ToggleButton>
                    </Nav.Item>
                    <Nav.Item className="me-auto">
                        <ToggleButton className="icon-wrapper" onClick={() => setCode(defaultCode)} >
                            <HiRefresh className="icon-nav"/>
                        </ToggleButton>
                    </Nav.Item>
                    <Nav.Item className="ml-auto">
                        <Form.Select className="select-language" onChange={e => handleLanguage(e, init_code)}>
                            {/* <option>Select language</option> */}
                            {langOptions.map(lang => (
                            <option key={lang.value} value={lang.value}>{lang.label}</option>
                            ))}
                        </Form.Select>
                    </Nav.Item>
                </Nav>
            </Navbar>
            </div> 
            ))}
            
            <Editor
                width="99%"
                height="100%"
                theme={theme}
                // defaultLanguage="javascript"
                language={lang}
                // defaultValue={defaultCode}
                value={code}
                onChange={(value) => setCode(value)}
                onMount={handleEditorDidMount}
                options={{
                    fontSize: 14,
                    tabSize: 4,
                    minimap: {
                        enabled: false
                    },
                }}
                
            />
               
            <Testcase question={question} current={currentOutput} output={output}/>

            <Navbar bg="dark" variant="dark" className="footer shadow-up">
                <Button className="btn-submit" variant="primary" type="submit"
                    onClick={handleSubmit}>Submit</Button>  
            </Navbar>
            </div>
            {loading &&
            <div className="loading-container">
                <Spinner animation="border" size="sm" variant="light"/>
                <div className="loading">Loading...</div>
            </div>}
        </>
    );
};

export default CodeEditor;
