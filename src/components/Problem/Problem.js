import React, { useState } from "react";

import ReactFlagsSelect from 'react-flags-select';

import './Problem.css';

const Problem = ({ question }) => {

    const [selected, setSelected] = useState('US');

    const handleSelect = (value) => {
        setSelected(value);
    }

    return(
        <div className="problem">
            {question.map(({ 
                question_id, 
                _level, 
                input_format,
                output_format,
                sample_input,
                sample_output,
                en, vi }) => (
                <div key={question_id}>
                    <div className="problem-header">
                        <div className="name">
                            {selected === 'US'? en.question_title: vi.question_title}
                        </div>
                        <div className="level">
                            {selected === 'US'? <span>Difficulty:</span>: <span>Độ khó:</span>} 
                            {_level === "easy" && <span className="level-green"> {_level}</span>}
                            {_level === "medium" && <span className="level-yellow"> {_level}</span>}
                            {_level === "hard" && <span className="level-red"> {_level}</span>}
                            <ReactFlagsSelect
                                className="select-language-desc"
                                selected={selected}
                                onSelect={handleSelect}
                                countries={["US", "VN"]}
                                customLabels={{"US": "English","VN": "Tiếng Việt"}}
                            />
                        </div>
                    </div>
                    {selected === 'US'? 
                    <div className="problem-body">
                        <h6>Problem Statement</h6>                
                        <div className="problem-statement">{en.problem}</div>
                        <h6>Input format:</h6>
                        <div className="field-content">{input_format}</div>
                        <h6>Output format:</h6>
                        <div className="field-content">{output_format}</div>
                        <h6>Explanation:</h6>
                        <div className="field-content">{en.explanation}</div>
                        <h6>Constraints:</h6>
                        <div className="field-content">
                            <div><b>Input:</b> {en.constraint_input}</div>
                            <br/>
                            <div><b>Output:</b> {en.constraint_output}</div>
                            <br/>
                            <div><b>Time Limit:</b> {en.constraint_time}</div>
                        </div>
                        <h6>Sample Input:</h6>
                        <div className="field-content">{sample_input}</div>  
                        <h6>Sample Output:</h6>
                        <div className="field-content">{sample_output}</div>           
                    </div>
                    :
                    <div className="problem-body">
                        <h6>Đề bài</h6>
                        <div className="problem-statement">{vi.problem}</div>
                        <h6>Định dạng đầu vào:</h6>
                        <div className="field-content">{input_format}</div>
                        <h6>Định dạng đầu ra:</h6>
                        <div className="field-content">{output_format}</div>
                        <h6>Giải thích:</h6>
                        <div className="field-content">{vi.explanation}</div>
                        <h6>Các ràng buộc:</h6>
                        <div className="field-content">
                            <div><b>Đầu vào:</b> {vi.constraint_input}</div>
                            <br/>
                            <div><b>Đầu ra:</b> {vi.constraint_output}</div>
                            <br/>
                            <div><b>Giới hạn thời gian:</b> {vi.constraint_time}</div>
                        </div>
                        <h6>Đầu vào mẫu:</h6>
                        <div className="field-content">{sample_input}</div>  
                        <h6>Đầu ra mẫu:</h6>
                        <div className="field-content">{sample_output}</div>           
                    </div>
                    }
                </div>
            ))}
        </div>
    );
};

export default Problem;