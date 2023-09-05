import React, { useEffect, useState } from "react";
import Post from "../types/posts";
import { getAllChannelViewStat, getChannelViewStat } from "../common/getStats";
import DataTableView from "./charts/DataTableView.js";
import ShowTableToggle from "./ShowTableToogle";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";

interface BarChartProps {
  data: Post[];
}

const TotalViewsbyChannel: React.FC<BarChartProps> = ({ data }) => {
  const [selectedCreative, setSelectedCreative] = useState<string>("All"); // Default to "All"
  const [showTable, setShowTable] = useState(false); // Add state to control table visibility
  const [channelTitles, setChannelTitles] = useState<string[]>([]);
  const [totalViews, setTotalViews] = useState<number[]>([]);

  const creativeNames: string[] = ["All"];
  data.forEach((post) => {
    const creativeName = post.posted_ad_id.post_creative_id.name;
    if (!creativeNames.includes(creativeName)) {
      creativeNames.push(creativeName);
    }
  });

  const filteredData =
    selectedCreative === "All"
      ? data
      : data.filter(
          (post) => selectedCreative === post.posted_ad_id.post_creative_id.name
        );

  // const { channelTitles, totalViews } = getChannelViewStat(filteredData);

  const handleCreativeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCreative(event.target.value);
  };

  useEffect(() => {
    let response = null;

    if (showTable) {
      response = getAllChannelViewStat(filteredData);
    } else {
      response = getChannelViewStat(filteredData);
    }
    setChannelTitles(response.channelTitles);
    setTotalViews(response.totalViews);
  }, [showTable, filteredData]);

  return (
    <div className="mx-auto h-fit flex flex-col justify-center items-center gap-8 w-full">
      <h1 className="text-3xl font-bold">Channels Vs Views</h1>
      <div className="mb-4 flex flex-row gap-4">
        <div className="flex flex-row gap-4">
          <h2 className="text-xl font-semibold mb-2">Select Creative:</h2>
          <select
            value={selectedCreative}
            onChange={handleCreativeSelect}
            className="w-48 px-4 py-2 rounded-md bg-gray-200 text-gray-800"
          >
            {creativeNames.map((creativeName) => (
              <option key={creativeName} value={creativeName}>
                {creativeName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row gap-4">
          <p>View Table</p>
          <button className="" onClick={() => setShowTable(!showTable)}>
            <ShowTableToggle
              showTable={showTable}
              setShowTable={setShowTable}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-stretch justify-between w-full">
        {showTable ? (
          <DataTableView
            headers={["Channels", "Total Views"]}
            cells={[channelTitles, totalViews]}
          />
        ) : (
          <>
            <BarChart
              x={channelTitles}
              y={totalViews}
              title="Total Views by Channel"
              xTitle="Channels"
              yTitle="Total Views"
            />
            <PieChart
              labels={channelTitles}
              values={totalViews}
              title="Total Views by Channel"
              xTitle="Channels"
              yTitle="Total Views"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TotalViewsbyChannel;
