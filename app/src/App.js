import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './components/layout/Editor';
import Problem from './components/layout/Problem';
import PaginationBasic from './components/nav/Pagination';

import './App.css';
import './styles/styles.css';
import { Navbar, Container } from 'react-bootstrap';

function App() {
  const [questions, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Get current question
  const totalQuests = questions.length;
  const currentQuestion = questions.slice(currentPage - 1, currentPage);

  const handleNextPage = () => {
    if (currentPage + 1 > totalQuests) setCurrentPage(totalQuests);
    else setCurrentPage(currentPage + 1);
  }

  const handlePrevPage = () => {
    if (currentPage === 1) setCurrentPage(1);
    else setCurrentPage(currentPage - 1);
  }

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

  return (
    <div className="App">
      <Navbar variant="light" bg="light">
        <Container id="nav">
          <PaginationBasic 
            question={questions}
            paginate={page => setCurrentPage(page)}
            nextPage={handleNextPage}
            prevPage={handlePrevPage}
            firstPage={() => setCurrentPage(1)}
            lastPage={() => setCurrentPage(questions.length)}
          />
        </Container>
      </Navbar>
      <Container>
        <SplitPane
          split='vertical'
          defaultSize='50%'
          minSize={400}
          maxSize={900}
          >
            <Problem question={currentQuestion}/>
            <Editor question={currentQuestion} />
          </SplitPane>
      </Container>
    </div>
  );
};

export default App;
