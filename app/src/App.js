import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './components/layout/Editor';
import Problem from './components/layout/Problem';
import Testcase from './components/layout/Testcase';
import PaginationBasic from './components/nav/Pagination';

import './App.css';
import './styles/styles.css';

function App() {
  const [questions, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [code, setCode] = useState('');

  useEffect(() => {
    fetch("https://codelearnapi.herokuapp.com")
      .then(res => res.json())
      .then(data => {
          setQuestion(data);
        },
        (error) => {
          setQuestion(error);
        }
      )
  }, []);

  const changeCode = (value) => {
    console.log(value);
    setCode(value);
  }

  // Get current question
  const totalQuests = questions.length;
  const currentQuestion = questions.slice(currentPage - 1, currentPage);

  return (
    <div className="App">
      <PaginationBasic 
        totalQuestion={totalQuests} 
        paginate={page => setCurrentPage(page)}
        nextPage={() => {
          if (currentPage + 1 > totalQuests) {
            setCurrentPage(totalQuests)
          } else {
            setCurrentPage(currentPage + 1)
          }
        }}
        prevPage={() => {
          if (currentPage === 1) {
            setCurrentPage(1)
          } else {
            setCurrentPage(currentPage - 1)
          }
        }}
        firstPage={() => setCurrentPage(1)}
        lastPage={() => setCurrentPage(questions.length)}
        />
      <SplitPane
      split='vertical'
      defaultSize='45%'
      minSize={400}
      maxSize={900}
      >
        <Problem question={currentQuestion}/>
        <div className="right">
          <Editor code={code} onChange={changeCode}/>
          <Testcase question={currentQuestion} code={code}/>
        </div>
      </SplitPane>
    </div>
  );
};

export default App;
