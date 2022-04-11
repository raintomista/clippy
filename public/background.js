const INITIAL_APP_DATA = [
  {
    id: "1646734298207",
    content_type: "text/plain",
    content_data:
      "Welcome to Gboard clipboard, any text that you copy will be saved...",
    created_at: "2022-03-08T10:11:38.207Z",
  },
  {
    id: "1646734294410",
    content_type: "text/plain",
    content_data: "Tap on a clip to paste it in the textbox",
    created_at: "2022-03-08T10:11:34.410Z",
  },
  {
    id: "1646734290073",
    content_type: "text/plain",
    content_data: "Use the edit icon to pin, add or delete clips",
    created_at: "2022-03-08T10:11:30.073Z",
  },
  {
    id: "1646734285577",
    content_type: "text/plain",
    content_data:
      "Touch and hold a clip to pin it. Unpinned clips will be deleted after 1 hours.",
    created_at: "2022-03-08T10:11:25.577Z",
  },
];

const CLIPBOARD_MAX_DURATION_MINUTES = 15;
const SCHEDULER_INTERVAL_MINUTES = 0.25;

function createSnippet(contentType, contentData) {
  const timestamp = new Date();

  return {
    id: timestamp.getTime(),
    content_type: contentType,
    content_data: contentData,
    created_at: timestamp.toISOString(),
  };
}

function scrubExpiredData(date, duration) {
  const createdAt = new Date(date);
  const milliseconds = Date.now() - createdAt.getTime();
  const elapsed = milliseconds / (60 * 1000);
  return elapsed < duration;
}

class Background {
  constructor() {}

  start() {
    this.addOnInstalledListener();
    this.createContextMenu();
    this.addContextMenuListener();
    this.initializeScheduler();
    this.addSchedulerListener();
  }

  async getLocalStorage(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key]);
      });
    });
  }

  setLocalStorage(key, data) {
    chrome.storage.local.set({ [key]: data });
  }

  addContextMenuListener() {
    chrome.contextMenus.onClicked.addListener(async (info) => {
      const snippet = createSnippet("image/png", info.srcUrl);
      this.addSnippetToClipboard(snippet);
    });
  }

  addOnInstalledListener() {
    chrome.runtime.onInstalled.addListener(async () => {
      this.setLocalStorage('recent', []);
      this.setLocalStorage("pinned", INITIAL_APP_DATA);
      await this.injectContentScript();
    });
  }

  addSchedulerListener() {
    chrome.alarms.onAlarm.addListener(async () => {
      await this.performDataCleanup();
    });
  }

  async addSnippetToClipboard(snippet) {
    const appData = await this.getLocalStorage("recent");
    this.setLocalStorage("recent", [snippet, ...appData]);
  }

  createContextMenu() {
    chrome.contextMenus.create({
      id: "clippy-copy-image",
      title: "Copy Image with clippy",
      contexts: ["image"],
    });
  }

  initializeScheduler() {
    chrome.alarms.create({
      periodInMinutes: SCHEDULER_INTERVAL_MINUTES,
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

  async performDataCleanup() {
    const appData = await this.getLocalStorage('recent');
    const filteredData = appData.filter((snippet) =>
      scrubExpiredData(snippet.created_at, CLIPBOARD_MAX_DURATION_MINUTES)
    );
    this.setLocalStorage("recent", filteredData);
  }
}

const background = new Background();
background.start();
