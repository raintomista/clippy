const INITIAL_APP_DATA = [
  "Welcome to Gboard clipboard, any text that you copy will be saved...",
  "Tap on a clip to paste it in the textbox",
  "Use the edit icon to pin, add or delete clips",
  "Touch and hold a clip to pin it. Unpinned clips will be deleted after 1 hours.",
];

chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.local.set({ appData: INITIAL_APP_DATA });

  const tabs = await chrome.tabs.query({
    url: ["http://*/*", "https://*/*"],
  });

  for (let tab of tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content-script.js"],
    });
  }
});
