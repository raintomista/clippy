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

function createSnippet(contentType, contentData) {
  const timestamp = new Date();

  return {
    id: timestamp.getTime(),
    content_type: contentType,
    content_data: contentData,
    created_at: timestamp.toISOString(),
  };
}
class Background {
  constructor() {}

  start() {
    this.addOnInstalledListener();
    this.createContextMenu();
    this.addContextMenuListener();
  }

  addContextMenuListener() {
    chrome.contextMenus.onClicked.addListener(async (info) => {
      const snippet = createSnippet("image/png", info.srcUrl);
      this.addSnippetToClipboard(snippet);
    });
  }

  addOnInstalledListener() {
    chrome.runtime.onInstalled.addListener(async () => {
      this.setAppData(INITIAL_APP_DATA);
      await this.injectContentScript();
    });
  }

  addSnippetToClipboard(snippet) {
    chrome.storage.local.get("appData", (result) => {
      const appData = [snippet, ...result.appData];
      chrome.storage.local.set({ appData });
    });
  }

  createContextMenu() {
    chrome.contextMenus.create({
      id: "clippy-copy-image",
      title: "Copy Image with clippy",
      contexts: ["image"],
    });
  }

  async injectContentScript() {
    const tabs = await chrome.tabs.query({
      url: ["http://*/*", "https://*/*"],
    });

    for (let tab of tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content-script.js"],
      });
    }
  }

  setAppData(appData) {
    chrome.storage.local.set({ appData });
  }
}

const background = new Background();
background.start();
