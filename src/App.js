import React from 'react';
import SplitPane from 'react-split-pane';
import './App.css';
import './styles/styles.css'
import EditorSection from './components/layout/editor-section';
import ProblemSection from './components/layout/problem-section';
import ResultSection from './components/layout/result-section';
import TestcaseSection from './components/layout/testcase-section';
import {Container, Row} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <SplitPane
      split='vertical'
      defaultSize='45%'
      minSize={400}
      maxSize={900}
      >
        <ProblemSection/>
        <div class="left">
          <EditorSection/>
          <TestcaseSection/>
          <ResultSection/>
        </div>
      </SplitPane>
    </div>
  );
}

export default App;
