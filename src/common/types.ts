export interface ImageProps {
  contentUrl: string;
}

export interface PlainTextProps {
  contentText: string;
}

export interface Snippet {
  id: string;
  created_at: string;
  content_type: string;
  content_data: string;
}

export interface Storage {
  appData?: Snippet[];
}
