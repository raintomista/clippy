import React, { useEffect, useState } from "react";
import { getAppData, setAppData } from "./utils";

function App() {
  const [clipboardItems, setClipboardItems] = useState<string[]>([]);

  const initializeApp = async () => {
    const appData = await getAppData();
    setClipboardItems(appData);
    setAppData(appData);

    chrome.storage.onChanged.addListener((changes) => {
      for (let change of Object.values(changes)) {
        setClipboardItems(change.newValue);
      }
    });
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <div className="overflow-y-auto min-h-[350px] max-h-[350px] min-w-[350px] max-w-[350px] p-2.5 bg-gray-100 ">
      <h6 className="text-sm text-gray-500 font-bold uppercase mb-2.5">
        Recent
      </h6>
      <div className="grid grid-cols-2 items-start gap-2.5">
        {clipboardItems.map((clipboardItem, index) => (
          <div
            key={index}
            className="rounded-md p-2.5 bg-white hover:bg-slate-50 text-sm cursor-pointer select-none"
          >
            {clipboardItem}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
