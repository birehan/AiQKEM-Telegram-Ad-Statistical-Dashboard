import React, { useState } from "react";
interface Props {
  cells: any[];
  index: number;
}

const TableRow = ({ cells, index }: Props) => {
  const [showPostDetail, setShowPostDetail] = useState(false);
  return (
    <tr
      className={`border-b border-gray-200 
        ${index % 2 == 0 ? "bg-[white]" : "bg-gray-50"} hover:bg-gray-100`}
    >
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <span className="font-medium">{cells[index][0]}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <span className="font-medium">{cells[index][1]}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center gap-2">
          <span className="font-medium">{cells[index][2]}</span>
          <button onClick={() => setShowPostDetail(!showPostDetail)}>
            View
          </button>
        </div>
      </td>
      {showPostDetail && (
        <tr
          className={`border-b border-gray-200 
        ${index % 2 == 0 ? "bg-[white]" : "bg-gray-50"} hover:bg-gray-100`}
        >
          <td className="py-3 px-6 text-left"></td>
          <td className="py-3 px-6 text-left"></td>
          <td className="py-3 px-6 text-left">posts</td>
        </tr>
      )}
    </tr>
  );
};

export default TableRow;
