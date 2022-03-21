import React from "react";
import { ImageProps } from "../common/types";
import { Checkbox } from "../components";
import { getBlobFromUrl } from "../utils";

function Image(props: ImageProps) {
  const { contentUrl, editable, id, selectItem, selected } = props;

  const copyToClipboard = async () => {
    const blob = await getBlobFromUrl(contentUrl);
    const clipboardItem = new ClipboardItem({
      ["image/png"]: blob.slice(0, blob.size, "image/png"),
    });

    navigator.clipboard.write([clipboardItem]);
  };

  const handleClick = async () => {
    if (!editable) await copyToClipboard();
    else selectItem(id);
  };

  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden rounded-md bg-white hover:bg-slate-50 text-sm cursor-pointer select-none"
    >
      {editable && <Checkbox checked={selected} />}
      <img src={contentUrl} className="object-cover" />
    </div>
  );
}

export default Image;
