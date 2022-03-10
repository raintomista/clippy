function createSnippet(contentType, contentData) {
  const timestamp = new Date();

  return {
    id: timestamp.getTime(),
    content_type: contentType,
    content_data: contentData,
    created_at: timestamp.toISOString(),
  };
}

function getAppData() {
  return new Promise((resolve) => {
    chrome.storage.local.get("appData", (result) => {
      resolve(result.appData);
    });
  });
}

function setAppData(appData) {
  chrome.storage.local.set({ appData });
}

class ContentScript {
  constructor() {}

  start() {
    this.addClipboardListener();
  }

  addClipboardListener() {
    document.addEventListener("copy", this.addSnippetToClipboard.bind(this));
  }

  async addSnippetToClipboard() {
    const appData = await getAppData();
    const selection = document.getSelection();
    const snippet = createSnippet("text/plain", selection.toString());
    appData.unshift(snippet);
    setAppData(appData);
  }
}

const contentScript = new ContentScript();
contentScript.start();
