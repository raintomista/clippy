interface Storage {
  appData?: string[];
}

export function getAppData(): Promise<string[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get("appData", (storage: Storage) => {
      resolve(storage.appData ?? []);
    });
  });
}

export function setAppData(appData: string[]) {
  chrome.storage.local.set({ appData });
}
