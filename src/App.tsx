import React, { useEffect, useState } from "react";
import { Snippet } from "./common/types";
import { Image, PlainText } from "./components";
import { getAppData, setAppData } from "./utils";

function App() {
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

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <div className="overflow-y-auto w-screen h-screen p-2.5 bg-gray-100 ">
      <h6 className="text-sm text-gray-500 font-bold uppercase mb-2.5">
        Recent
      </h6>
      <div className="grid grid-cols-2 items-start gap-2.5">
        {snippets.map((snippet, index) =>
          snippet.content_type === "text/plain" ? (
            <PlainText contentText={snippet.content_data} />
          ) : (
            <Image contentUrl={snippet.content_data} />
          )
        )}
      </div>
    </div>
  );
}

export default App;
