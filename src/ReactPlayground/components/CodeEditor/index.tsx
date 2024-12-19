import { useContext, useEffect } from "react";
import Editor from "./Editor";
import FileNameList from "./FileNameList";
import { PlaygroundContext } from "../../PlaygroundContext";
import { debounce } from "lodash-es";
export default function CodeEditor() {
  const { files, selectedFileName, setFiles, theme, setTheme } =
    useContext(PlaygroundContext);
  const file = files[selectedFileName];

  function onEditorChange(value?: string) {
    files[file.name].value = value!;
    setFiles({ ...files });
  }

  useEffect(() => {
    setTheme(theme);
  }, [theme]);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      <Editor
        file={file}
        onChange={debounce(onEditorChange, 500)}
        options={{ theme: `vs-${theme}` }}
      />
    </div>
  );
}
