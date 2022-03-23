import React from "react";

import { Navbar, Button } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.css';
import './Submit.css';

const Submit = ({ handleSubmit }) => {
    return(
        <Navbar bg="dark" variant="dark" className="footer shadow-up">
            <Button className="btn-submit" type="submit"
                onClick={handleSubmit}>Submit</Button>  
        </Navbar>
    );
};

export default Submit;