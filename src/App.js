import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import CodeEditor from './components/Editor/CodeEditor';
import Problem from './components/Problem/Problem';
import Testcase from './components/Testcase/Testcase';
import Loading from './components/Loading/Loading';
import Language from './components/Language/Language';
import Pagination from './components/Pagination/Pagination';
import Submit from './components/Submit/Submit';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { TiLockClosed } from "react-icons/ti";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


function App() {
  const [questions, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [status, setStatus] = useState(true);
  const [defaultCode, setDefaultCode] = useState('');
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('none');
  const [theme, setTheme] = useState('vs-dark');
  const [currentOutput, setCurrentOutput] = useState();
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePagination = (page) => {
    // setStatus(false);
    setCurrentPage(page);
  }

  // Get current question
  const currentQuestion = questions.slice(currentPage - 1, currentPage);

  const handleLanguage = (e, init_code) => {
    let l = e.target.value
    if (l === "none") {
      setDefaultCode('');
      setCode('');
    } else {
      setLang(l);
      if (l === "python") l = "py";
      else if (l === "javascript") l = "js";
      let c = init_code.find(x => x._language === l)._function;
      setDefaultCode(c);
      setCode(c);
    }
  }

  const changeTheme = () => {
    if (theme === 'light') setTheme('vs-dark');
    else setTheme('light');
  }

  const handleSubmit = async () => {
    setCurrentOutput(currentQuestion[0].question_id);
    let l = lang;
    if (l === "python") l = "py";
    else if (l === "javascript") l = "js";

    let content = JSON.stringify({
      question: currentQuestion[0].question_id,
      language: l,
      code: code
    });

    console.log("post:", content);

    try {
        setLoading(true);
        const res = await fetch('http://runcode.cyberlearn.vn/submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: content
        });

        const data = await res.json();
        console.log("return:", data);
        setOutput(data);
        setLoading(false);
    }
    catch (e) {
        console.log(e);
    }
  };

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
            <Pagination
              question={questions}
              current={currentPage} 
              paginate={handlePagination}
            />
          </div>
          <div className="right">
            <Language 
              question={currentQuestion}
              theme={theme}
              changeTheme={changeTheme}
              defaultCode={defaultCode}
              setCode={setCode}
              handleLanguage={handleLanguage}
            />
            <CodeEditor 
              question={currentQuestion} 
              theme={theme}
              lang={lang} 
              code={code} 
              defaultCode={defaultCode} 
              setCode={setCode} 
            />
            <Testcase 
              question={currentQuestion} 
              current={currentOutput} 
              output={output}
            />
            <Submit handleSubmit={handleSubmit}/>
            {loading && <Loading/>}
          </div>
        </SplitPane>
    </Container>
  );
};

export default App;