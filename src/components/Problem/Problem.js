import React, { useState } from "react";

import { Form } from "react-bootstrap";

import './Problem.css';

const Problem = ({ question }) => {

    const [descLanguage, setDescLanguage] = useState('en');

    const handleDescLanguage = (e) => {
        setDescLanguage(e.target.value);
    }

    const descLangOptions = [
        { value: 'en', label: 'English'},
        { value: 'vi', label: 'Tiếng Việt' }     
    ];

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
                            {descLanguage === 'en'? en.question_title: vi.question_title}
                        </div>
                        <div className="level">
                            {descLanguage === "en"? <span>Difficulty:</span>: <span>Độ khó:</span>} 
                            {_level === "easy" && <span className="level-green"> {_level}</span>}
                            {_level === "medium" && <span className="level-yellow"> {_level}</span>}
                            {_level === "hard" && <span className="level-red"> {_level}</span>}
                            <Form.Select className="select-language-desc" onChange={handleDescLanguage}>
                                {descLangOptions.map(lang => (
                                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </div>
                    {descLanguage === 'en'? 
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