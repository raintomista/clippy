export interface CheckboxProps {
  checked: boolean;
}

export interface IconButtonProps {
  handleClick: () => void;
  iconComponent: JSX.Element;
}
export interface ImageProps {
  id: string;
  contentUrl: string;
  editable: boolean;
  selectItem: (id: string) => void;
  selected: boolean;
}

export interface PlainTextProps {
  id: string;
  contentText: string;
  editable: boolean;
  selectItem: (id: string) => void;
  selected: boolean;
}

export interface Snippet {
  id: string;
  created_at: string;
  content_type: string;
  content_data: string;
}

export enum StorageKey {
  PINNED = "pinned",
  RECENT = "recent",
}

export type Storage = {
  [key: string]: Snippet[];
};
