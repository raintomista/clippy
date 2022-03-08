const INITIAL_APP_DATA = [
  {
    id: '1646734298207',
    content_type: 'text/plain',
    content_data: 'Welcome to Gboard clipboard, any text that you copy will be saved...',
    created_at: '2022-03-08T10:11:38.207Z'
  },
  {
    id: '1646734294410',
    content_type: 'text/plain',
    content_data: 'Tap on a clip to paste it in the textbox',
    created_at: '2022-03-08T10:11:34.410Z'
  },
  {
    id: '1646734290073',
    content_type: 'text/plain',
    content_data: 'Use the edit icon to pin, add or delete clips',
    created_at: '2022-03-08T10:11:30.073Z'
  },
  {
    id: '1646734285577',
    content_type: 'text/plain',
    content_data: 'Touch and hold a clip to pin it. Unpinned clips will be deleted after 1 hours.',
    created_at: '2022-03-08T10:11:25.577Z'
  },
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
