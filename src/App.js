import React, { useState, useEffect } from 'react';

import SplitPane from 'react-split-pane';
import CodeEditor from './components/Editor/CodeEditor';
import Problem from './components/Problem/Problem';
import Testcase from './components/Testcase/Testcase';
import Loading from './components/Loading/Loading';
import Header from './components/Header/Header';
import Pagination from './components/Pagination/Pagination';
import Submit from './components/Submit/Submit';
import Alerting from './components/Alerting/Alerting';

import { Container, Tab, Tabs } from 'react-bootstrap';
import { TiLockClosed } from "react-icons/ti";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


function App() {
  const [questions, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultCode, setDefaultCode] = useState('');
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('');
  const [theme, setTheme] = useState('vs-dark');
  const [currentOutput, setCurrentOutput] = useState();
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  let currentQuestion = questions.slice(currentPage - 1, currentPage);

  const handleDefaultCode = async (l) => {
    if (l === "python") l = "py";
    else if (l === "javascript") l = "js";
    let c = l === '' ? '' : currentQuestion[0].init_code.find(x => x._language === l)._function;
    setDefaultCode(c);
    setCode(c);
  };

  const handlePagination = async (page) => {
    setCurrentPage(page);
    currentQuestion = questions.slice(page - 1, page);
    handleDefaultCode(lang);
  }

  const changeTheme = async () => {
    if (theme === 'light') setTheme('vs-dark');
    else setTheme('light');
  }

  const handleLanguage = async (e) => {
    let l = e.target.value;
    setLang(l);
    handleDefaultCode(l);
  }

  const handleSubmit = async () => {
    let l = lang;
    if (l === '') {
      setAlert(true);
      return;
    }
    
    if (l === "python") l = "py";
    else if (l === "javascript") l = "js";

    setCurrentOutput(currentQuestion[0].question_id);

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
            <Header
              question={currentQuestion}
              theme={theme}
              changeTheme={changeTheme}
              setCode={() => setCode(defaultCode)}
              handleLanguage={handleLanguage}/>
            <CodeEditor 
              question={currentQuestion} 
              theme={theme}
              lang={lang} 
              code={code} 
              defaultCode={defaultCode} 
              setCode={setCode}/>
            <Testcase 
              question={currentQuestion} 
              current={currentOutput} 
              output={output}/>
            <Submit handleSubmit={handleSubmit}/>
            {alert && <Alerting setAlert={setAlert}/>}
            {loading && <Loading/>}
          </div>
        </SplitPane>
    </Container>
  );
};

export default App;