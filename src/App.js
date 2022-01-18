import React from 'react';
import SplitPane from 'react-split-pane';
import './App.css';
import './styles/styles.css'
import EditorSection from './components/layout/editor-section';
import ProblemSection from './components/layout/problem-section';
import ResultSection from './components/layout/result-section';
import TestcaseSection from './components/layout/testcase-section';

function App() {
  return (
    <div className="App">
      <SplitPane
      split='vertical'
      defaultSize='45%'
      minSize={200}
      maxSize={800}
      >
        <ProblemSection/>
        <SplitPane
        split='horizontal'
        defaultSize='55%'
        minSize={300}
        maxSize={500}
        >
          <EditorSection/>
          <SplitPane
          split='horizontal'
          defaultSize='70%'
          maxSize={400}
          primary='second'
          >
            <TestcaseSection/>
            <ResultSection/>
          </SplitPane>
        </SplitPane>
      </SplitPane>
    </div>
  );
}

export default App;
