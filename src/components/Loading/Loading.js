import React from "react";

import { Spinner } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.css';
import './Loading.css';

const Loading = () => {
    return(
        <div className="loading-container">
            <Spinner animation="border" size="sm" variant="light"/>
            <div className="content">Loading...</div>
        </div>
    );
};

export default Loading;