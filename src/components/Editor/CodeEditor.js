import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
// import { ResponsiveMonacoEditor } from "responsive-react-monaco-editor";

import 'bootstrap/dist/css/bootstrap.css';
import './Editor.css';


const CodeEditor = ({ question, theme, lang, code, defaultCode, setCode }) => {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    // useEffect(() => {
    //     handleSubmit()
    // }, []);

    return(
        <>    
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
        </>
    );
};

export default CodeEditor;
