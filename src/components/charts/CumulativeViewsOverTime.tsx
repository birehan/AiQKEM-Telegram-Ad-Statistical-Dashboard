import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Post from "../../types/posts";

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

    // Update available channels based on selected creative
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

    // If the selected channel is still within the updated list, keep it; otherwise, reset to "All"
    setSelectedChannel(
      updatedChannels.includes(selectedChannel) ? selectedChannel : "All"
    );
  };

  const handleChannelSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChannel = event.target.value;
    setSelectedChannel(selectedChannel);

    // Update available creatives based on selected channel
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

    // If the selected creative is still within the updated list, keep it; otherwise, reset to "All"
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

  const timestampViewsMap = new Map<number, number>();
  const firstTimestamp = Math.min(
    ...filteredData.flatMap((post) => post.recorded_at_timestamps)
  );
  const lastTimestamp = Math.max(
    ...filteredData.flatMap((post) => post.recorded_at_timestamps)
  );
  const timeStep = (lastTimestamp - firstTimestamp) / 4;

  let viewsSum = 0;
  let cumulativeViewsSum = 0;

  for (let i = 0; i < 5; i++) {
    const startTime = firstTimestamp + i * timeStep;
    const endTime = startTime + timeStep;

    filteredData.forEach((post) => {
      post.recorded_at_timestamps.forEach((timestamp, index) => {
        const views = parseInt(post.views_list[index], 10);
        if (timestamp >= startTime && timestamp < endTime) {
          viewsSum += views;
          cumulativeViewsSum += views;
        }
      });
    });

    timestampViewsMap.set(startTime, cumulativeViewsSum);
  }

  const timestamps = Array.from(timestampViewsMap.keys());
  const cumulativeViews = Array.from(timestampViewsMap.values());

  const formattedTimestamps = timestamps.map((timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(); // You can format the timestamp as you prefer
  });

  // ... The rest of your code remains unchanged ...

  return (
    <div className="mx-auto h-fit flex flex-col justify-center items-center gap-8 w-full">
      <h1 className="text-3xl font-bold">Views Trend Over Time</h1>
      <div className="mb-4 flex flex-row gap-4">
        <div className="flex flex-row gap-4">
          <h2 className="text-xl font-semibold mb-2">Select Campaign:</h2>
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
      {/* ... The rest of your code remains unchanged ... */}
      <div className="flex flex-col xl:flex-row gap-8 items-stretch justify-between w-full">
        <div style={{ flex: 1 }}>
          <Plot
            style={{ flex: 1 }}
            data={[
              {
                x: formattedTimestamps,
                y: cumulativeViews,
                fill: "tozeroy",
                type: "scatter",
              },
            ]}
            layout={{
              title: "Views Trend Over Time (Area Chart)",
              xaxis: { title: "Timestamp" },
              yaxis: { title: "Cumulative Views" },
              height: 400,
            }}
            config={{ responsive: true }}
          />
        </div>

        {/* <div style={{ flex: 1 }}>
          <Plot
            style={{ flex: 1 }}
            data={[
              {
                x: formattedTimestamps,
                y: cumulativeViews,
                mode: "lines",
              },
            ]}
            layout={{
              title: "Views Trend Over Time",
              xaxis: { title: "Timestamp" },
              yaxis: { title: "Cumulative Views" },
              height: 400,
            }}
            config={{ responsive: true }}
          />
        </div> */}
        <div style={{ flex: 1 }}>
          <Plot
            style={{ flex: 1 }}
            data={[
              {
                x: formattedTimestamps,
                y: cumulativeViews,
                type: "bar",
              },
            ]}
            layout={{
              title: "Views Trend Over Time",
              xaxis: { title: "Timestamp" },
              yaxis: { title: "Cumulative Views" },
              height: 400,
            }}
            config={{ responsive: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default CumulativeViewsOverTime;
