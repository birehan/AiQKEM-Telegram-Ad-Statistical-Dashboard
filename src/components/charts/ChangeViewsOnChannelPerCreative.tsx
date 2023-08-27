import React, { useState } from "react";
import Plot from "react-plotly.js";
import Post from "../../types/posts";

interface Props {
  posts: Post[];
}

const ChangeViewsOnChannelPerCreative: React.FC<Props> = ({ posts }) => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedCreative, setSelectedCreative] = useState<string | null>(null);

  const uniqueChannels = Array.from(
    new Set(posts.map((post) => post.posted_ad_id.channel_id.title))
  );

  const creativesInSelectedChannel = selectedChannel
    ? Array.from(
        new Set(
          posts
            .filter(
              (post) => post.posted_ad_id.channel_id.title === selectedChannel
            )
            .map((post) => post.posted_ad_id.post_creative_id.name)
        )
      )
    : [];

  const handleChannelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChannel(event.target.value);
    setSelectedCreative(null);
  };

  const handleCreativeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCreative(event.target.value);
  };

  const filteredPosts =
    selectedChannel && selectedCreative
      ? posts.filter(
          (post) =>
            post.posted_ad_id.channel_id.title === selectedChannel &&
            post.posted_ad_id.post_creative_id.name === selectedCreative
        )
      : [];

  const timestamps = filteredPosts.map(
    (post) => new Date(post.recorded_at_timestamps[0])
  );
  const views = filteredPosts.map((post) => parseInt(post.views_list[0], 10));

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">
        Change of Views per Post over Time
      </h1>
      <div className="flex space-x-4 mb-4">
        <select
          className="
            bg-white border border-gray-300 rounded px-3 py-2 w-1/2
            hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
          "
          onChange={handleChannelChange}
          value={selectedChannel || ""}
        >
          <option value="">Select a Channel</option>
          {uniqueChannels.map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>

        <select
          className="
            bg-white border border-gray-300 rounded px-3 py-2 w-1/2
            hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
        "
          onChange={handleCreativeChange}
          value={selectedCreative || ""}
          disabled={!selectedChannel}
        >
          <option value="">Select a Creative</option>
          {creativesInSelectedChannel.map((creative) => (
            <option key={creative} value={creative}>
              {creative}
            </option>
          ))}
        </select>
      </div>
      {filteredPosts.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Graphs</h2>
          <div className="space-y-4">
            <div>
              <Plot
                data={[
                  {
                    x: timestamps,
                    y: views,
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "blue" },
                  },
                ]}
                layout={{
                  title: "Views Over Time",
                  xaxis: { title: "Time" },
                  yaxis: { title: "Views" },
                }}
              />
              {/* Bar Chart */}
              <Plot
                style={{ flex: 1 }}
                className="flex-1"
                data={[
                  {
                    x: timestamps,
                    y: views,
                    type: "bar",
                    marker: { color: "green" },
                  },
                ]}
                layout={{
                  title: "Views Over Time (Bar Chart)",
                  xaxis: { title: "Time" },
                  yaxis: { title: "Views" },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeViewsOnChannelPerCreative;
