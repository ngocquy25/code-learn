import React from "react";
import '../../styles/styles.css';

function Problem({ question }){
    return(
        <div className="problem">
            {question.map(quest => (
                <div key={quest.question_id}>
                    <h1 className="quest-title">Bài toán {quest.question_id}</h1>
                    <p className="quest-content" >{quest.description.split('\\n').join('\n')}</p>
                </div>
            ))}
        </div>
    );
};

export default Problem;