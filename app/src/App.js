import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import CodeEditor from './components/layout/CodeEditor';
import Problem from './components/layout/Problem';
import PaginationBasic from './components/layout/Pagination';
import { Navbar, Container } from 'react-bootstrap';


function App() {
  const [questions, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Get current question
  const currentQuestion = questions.slice(currentPage - 1, currentPage);

  useEffect(() => {
    fetch("http://localhost:3001/getAllQuestion")
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
      <Container fluid>
        <SplitPane
          split='vertical'
          defaultSize='50%'
          minSize={500}
          maxSize={800}
          >
            <div className="flex-container">
              <Problem className="flex-item" question={currentQuestion}/>
              <Navbar bg="dark" variant="dark" className="shadow-up">
                <Container>
                  <Navbar.Brand href="/">Code learn by Quy Minh</Navbar.Brand>
                  <PaginationBasic 
                    question={questions}
                    current={currentPage} 
                    paginate={page => setCurrentPage(page)}
                  />
                </Container>
              </Navbar>
            </div>
            <CodeEditor question={currentQuestion} />
          </SplitPane>
      </Container>
    </div>
  );
};

export default App;