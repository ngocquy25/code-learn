import React, { useState, useEffect } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './components/layout/Editor';
import Problem from './components/layout/Problem';
import PaginationBasic from './components/nav/Pagination';
import { Navbar, Container } from 'react-bootstrap';
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from './theme/GlobalStyles';
import {useTheme} from './theme/useTheme';

//import './App.css';
//import './styles/styles.css';

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

  // Get the selected theme, font list, etc.
  const {theme, themeLoaded, setMode} = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  const themeSwitcher = () => {
    console.log(selectedTheme);
    setMode(selectedTheme);
  };

  return (
    <div className="App">
      <div className="container">
        {
          themeLoaded && <ThemeProvider theme={ selectedTheme }>
            <GlobalStyles/>
            <SplitPane
              split='vertical'
              defaultSize='50%'
              minSize={400}
              maxSize={900}
              >
                <div className="flex-container">
                  <Problem className="flex-item" question={currentQuestion}/>
                  <button onClick={ () => themeSwitcher() }>OK</button>
                  <Navbar bg="dark" className="flex-item shadow">
                    <Container>
                    <Navbar.Brand style={{color: 'white'}}>Code learn by WERP</Navbar.Brand>
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
                <Editor question={currentQuestion} />
              </SplitPane>
          </ThemeProvider>
        }
      </div>
    </div>
  );
};

export default App;
