import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Pagination } from "react-bootstrap";
import '../../styles/styles.css';


function PaginationBasic(props) {
    
    const pageNumbers = [];
    for (let i = 0; i < props.question.length; i++) pageNumbers.push(i+1);


    return (
        <Pagination size='sm'>
            <Pagination.First onClick={() => props.firstPage()}/>
            <Pagination.Prev onClick={() => props.prevPage()}/>
            {pageNumbers.map(number => (
                <Pagination.Item 
                key={number}
                onClick={() => props.paginate(number)}
                active={false}>
                    {props.question[number-1].question_id}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => props.nextPage()}/>
            <Pagination.Last onClick={() => props.lastPage()}/>
        </Pagination>
    );
};

export default PaginationBasic;