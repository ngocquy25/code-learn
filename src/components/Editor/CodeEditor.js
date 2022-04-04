import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
// import { ResponsiveMonacoEditor } from "responsive-react-monaco-editor";
// import AceEditor from "react-ace";

// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/src-noconflict/ext-language_tools";

import 'bootstrap/dist/css/bootstrap.css';
import './Editor.css';


const CodeEditor = ({ question, theme, lang, code, defaultCode, setCode }) => {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    // const onChange = (value) => {
    //     console.log(value);
    // }

    // useEffect(() => {
    //     handleSubmit()
    // }, []);

    return(
        <div className="editor-container">    
            <Editor
                width="99%"
                height="100%"
                theme={theme}
                // defaultLanguage="javascript"
                language={lang}
                defaultValue={defaultCode}
                value={code}
                onChange={(value) => setCode(value)}
                onMount={handleEditorDidMount}
                options={{
                    fontSize: 14,
                    tabSize: 4,
                    minimap: {
                        enabled: false
                    },
                }} 
            /> 
            {/* <AceEditor
                className="ace-editor"
                mode="java"
                theme="github"
                height="100%"
                width="100%"
                onChange={onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={defaultCode}
                setOptions={{
                    // enableBasicAutocompletion: false,
                    // enableLiveAutocompletion: false,
                    // enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
                editorProps={{ $blockScrolling: true }}
            /> */}
        </div>
    );
};

export default CodeEditor;
