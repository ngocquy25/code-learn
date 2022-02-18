import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './components/layout/Editor';
import Problem from './components/layout/Problem';
import PaginationBasic from './components/nav/Pagination';
import { Navbar, Container } from 'react-bootstrap';

import './App.css';
import './styles/styles.css';

function App() {
  const [questions, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Get current question
  const totalQuests = questions.length;
  const currentQuestion = questions.slice(currentPage - 1, currentPage);

  const handleNextPage = () => {
    let next = (currentPage === totalQuests)? currentPage: currentPage + 1;
    setCurrentPage(next);
  }

  const handlePrevPage = () => {
    let prev = (currentPage > 0)? (currentPage - 1) : 0;
    setCurrentPage(prev);
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
      {/* <Navbar bg="dark" className="shadow">
        <Container>
        <Navbar.Brand style={{color: 'white'}}>Code learn</Navbar.Brand>
        <PaginationBasic 
          question={questions}
          current={currentPage}
          paginate={page => setCurrentPage(page)}
          nextpage={handleNextPage}
          prevpage={handlePrevPage}
        />
        </Container>
      </Navbar> */}
      <div className="container">
        <SplitPane
          split='vertical'
          defaultSize='50%'
          minSize={400}
          maxSize={900}
          >
            <Problem question={currentQuestion}/>
            <Editor question={currentQuestion} />
          </SplitPane>
      </div>
    </div>
  );
};

export default App;
