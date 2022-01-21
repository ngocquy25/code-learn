import React, { useState, useEffect} from "react";
import '../../styles/styles.css';

export default function ProblemSection(){
    // let [question, setQuestion] = useState([]);
  
    // useEffect(() => {
    //   fetch("http://localhost:3001/31")
    //     .then(res => res.json())
    //     .then(data => {
    //         setQuestion(data);
    //       },
    //       (error) => {
    //         setQuestion(error);
    //       }
    //     )
    // }, []);

    return(
        <div class="problem-section">
        {/* {question.map(quest => {
            const {
                question_id,
                description,
            } = quest;
            return ( */}
                <div>
                    <h1 class="quest-title">Bài 31</h1>
                    <p class="content">Viết chương trình lấy số nguyên n từ người dùng và hiển thị tổng các số từ 1 đến n trên màn hình. Ví dụ, nếu n = 5, chương trình sẽ cho kết quả như sau: 1 + 2 + 3 + 4 + 5 = 15</p>
                </div>
            {/* );
        })} */}
        </div>
    );
};