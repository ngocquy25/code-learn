import React from 'react';
import SplitPane from 'react-split-pane';
import './App.css';
import './styles/styles.css'
import EditorSection from './components/layout/editor-section';
import ProblemSection from './components/layout/problem-section';
import TestcaseSection from './components/layout/testcase-section';

function App() {
  // let [question, setQuestion] = useState([]);
  
  // useEffect(() => {
  //   fetch("http://localhost:3001")
  //     .then(res => res.json())
  //     .then(data => {
  //         setQuestion(data.data);
  //       },
  //       (error) => {
  //         setQuestion(error);
  //       }
  //     )
  // }, []);

  return (
    <div className="App">
      <SplitPane
      split='vertical'
      defaultSize='45%'
      minSize={400}
      maxSize={900}
      >
        <ProblemSection/>       
        <div class="right">
          <EditorSection/>
          <TestcaseSection/>
        </div>
      </SplitPane>
    </div>
  );
}

export default App;
