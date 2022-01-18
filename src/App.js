import React from 'react';
import SplitPane from 'react-split-pane';
import './App.css';
import './styles/styles.css'

function App() {
  return (
    <div className="App">
      <SplitPane
      split='vertical'
      defaultSize='45%'
      minSize={200}
      maxSize={800}
      >
        <div class="problem-section"></div>
        <SplitPane
        split='horizontal'
        defaultSize='55%'
        minSize={300}
        maxSize={500}
        >
          <div class="editor-section">

          </div>
          <SplitPane
          split='horizontal'
          defaultSize='70%'
          maxSize={400}
          primary='second'
          >
            <div class="testcase-section">

            </div>
            <div class="result-section">

            </div>
          </SplitPane>
        </SplitPane>
      </SplitPane>
    </div>
  );
}

export default App;
