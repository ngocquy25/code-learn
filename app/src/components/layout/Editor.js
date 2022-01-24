import React, { useState } from "react";
import AceEditor from "react-ace";

import 'bootstrap/dist/css/bootstrap.css';
import { Button } from "react-bootstrap";

import '../../styles/styles.css';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-xcode";

export default function Editor({ code, changeCode }){
    return(
        <div className="editor">
            <AceEditor
                placeholder="Enter your code here"
                mode="python"
                theme="xcode"
                name="code-editer"
                onChange={changeCode}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                editorProps={{ $blockScrolling: false }}
                style={{width: '100%', height: '100%'}}
                value={code}
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
