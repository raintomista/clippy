import { Snippet, Storage } from "../common/types";

export function getLocalStorage(key: string): Promise<Snippet[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (storage: Storage) => {
      resolve(storage[key] ?? []);
    });
  });
}

export function setLocalStorage(key: string, data: Snippet[]) {
  chrome.storage.local.set({ [key]: data });
}

export async function getBlobFromUrl(url: string) {
  const response = await fetch(url);
  return response.blob();
}
