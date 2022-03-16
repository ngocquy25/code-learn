import React from "react";

import './Problem.css';

const Problem = ({ question }) => {

    // const getText = text => {
    //     return text.split('\\n').join('\n');
    // }

    return(
        <div className="problem">
            {question.map(({
                question_id,
                question_title,
                problem,
                _level,
                input_format,
                output_format,
                explanation,
                constraint_input,
                constraint_output,
                constraint_time,
                sample_input,
                sample_output
            }) => (
                <div key={question_id}>
                    <div className="problem-header">
                        <div className="name">{question_title}</div>
                        <div className="level">
                            Difficulty: 
                            {_level === "easy" && <span className="level-green"> {_level}</span>}
                            {_level === "medium" && <span className="level-yellow"> {_level}</span>}
                            {_level === "hard" && <span className="level-red"> {_level}</span>}
                        </div>
                    </div>
                    <div className="problem-body">
                        <h6>Problem Statement</h6>
                        <div className="problem-statement">{problem}</div>
                        <h6>Input format:</h6>
                        <div className="field-content">{input_format}</div>
                        <h6>Output format:</h6>
                        <div className="field-content">{output_format}</div>
                        <h6>Explanation:</h6>
                        <div className="field-content">{explanation}</div>
                        <h6>Constraints:</h6>
                        <div className="field-content">
                            <div><b>Input:</b> {constraint_input}</div>
                            <br/>
                            <div><b>Output:</b> {constraint_output}</div>
                            <br/>
                            <div><b>Time Limit:</b> {constraint_time}</div>
                        </div>
                        <h6>Sample Input:</h6>
                        <div className="field-content">{sample_input}</div>  
                        <h6>Sample Output:</h6>
                        <div className="field-content">{sample_output}</div>           
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Problem;