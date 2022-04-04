import React from "react";

import { Alert } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './Alerting.css';

const Alerting = ({ setAlert }) => {
    return(
        <div className="alerting-container">
            <Alert className="alerting" variant="danger" onClose={() => setAlert(false)} dismissible>
              <p>Please select programming language first!</p>
            </Alert>
        </div>
    );
}

export default Alerting;