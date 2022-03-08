chrome.runtime.onInstalled.addListener(async () => {
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