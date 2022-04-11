import React, { useEffect, useMemo, useState } from "react";
import { PencilIcon, TrashIcon, XIcon } from "@heroicons/react/solid";
import { Snippet, StorageKey } from "./common/types";
import { IconButton, Image, PlainText } from "./components";
import { getLocalStorage, setLocalStorage } from "./utils";

function App() {
  const [editable, setEditable] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [recent, setRecent] = useState<Snippet[]>([]);
  const [pinned, setPinned] = useState<Snippet[]>([]);

  const initializeApp = async () => {
    const recent = await getLocalStorage(StorageKey.RECENT);
    setRecent(recent);

    const pinned = await getLocalStorage(StorageKey.PINNED);
    setPinned(pinned);

    chrome.storage.onChanged.addListener((changes) => {
      for (let [key, change] of Object.entries(changes)) {
        switch (key) {
          case StorageKey.RECENT:
            setRecent(change.newValue);
            break;
          case StorageKey.PINNED:
            setPinned(change.newValue);
            break;
          default:
            break;
        }
      }
    });
  };

  const headerText = useMemo(() => {
    if (!editable) return "Recent";
    if (selected.length === 0) return "Select Items";
    else return `${selected.length} selected`;
  }, [editable, selected]);

  const removeItems = () => {
    setLocalStorage(
      StorageKey.RECENT,
      recent.filter((snippet) => !selected.includes(snippet.id))
    );

    toggleEdit();
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
        {editable && (
          <IconButton
            handleClick={toggleEdit}
            iconComponent={<XIcon className="text-gray-500 select-none" />}
          />
        )}
        <h6 className="flex-1 mb-2.5 text-sm text-gray-500 font-bold uppercase">
          {headerText}
        </h6>
        {!editable ? (
          <div className="flex gap-2">
            <IconButton
              handleClick={toggleEdit}
              iconComponent={
                <PencilIcon className="text-gray-500 select-none" />
              }
            />
          </div>
        ) : (
          <div className="flex gap-2">
            <IconButton
              handleClick={removeItems}
              iconComponent={
                <TrashIcon className="text-gray-500 select-none" />
              }
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 items-start gap-2.5">
        {recent.map((snippet, index) =>
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
            <Image
              id={snippet.id}
              key={snippet.id}
              contentUrl={snippet.content_data}
              editable={editable}
              selectItem={selectItem}
              selected={selected.includes(snippet.id)}
            />
          )
        )}
      </div>
      <h6 className="flex-1 my-2.5 text-sm text-gray-500 font-bold uppercase">
        Pinned
      </h6>
      <div className="grid grid-cols-2 items-start gap-2.5">
        {pinned.map((snippet, index) =>
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
            <Image
              id={snippet.id}
              key={snippet.id}
              contentUrl={snippet.content_data}
              editable={editable}
              selectItem={selectItem}
              selected={selected.includes(snippet.id)}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
