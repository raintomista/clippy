import React, { useEffect, useState } from "react";
import { getAppData, setAppData } from "./utils";

function App() {
  const [snippets, setSnippets] = useState<string[]>([]);

  const initializeApp = async () => {
    const appData = await getAppData();
    setSnippets(appData);

    chrome.storage.onChanged.addListener((changes) => {
      for (let change of Object.values(changes)) {
        setSnippets(change.newValue);
      }
    });
  };

  const copySnippet = async (snippet: string) => {
    await navigator.clipboard.writeText(snippet);
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
        {snippets.map((snippet, index) => (
          <div
            key={index}
            onClick={() => copySnippet(snippet)}
            className="rounded-md p-2.5 bg-white hover:bg-slate-50 text-sm cursor-pointer select-none"
          >
            {snippet}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
