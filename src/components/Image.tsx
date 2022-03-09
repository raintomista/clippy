import React from "react";
import { ImageProps } from "../common/types";
import { getBlobFromUrl } from "../utils";

function Image(props: ImageProps) {
  const { contentUrl } = props;

  const handleClick = async () => {
    const blob = await getBlobFromUrl(contentUrl);
    const clipboardItem = new ClipboardItem({
      ["image/png"]: blob.slice(0, blob.size, "image/png"),
    });

    navigator.clipboard.write([clipboardItem]);
  };

  return (
    <div
      onClick={handleClick}
      className="overflow-hidden rounded-md bg-white hover:bg-slate-50 text-sm cursor-pointer select-none"
    >
      <img src={contentUrl} className="object-cover" />
    </div>
  );
}

export default Image;
