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
        <Pagination size='sm' className="page">
            <Pagination.First id="paginate" onClick={() => props.paginate(1)}/>
            <Pagination.Prev id="paginate" onClick={handlePrevPage}/>
            {/* {pageNumbers.map(number => (
                <Pagination.Item 
                id={pageNumbers[current - 1] === number ? "paginate-active" : "paginate"}
                key={number}
                onClick={() => props.paginate(number)}>
                    {question[number-1].question_id}
                </Pagination.Item>
            ))} */}
            <Pagination.Next id="paginate" onClick={handleNextPage}/>
            <Pagination.Last id="paginate" onClick={() => props.paginate(totalQuests)}/>
        </Pagination>
    );
};

export default PaginationBasic;