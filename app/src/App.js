import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import CodeEditor from './components/layout/CodeEditor';
import Problem from './components/layout/Problem';
import PaginationBasic from './components/layout/Pagination';
import { Navbar, Container } from 'react-bootstrap';
// import { ThemeProvider } from 'styled-components';
// import { lightTheme, darkTheme } from "./styles/themes.js";


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

  
  // const [theme, setTheme] = useState("light");

  // const themeToggler = () => {
  //   theme === "light" ? setTheme("dark") : setTheme("light");
  //   console.log(theme);
  // };

  return (
    <div className="App">
      <Container fluid>
        {/* {
          <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}> */}
            <SplitPane
              split='vertical'
              defaultSize='50%'
              minSize={400}
              maxSize={800}
              >
                <div className="flex-container">
                  <Problem className="flex-item" question={currentQuestion}/>
                  {/* <button onClick={ () => themeToggler() }>OK</button> */}
                  <Navbar bg="dark" variant="dark" className="shadow-up">
                    <Container>
                      <Navbar.Brand href="/">Code learn by Quy Minh</Navbar.Brand>
                      <PaginationBasic 
                        question={questions}
                        current={currentPage}
                        paginate={page => setCurrentPage(page)}
                        nextpage={handleNextPage}
                        prevpage={handlePrevPage}
                      />
                    </Container>
                  </Navbar>
                </div>
                <CodeEditor question={currentQuestion} />
              </SplitPane>
          {/* </ThemeProvider>
        } */}
      </Container>
    </div>
  );
};

export default App;