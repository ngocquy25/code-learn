import React from "react";
import '../../styles/styles.css';

function Problem({ question }){
    // const { question_id, description } = question;

    return(
        <div class="problem">
            {question.map(quest => (
                <div>
                    <h1 class="quest-title">Bài toán {quest.question_id}</h1>
                    <p class="content">{quest.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Problem;