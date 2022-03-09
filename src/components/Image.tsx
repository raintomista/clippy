import React from "react";
import { ImageProps } from "../common/types";

function Image(props: ImageProps) {
  const { contentUrl } = props;

  const handleClick = async () => {
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
