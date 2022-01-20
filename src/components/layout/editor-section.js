import React from "react";
import AceEditor from "react-ace";
import '../../styles/styles.css';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-terminal";

function onChange(newValue) {
  console.log("change", newValue);
}

export default function EditorSection(){
    return(
        <div class="editor-section">
            <AceEditor
                mode="python"
                theme="terminal"
                onChange={onChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: false }}
                style={{width: '100%', height: '100%'}}
            />
        </div>
    );
};
