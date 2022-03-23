import React, { useState } from "react";

import { Nav, Navbar, Form, ToggleButton } from "react-bootstrap";
import { HiMoon, HiRefresh } from "react-icons/hi";
import { BsSunFill } from "react-icons/bs";

import 'bootstrap/dist/css/bootstrap.css';
import './Language.css';


const Language = ({ question, theme, changeTheme, defaultCode, setCode, handleLanguage }) => {
    const langOptions = [
        { value: 'none', label: 'Select language'},
        { value: 'javascript', label: 'Javascript (node v14.7.0)' },
        { value: 'cpp', label: 'C++ (g++ 9.2.1)' },
        { value: 'python', label: 'Python (3.9.1)' },
        { value: 'java', label: 'Java (17.0.1)' },
    ];

    const descLangOptions = [
        { value: 'en', label: 'English'},
        { value: 'vi', label: 'Tiếng Việt' },
    ];

    const [descLanguage, setDescLanguage] = useState('en');
    const changeDescLanguage = () => {
        if (descLanguage === 'en') setDescLanguage('vi');
        else setDescLanguage('en');
    }

    return(
        <>
            {question.map(({
                question_id,
                init_code
            }) => (
            <div key={question_id}>
            <Navbar bg="dark" variant="dark" className="shadow-down">
                <Nav className="container-fluid">
                    <Nav.Item className="first-section">
                        <ToggleButton className="btn-toggle" onClick={changeTheme} >
                            {theme === "light" ? 
                            <HiMoon className="icon"/> : <BsSunFill className="icon"/>}
                        </ToggleButton>
                    </Nav.Item>
                    <Nav.Item >
                        <ToggleButton className="btn-toggle" onClick={() => setCode(defaultCode)} >
                            <HiRefresh className="icon"/>
                        </ToggleButton>
                    </Nav.Item>
                    <Nav.Item className="me-auto">
                        {/* <Form.Select className="select-language-desc" >
                            {descLangOptions.map(lang => (
                            <option key={lang.value} value={lang.value}>{lang.label}</option>
                            ))}
                        </Form.Select> */}
                        <ToggleButton className="btn-toggle" onClick={changeDescLanguage}>
                            {descLanguage === "vi"?
                                <span>ENG</span>:<span>VIE</span>
                            }
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
        </>
    );
};

export default Language;

