import React, { useRef, useRef } from "react";
import { ResponsiveMonacoEditor } from "responsive-react-monaco-editor";


const MEditor = ({ theme, lang, defaultCode, code, setCode }) => {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    return(
        <ResponsiveMonacoEditor
        theme={theme}
        defaultLanguage="javascript"
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
            }
        }}
        />
    );

}

export default MEditor;