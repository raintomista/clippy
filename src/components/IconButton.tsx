import React from "react";
import { IconButtonProps } from "../common/types";

function IconButton(props: IconButtonProps) {
  const { handleClick, iconComponent } = props;

  return (
    <div className="h-5 w-5 cursor-pointer select-none" onClick={handleClick}>
      {iconComponent}
    </div>
  );
}

export default IconButton;