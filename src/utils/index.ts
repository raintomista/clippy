import { Snippet, Storage } from "../common/types";

export function getAppData(): Promise<Snippet[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get("appData", (storage: Storage) => {
      resolve(storage.appData ?? []);
    });
  });
}

export function setAppData(appData: Snippet[]) {
  chrome.storage.local.set({ appData });
}
