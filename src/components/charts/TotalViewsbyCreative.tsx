import React, { useState } from "react";
import Plot from "react-plotly.js";
import Post from "../../types/posts";

interface BarChartProps {
  data: Post[];
}

const TotalViewsbyCreative: React.FC<BarChartProps> = ({ data }) => {
  const [selectedChannel, setSelectedChannel] = useState<string>("All"); // Default to "All"

  // Extracting unique channel titles
  const channelTitlesSet = new Set(
    data.map((post) => post.posted_ad_id.channel_id.title)
  );

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

  const creativeViewsMap = new Map<string, number>();

  filteredData.forEach((post) => {
    const creativeName = post.posted_ad_id.post_creative_id.name;
    const views = post.views;

    if (creativeViewsMap.has(creativeName)) {
      creativeViewsMap.set(
        creativeName,
        creativeViewsMap.get(creativeName)! + views
      );
    } else {
      creativeViewsMap.set(creativeName, views);
    }
  });

  const creativeNames = Array.from(creativeViewsMap.keys());
  const totalViews = Array.from(creativeViewsMap.values());

  return (
    <div className="mx-auto h-fit  flex flex-col justify-center items-center gap-8 w-full">
      <h1 className="text-3xl font-bold">Creatives Vs Views</h1>
      <div className="mb-4 flex flex-row gap-4">
        <div className="flex flex-row gap-4">
          <h2 className="text-xl font-semibold mb-2">Select Campaign:</h2>
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
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-stretch justify-between w-full">
        <div style={{ flex: 1 }}>
          <Plot
            style={{ flex: 1 }}
            data={[
              {
                x: creativeNames,
                y: totalViews,
                type: "bar",
              },
            ]}
            layout={{
              title: "Total Views by Creative",
              xaxis: { title: "Creatives" },
              yaxis: { title: "Total Views" },
              height: 400,
            }}
            config={{ responsive: true }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Plot
            style={{ flex: 1 }}
            data={[
              {
                labels: creativeNames,
                values: totalViews,
                type: "pie",
              },
            ]}
            layout={{
              title: "Total Views by Creative",
              xaxis: { title: "Creatives" },
              yaxis: { title: "Total Views" },
              height: 400,
            }}
            config={{ responsive: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default TotalViewsbyCreative;
