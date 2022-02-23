import React from "react";
import '../../styles/styles.css';

const Problem = ({ question }) => {
    console.log(question)
    return(
        <div className="problem">
            {question.map(({
                question_id,
                question_title,
                descriptions
            }) => (
                <div key={question_id}>
                    <h1 className="quest-title">Question {question_id} : {question_title}</h1>
                    <p className="quest-content" >{descriptions.split('\\n').join('\n')}</p>
                </div>
            ))}
        </div>
    );
};

export default Problem;