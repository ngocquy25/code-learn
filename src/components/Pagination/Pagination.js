import React from "react";

import { Navbar, Button } from "react-bootstrap";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import 'bootstrap/dist/css/bootstrap.css';
import './Pagination.css';


const Pagination = (props) => {
    
    const totalQuests = props.question.length;

    const pageNumbers = [];
    for (let i = 1; i <= totalQuests; i++) pageNumbers.push(i);

    const handleNextPage = () => {
        let next = (props.current === totalQuests)? props.current: props.current + 1;
        props.paginate(next);
    }
    
    const handlePrevPage = () => {
        let prev = (props.current > 1)? (props.current - 1) : 1;
        props.paginate(prev);
    }

    return (
        <Navbar bg="dark" variant="dark" className="footer shadow-up">
            <div className="pagination">
                <Button className="btn-chevron" onClick={handlePrevPage}>
                    <BsChevronLeft className="icon-chevron" />
                </Button>
                <div className="paginate-text">Previous</div>
                <div className="paginate-text">Next</div>
                <Button className="btn-chevron" onClick={handleNextPage}>
                    <BsChevronRight className="icon-chevron" />
                </Button>
            </div>
        </Navbar>
    );
};

export default Pagination;