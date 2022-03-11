import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import CodeEditor from './components/layout/CodeEditor';
import Problem from './components/layout/Problem';
import PaginationBasic from './components/layout/Pagination';
import { Navbar, Container, Tab, Tabs } from 'react-bootstrap';
import { TiLockClosed } from "react-icons/ti";

import 'bootstrap/dist/css/bootstrap.css';
import './styles/styles.css';


function App() {
  const [questions, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Get current question
  const currentQuestion = questions.slice(currentPage - 1, currentPage);

  useEffect(() => {
    fetch("http://runcode.cyberlearn.vn/getAllQuestion")
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
            <div className="flex-container left">
              <Tabs defaultActiveKey="1" className="shadow-down">
                <Tab eventKey="1" title="Problem">
                  <Problem className="flex-item" question={currentQuestion}/>
                </Tab>
                <Tab eventKey="2" title="Submissions">
                </Tab>
                <Tab eventKey="3" title={
                  <div>
                    <TiLockClosed className="icon-nav" />
                    <span>Solution</span>
                  </div>
                } disabled>
                </Tab>
                <Tab eventKey="4" title="Discuss">
                </Tab>
              </Tabs>
              <Navbar bg="dark" variant="dark" className="footer shadow-up">
                <PaginationBasic 
                  question={questions}
                  current={currentPage} 
                  paginate={page => setCurrentPage(page)}
                />
              </Navbar>
            </div>
            <CodeEditor question={currentQuestion} />
          </SplitPane>
      </Container>
    </div>
  );
};

export default App;