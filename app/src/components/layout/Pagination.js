import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Pagination } from "react-bootstrap";
import '../../styles/styles.css';


const PaginationBasic = (props) => {
    
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
        <Pagination className="paginate">
            <Pagination.First id="paginate-item" onClick={() => props.paginate(1)}/>
            <Pagination.Prev id="paginate-item" onClick={handlePrevPage}/>
            <Pagination.Next id="paginate-item" onClick={handleNextPage}/>
            <Pagination.Last id="paginate-item" onClick={() => props.paginate(totalQuests)}/>
        </Pagination>
    );
};

export default PaginationBasic;