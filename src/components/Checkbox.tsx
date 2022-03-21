import React from "react";
import { CheckboxProps } from "../common/types";

function Checkbox(props: CheckboxProps) {
  const { checked } = props;
  
  return (
    <div className="absolute top-0 left-0 flex items-center bg-gradient-to-r from-white to-transparent h-full p-2.5 pr-10">
      <input
        type="checkbox"
        className="rounded-xl border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 transition duration-200 mr-2 cursor-pointer"
        checked={checked}
        readOnly
      />
    </div>
  );
}

export default Checkbox;