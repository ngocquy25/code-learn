import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import CodeEditor from './components/Editor/CodeEditor';
import Problem from './components/Problem/Problem';
import PaginationBasic from './components/Pagination/Pagination';
import { Navbar, Container, Tab, Tabs } from 'react-bootstrap';
import { TiLockClosed } from "react-icons/ti";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


function App() {
  const [questions, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState(true);

  const handlePagination = (page) => {
    setStatus(false);
    setCurrentPage(page);
  }

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
    <Container fluid>
      <SplitPane
        split='vertical'
        defaultSize='50%'
        minSize={500}
        maxSize={800}
        >
          <div className="flex-container left">
            <Tabs defaultActiveKey="1" className="shadow-down" fill justify>
              <Tab eventKey="1" title="Problem">
                <Problem className="flex-item" question={currentQuestion}/>
              </Tab>
              <Tab eventKey="2" title="Submissions">
              </Tab>
              <Tab eventKey="3" title={
                <div>
                  <TiLockClosed className="icon-lock" />
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
                paginate={handlePagination}
              />
            </Navbar>
          </div>
          <div className="right">
            <CodeEditor question={currentQuestion} />
          </div>
        </SplitPane>
    </Container>
  );
};

export default App;