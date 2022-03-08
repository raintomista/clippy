function createSnippet(contentType, contentData) {
  const timestamp = new Date();

  return {
    id: timestamp.getTime(),
    content_type: contentType,
    content_data: contentData,
    created_at: timestamp.toISOString(),
  };
}

document.addEventListener("copy", () => {
  chrome.storage.local.get('appData', result => {
    const selection = document.getSelection();
    const snippet = createSnippet('text/plain', selection.toString())
    const appData = [snippet, ...result.appData];
    chrome.storage.local.set({ appData });
  });
});
