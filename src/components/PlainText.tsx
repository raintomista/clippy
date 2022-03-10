import React from "react";
import { PlainTextProps } from "../common/types";

export function PlainText(props: PlainTextProps) {
  const { contentText } = props;
  
  const handleClick = () => {
    navigator.clipboard.writeText(contentText);
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-md p-2.5 bg-white hover:bg-slate-50 text-sm cursor-pointer select-none break-all whitespace-pre-wrap"
    >
      {contentText}
    </div>
  );
}

export default PlainText;
