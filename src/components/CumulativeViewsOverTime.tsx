import React, { useState, useEffect } from "react";
import Post from "../types/posts";
import { getViewsOverTime } from "../common/getStats";
import PieChart from "./charts/PieChart";
import AreaChart from "./charts/AreaChart";
import BarChart from "./charts/BarChart";

interface LineChartProps {
  data: Post[];
}

const CumulativeViewsOverTime: React.FC<LineChartProps> = ({ data }) => {
  const [selectedCreative, setSelectedCreative] = useState<string>("All"); // Default to "All"
  const [selectedChannel, setSelectedChannel] = useState<string>("All"); // Default to "All"
  const [creatives, setCreatives] = useState<string[]>([]);
  const [channels, setChannels] = useState<string[]>([]);

  useEffect(() => {
    const availableCreatives = new Set<string>();
    const availableChannels = new Set<string>();

    data.forEach((post) => {
      availableCreatives.add(post.posted_ad_id.post_creative_id.name);
      availableChannels.add(post.posted_ad_id.channel_id.title);
    });

    setCreatives(["All", ...Array.from(availableCreatives)]);
    setChannels(["All", ...Array.from(availableChannels)]);
  }, [data]);

  const handleCreativeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCreative = event.target.value;
    setSelectedCreative(selectedCreative);

    const availableChannels = new Set<string>();
    data.forEach((post) => {
      if (
        selectedCreative === "All" ||
        post.posted_ad_id.post_creative_id.name === selectedCreative
      ) {
        availableChannels.add(post.posted_ad_id.channel_id.title);
      }
    });

    const updatedChannels = ["All", ...Array.from(availableChannels)];
    setChannels(updatedChannels);

    setSelectedChannel(
      updatedChannels.includes(selectedChannel) ? selectedChannel : "All"
    );
  };

  const handleChannelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChannel = event.target.value;
    setSelectedChannel(selectedChannel);

    const availableCreatives = new Set<string>();
    data.forEach((post) => {
      if (
        selectedChannel === "All" ||
        post.posted_ad_id.channel_id.title === selectedChannel
      ) {
        availableCreatives.add(post.posted_ad_id.post_creative_id.name);
      }
    });

    const updatedCreatives = ["All", ...Array.from(availableCreatives)];
    setCreatives(updatedCreatives);

    setSelectedCreative(
      updatedCreatives.includes(selectedCreative) ? selectedCreative : "All"
    );
  };

  const filteredData = data.filter((post) => {
    const selectedCreativeMatches =
      selectedCreative === "All" ||
      post.posted_ad_id.post_creative_id.name === selectedCreative;

    const selectedChannelMatches =
      selectedChannel === "All" ||
      post.posted_ad_id.channel_id.title === selectedChannel;

    return selectedCreativeMatches && selectedChannelMatches;
  });

  const { formattedTimestamps, cumulativeViews } =
    getViewsOverTime(filteredData);

  return (
    <div className="mx-auto h-fit flex flex-col justify-center items-center gap-8 w-full">
      <h1 className="text-3xl font-bold">Views Trend Over Time</h1>
      <div className="mb-4 flex flex-row gap-4">
        <div className="flex flex-row gap-4">
          <h2 className="text-xl font-semibold mb-2">Select Creative:</h2>
          <select
            value={selectedCreative}
            onChange={handleCreativeSelect}
            className="w-48 px-4 py-2 rounded-md bg-gray-200 text-gray-800"
          >
            {creatives.map((creative) => (
              <option key={creative} value={creative}>
                {creative}
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
            {channels.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-8 items-stretch justify-between w-full">
        <AreaChart
          x={formattedTimestamps}
          y={cumulativeViews}
          title="Views Trend Over Time (Area Chart)"
          xTitle="Timestamp"
          yTitle="Views"
        />
        <BarChart
          x={formattedTimestamps}
          y={cumulativeViews}
          title="Views Trend Over Time"
          xTitle="Timestamp"
          yTitle="Views"
        />
      </div>
    </div>
  );
};

export default CumulativeViewsOverTime;
