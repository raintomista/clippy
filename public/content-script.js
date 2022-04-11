function createSnippet(contentType, contentData) {
  const timestamp = new Date();

  return {
    id: timestamp.getTime(),
    content_type: contentType,
    content_data: contentData,
    created_at: timestamp.toISOString(),
  };
}

function getLocalStorage(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result[key]);
    });
  });
}

function setAppData(key, data) {
  chrome.storage.local.set({ [key]: data });
}

class ContentScript {
  constructor() {}

  start() {
    this.addClipboardListener();
  }

  addClipboardListener() {
    document.addEventListener("cut", this.addSnippetToClipboard.bind(this));
    document.addEventListener("copy", this.addSnippetToClipboard.bind(this));
  }

  async addSnippetToClipboard() {
    const appData = await getLocalStorage('recent');
    const selectedText = await this.getSelectedText();
    const snippet = createSnippet("text/plain", selectedText);
    setAppData('recent', [snippet, ...appData]);
  }

  async getSelectedText() {
    const selection = document.getSelection();
    const clipboardText = await navigator.clipboard.readText();
    return selection.toString() || clipboardText;
  }
}

const contentScript = new ContentScript();
contentScript.start();
