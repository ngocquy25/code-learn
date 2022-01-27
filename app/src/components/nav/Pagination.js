import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Pagination } from "react-bootstrap";
import '../../styles/styles.css';


function PaginationBasic({ question, current, paginate, nextpage, prevpage}) {
    
    const totalQuests = question.length;

    const pageNumbers = [];
    for (let i = 1; i <= totalQuests; i++) pageNumbers.push(i);


    return (
        <Pagination size='sm'>
            <Pagination.First id="paginate" onClick={() => paginate(1)}/>
            <Pagination.Prev id="paginate" onClick={() => prevpage()}/>
            {pageNumbers.map(number => (
                <Pagination.Item 
                id={pageNumbers[current - 1] === number ? "paginate-active" : "paginate"}
                key={number}
                onClick={() => paginate(number)}>
                    {question[number-1].question_id}
                </Pagination.Item>
            ))}
            <Pagination.Next id="paginate" onClick={() => nextpage()}/>
            <Pagination.Last id="paginate" onClick={() => paginate(totalQuests)}/>
        </Pagination>
    );
};

export default PaginationBasic;