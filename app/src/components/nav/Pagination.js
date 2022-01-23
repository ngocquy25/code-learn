import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Pagination } from "react-bootstrap";
import '../../styles/styles.css';


function PaginationBasic({ totalQuestion, paginate, nextPage, prevPage, firstPage, lastPage }) {
    
    const pageNumbers = [];
    for (let i = 1; i <= totalQuestion; i++) pageNumbers.push(i);


    return (
        <div className="paginate">
            <Pagination size='sm' className="d-flex justify-content-center">
                <Pagination.First onClick={() => firstPage()}/>
                <Pagination.Prev onClick={() => prevPage()}/>
                {pageNumbers.map(number => (
                    <Pagination.Item 
                    key={number}
                    onClick={() => paginate(number)}
                    >
                        {number}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => nextPage()}/>
                <Pagination.Last onClick={() => lastPage()}/>
            </Pagination>
        </div>
    );
};

export default PaginationBasic;