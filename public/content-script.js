document.addEventListener("copy", () => {
  chrome.storage.local.get('appData', result => {
    const selection = document.getSelection();
    const initialData = result.appData ?? [];
    const appData = [selection.toString(), ...initialData];
    chrome.storage.local.set({ appData });
  });
});
