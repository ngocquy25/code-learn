import React from "react";

import { Nav, Navbar, Form, ToggleButton } from "react-bootstrap";
import { HiMoon, HiRefresh } from "react-icons/hi";
import { BsSunFill } from "react-icons/bs";

import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';


const Header = (props) => {
    const langOptions = [
        { value: '', label: 'Select language'},
        { value: 'javascript', label: 'Javascript (node v14.7.0)' },
        { value: 'cpp', label: 'C++ (g++ 9.2.1)' },
        { value: 'python', label: 'Python (3.9.1)' },
        { value: 'java', label: 'Java (17.0.1)' },
    ];

    return(
        <>
            {/* {props.question.map(({
                question_id,
                init_code
            }) => (
            <div key={question_id}> */}
            <Navbar bg="dark" variant="dark" className="shadow-down">
                <Nav className="container-fluid">
                    <Nav.Item className="first-section">
                        <ToggleButton className="btn-toggle" onClick={props.changeTheme} >
                            {props.theme === "light" ? 
                            <HiMoon className="icon"/> : <BsSunFill className="icon"/>}
                        </ToggleButton>
                    </Nav.Item>
                    <Nav.Item className="me-auto">
                        <ToggleButton className="btn-toggle" onClick={props.setCode} >
                            <HiRefresh className="icon"/>
                        </ToggleButton>
                    </Nav.Item>
                    <Nav.Item className="ml-auto">
                        <Form.Select className="select-language" onChange={props.handleLanguage}>
                            {langOptions.map(lang => (
                                <option key={lang.value} value={lang.value}>{lang.label}</option>
                            ))}
                        </Form.Select>
                    </Nav.Item>
                </Nav>
            </Navbar>
            {/* </div> 
            ))} */}
        </>
    );
};

export default Header;

