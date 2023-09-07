import React, { useEffect, useState } from "react";
import { BiSolidDownload } from "react-icons/bi";
interface Props {
  headers: string[];
  cells: any[];
  itemsPost: any[];
  postHeaders: any[];
}

const formatCreatedAt = (createdAt: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  return new Date(createdAt).toLocaleDateString(undefined, options);
};

const PostRows = ({
  posts,
  postHeaders,
}: {
  posts: any[];
  postHeaders: any[];
}) => {
  return (
    <>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        {postHeaders.map((head, index) => {
          return (
            <th key={index} className="py-3 px-6 text-left">
              {head}
            </th>
          );
        })}
      </tr>

      {posts.map((post, index) => (
        <tr
          key={index}
          className={`border-b border-gray-200 ${
            index % 2 === 0 ? "bg-[white]" : "bg-gray-50"
          }`}
        >
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">{post.title} </div>
          </td>

          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span className="font-medium">{post.views}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              {formatCreatedAt(post.createdAt)}
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

const SampleTable = ({ headers, cells, itemsPost, postHeaders }: Props) => {
  const [exportData, setExportData] = useState<string | null>(null);
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null);

  useEffect(() => {
    const dataToExport = [headers, ...cells];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      dataToExport.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    setExportData(encodedUri);
  }, []);

  const handleViewClick = (rowIndex: number) => {
    setClickedRowIndex(rowIndex);
  };

  return (
    <div className="px-6 flex flex-col gap-4  justify-start bg-gray-100 font-sans">
      {exportData && (
        <button type="button" className="text-right">
          <a
            href={exportData}
            download="table.csv"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <BiSolidDownload className="-mr-0.5 h-5 w-5" aria-hidden="true" />
            Download
          </a>
        </button>
      )}

      <div className="bg-white shadow-md rounded max-h-[70vh]  overflow-auto">
        <table className="max-w-[80rem] xl:min-w-[60rem] w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {headers.map((item, index) => {
                return (
                  <th key={index} className="py-3 px-6 text-left">
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {cells.map((_, index) => {
              const isClickedRow = index === clickedRowIndex;
              return (
                <React.Fragment key={index}>
                  <tr
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-[white]" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">{cells[index][0]}</div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <span className="font-medium">{cells[index][1]}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center gap-8">
                        <span className="font-medium">{cells[index][2]}</span>
                        <button
                          className="flex flex-row items-center justify-center"
                          onClick={() => {
                            if (index === clickedRowIndex) {
                              handleViewClick(-1);
                            } else {
                              handleViewClick(index);
                            }
                          }}
                        >
                          <span>
                            <svg
                              fill="none"
                              height="24"
                              shapeRendering="geometricPrecision"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              width="24"
                              className={`transform ${
                                isClickedRow && index === clickedRowIndex
                                  ? "rotate-180"
                                  : ""
                              }`}
                            >
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </span>
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                  {isClickedRow && (
                    <PostRows
                      postHeaders={postHeaders}
                      posts={itemsPost[clickedRowIndex]}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SampleTable;
