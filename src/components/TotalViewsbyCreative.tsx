import React, { useEffect, useState } from "react";
import Post from "../types/posts";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import DataTableView from "./charts/DataTableView.js";
import ShowTableToggle from "./ShowTableToogle";
import {
  getAllCreativeViewStat,
  getCreativeViewStat,
} from "../common/getStats";

interface BarChartProps {
  data: Post[];
}

const TotalViewsbyCreative: React.FC<BarChartProps> = ({ data }) => {
  const [selectedChannel, setSelectedChannel] = useState<string>("All");
  const [showTable, setShowTable] = useState(false);
  const [creativeNames, setCreativeNames] = useState<string[]>([]);
  const [totalViews, setTotalViews] = useState<number[]>([]);

  const channelTitles: string[] = ["All"];
  data.forEach((post) => {
    const channelTitle = post.posted_ad_id.channel_id.title;
    if (!channelTitles.includes(channelTitle)) {
      channelTitles.push(channelTitle);
    }
  });

  const handleChannelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChannel(event.target.value);
  };

  const filteredData =
    selectedChannel === "All"
      ? data
      : data.filter(
          (post) => post.posted_ad_id.channel_id.title === selectedChannel
        );

  useEffect(() => {
    let response = null;

    if (showTable) {
      response = getAllCreativeViewStat(filteredData);
    } else {
      response = getCreativeViewStat(filteredData);
    }
    setCreativeNames(response.creativeNames);
    setTotalViews(response.totalViews);
  }, [showTable]);

  return (
    <div className="mx-auto h-fit  flex flex-col justify-center items-center gap-8 w-full">
      <h1 className="text-3xl font-bold">Creatives Vs Views</h1>
      <div className="mb-4 flex flex-row gap-4 relative items-center justify-center">
        <div className="flex flex-row gap-4">
          <h2 className="text-xl font-semibold mb-2">Select Channel:</h2>
          <select
            value={selectedChannel}
            onChange={handleChannelSelect}
            className="w-48 px-4 py-2 rounded-md bg-gray-200 text-gray-800"
          >
            {channelTitles.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
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

      <div className="flex flex-col xl:flex-row gap-8 items-stretch justify-center w-full">
        {showTable ? (
          <DataTableView
            headers={["Creative", "Total Views"]}
            cells={[creativeNames, totalViews]}
          />
        ) : (
          <>
            <BarChart
              x={creativeNames}
              y={totalViews}
              title="Total Views by Creative"
              xTitle="Creatives"
              yTitle="Total Views"
            />
            <PieChart
              labels={creativeNames}
              values={totalViews}
              title="Total Views by Creative"
              xTitle="Creatives"
              yTitle="Total Views"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TotalViewsbyCreative;
