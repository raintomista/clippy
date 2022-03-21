import React, { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/solid";
import { Snippet } from "./common/types";
import { IconButton, Image, PlainText } from "./components";
import { getAppData, setAppData } from "./utils";

function App() {
  const [editable, setEditable] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const initializeApp = async () => {
    const appData = await getAppData();
    setSnippets(appData);

    chrome.storage.onChanged.addListener((changes) => {
      for (let change of Object.values(changes)) {
        setSnippets(change.newValue);
      }
    });
  };

  const selectItem = (id: string) => {
    if (!selected.includes(id)) setSelected([...selected, id]);
    else setSelected(selected.filter((selectedId) => selectedId !== id));
  };

  const toggleEdit = () => {
    setEditable((editable) => !editable);
    setSelected([]);
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <div className="overflow-y-auto w-screen h-screen p-2.5 bg-gray-100 ">
      <div className="flex gap-2">
        <h6 className="flex-1 text-sm text-gray-500 font-bold uppercase mb-2.5">
          {editable ? 'Select Items' : 'Recent'}
        </h6>
        <div className="flex gap-2">
          <IconButton
            handleClick={toggleEdit}
            iconComponent={<PencilIcon className="text-gray-500 select-none" />}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 items-start gap-2.5">
        {snippets.map((snippet, index) =>
          snippet.content_type === "text/plain" ? (
            <PlainText
              id={snippet.id}
              key={snippet.id}
              contentText={snippet.content_data}
              editable={editable}
              selectItem={selectItem}
              selected={selected.includes(snippet.id)}
            />
          ) : (
            <Image contentUrl={snippet.content_data} />
          )
        )}
      </div>
    </div>
  );
}

export default App;
