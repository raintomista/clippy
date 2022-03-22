import React from "react";
import { PlainTextProps } from "../common/types";
import { Checkbox } from "../components";

export function PlainText(props: PlainTextProps) {
  const { contentText, editable, id, selected, selectItem } = props;

  const handleClick = () => {
    if (!editable) navigator.clipboard.writeText(contentText);
    else selectItem(id);
  };
  
  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden rounded-md p-2.5 bg-white hover:bg-slate-50 text-sm cursor-pointer select-none break-all whitespace-pre-wrap"
    >
      {editable && <Checkbox checked={selected}/>}
      {contentText}
    </div>
  );
}

export default PlainText;
