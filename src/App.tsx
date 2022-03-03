import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [clipboardItems, setClipboardItems] = useState<string[]>([
    "Hello World!",
    "Ohayo Sekai",
    "Good morning, World!",
    "👽 📞 📡 👨🏻 🚲 🌕",
    "Welcome to Gboard clipboard, any text that you copy will be saved...",
    "Tap on a clip to paste it in the textbox",
    "Use the edit icon to pin, add or delete clips",
    "Touch and hold a clip to pin it. Unpinned clips will be deleted after 1 hours.",
  ]);

  return (
    <div className="overflow-y-auto min-h-[350px] max-h-[350px] min-w-[350px] max-w-[350px] p-2.5 bg-gray-100 ">
      <h6 className="text-sm text-gray-500 font-bold uppercase mb-2.5">
        Recent
      </h6>
      <div className="grid grid-cols-2 items-start gap-2.5">
        {clipboardItems.map((clipboardItem, index) => (
          <div key={index} className="rounded-md p-2.5 bg-white hover:bg-slate-50 text-sm cursor-pointer select-none">
            {clipboardItem}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
