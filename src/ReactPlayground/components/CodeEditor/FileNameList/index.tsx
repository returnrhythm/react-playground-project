import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";

import { FileNameItem } from "./FileNameItem";
import styles from "./index.module.scss";
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from "../../../files";

export default function FileNameList() {
  const {
    files,
    selectedFileName,
    setSelectedFileName,
    updateFileName,
    addFile,
    removeFile,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState([""]);

  const handleEditComplete = (name: string, prename: string) => {
    updateFileName(prename, name);
    setSelectedFileName(name);
    setCreating(false);
  };
  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);
  const [creating, setCreating] = useState(false);

  const addTab = () => {
    const newFileName = "Comp" + Math.random().toString().slice(2, 8) + ".tsx";
    addFile(newFileName);
    setSelectedFileName(newFileName);
    setCreating(true);
  };
  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };
  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map((item, index, arr) => (
        <FileNameItem
          key={item + index}
          readonly={readonlyFileNames.includes(item)}
          value={item}
          creating={creating && index === arr.length - 1}
          actived={selectedFileName === item}
          onRemove={() => handleRemove(item)}
          onClick={() => setSelectedFileName(item)}
          onEditComplete={(name: string) => handleEditComplete(name, item)}
        ></FileNameItem>
      ))}
      <div className={styles.add} onClick={addTab}>
        +
      </div>
    </div>
  );
}
