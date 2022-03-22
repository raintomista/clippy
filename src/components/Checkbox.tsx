import React from "react";
import { CheckboxProps } from "../common/types";

function Checkbox(props: CheckboxProps) {
  const { checked } = props;
  
  return (
    <div className="absolute top-0 left-0 flex w-full h-full bg-gradient-to-r from-white to-transparent p-2.5">
      <input
        type="checkbox"
        className="w-5 h-5 rounded-xl border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 transition duration-200 cursor-pointer"
        checked={checked}
        readOnly
      />
    </div>
  );
}

export default Checkbox;