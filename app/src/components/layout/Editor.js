import React from "react";
import AceEditor from "react-ace";
import '../../styles/styles.css';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-xcode";

export default function Editor(){
    const changeValue = (newValue) => {
        console.log("change", newValue)
    }

    return(
        <div class="editor">
            <AceEditor
                placeholder="Enter your code here"
                mode="python"
                theme="xcode"
                name="code-editer"
                onChange={changeValue}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                editorProps={{ $blockScrolling: false }}
                style={{width: '100%', height: '100%'}}
                value={``}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
                
            />
        </div>
    );
};
