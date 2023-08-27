// import React from "react";
// import Plot from "react-plotly.js";
// import Post from "../../types/posts";

// interface PieChartProps {
//   data: Post[];
// }

// const TotalViewsbyChannel: React.FC<PieChartProps> = ({ data }) => {
//   const channelViewsMap = new Map<string, number>();

//   data.forEach((post) => {
//     const channelTitle = post.posted_ad_id.channel_id.title;
//     const views = post.views;

//     if (channelViewsMap.has(channelTitle)) {
//       channelViewsMap.set(
//         channelTitle,
//         channelViewsMap.get(channelTitle)! + views
//       );
//     } else {
//       channelViewsMap.set(channelTitle, views);
//     }
//   });

//   const labels = Array.from(channelViewsMap.keys());
//   const values = Array.from(channelViewsMap.values());

//   const layout = {
//     title: "Pie Chart - Distribution of Views by Channel",
//   };

//   return (
//     <div className="mx-auto h-fit  flex flex-col justify-center items-center gap-8">
//       <h1 className="text-3xl font-bold">Channels Vs Views</h1>
//       <div className="flex flex-col xl:flex-row gap-8 items-stretch justify-between">
//         <Plot
//           style={{
//             flex: 1,
//           }}
//           data={[
//             {
//               x: labels,
//               y: values,
//               type: "bar",
//             },
//           ]}
//           layout={{
//             xaxis: { title: "Channels" },
//             yaxis: { title: "Total Views" },
//           }}
//           config={{ responsive: true }}
//         />
//         <Plot
//           style={{
//             flex: 1,
//           }}
//           data={[
//             {
//               labels: labels,
//               values: values,
//               type: "pie",
//             },
//           ]}
//           layout={{
//             title: "Total Views by Channels",
//             xaxis: { title: "Channels" },
//             yaxis: { title: "Total Views" },
//           }}
//           config={{ responsive: true }}
//         />
//       </div>
//     </div>
//   );
// };

// export default TotalViewsbyChannel;

import React, { useState } from "react";
import Plot from "react-plotly.js";
import Post from "../../types/posts";

interface BarChartProps {
  data: Post[];
}

const TotalViewsbyChannel: React.FC<BarChartProps> = ({ data }) => {
  const [selectedCreative, setSelectedCreative] = useState<string>("All"); // Default to "All"

  // Extracting unique creative names
  const creativeNamesSet = new Set(
    data.map((post) => post.posted_ad_id.post_creative_id.name)
  );

  const creativeNames: string[] = ["All"];
  data.forEach((post) => {
    const creativeName = post.posted_ad_id.post_creative_id.name;
    if (!creativeNames.includes(creativeName)) {
      creativeNames.push(creativeName);
    }
  });

  const handleCreativeToggle = (creative: string) => {
    if (selectedCreative === creative) {
      setSelectedCreative("All");
    } else {
      setSelectedCreative(creative);
    }
  };

  const filteredData =
    selectedCreative === "All"
      ? data
      : data.filter(
          (post) => selectedCreative === post.posted_ad_id.post_creative_id.name
        );

  const channelViewsMap = new Map<string, number>();

  filteredData.forEach((post) => {
    const channelTitle = post.posted_ad_id.channel_id.title;
    const views = post.views;

    if (channelViewsMap.has(channelTitle)) {
      channelViewsMap.set(
        channelTitle,
        channelViewsMap.get(channelTitle)! + views
      );
    } else {
      channelViewsMap.set(channelTitle, views);
    }
  });

  const channelTitles = Array.from(channelViewsMap.keys());
  const totalViews = Array.from(channelViewsMap.values());

  const handleCreativeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCreative(event.target.value);
  };

  return (
    <div className="mx-auto h-fit flex flex-col justify-center items-center gap-8 w-full">
      <h1 className="text-3xl font-bold">Channels Vs Views</h1>
      <div className="mb-4 flex flex-row gap-4">
        <div className="flex flex-row gap-4">
          <h2 className="text-xl font-semibold mb-2">Select Campaign:</h2>
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
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-stretch justify-between w-full">
        <div style={{ flex: 1 }}>
          <Plot
            style={{ flex: 1 }}
            data={[
              {
                x: channelTitles,
                y: totalViews,
                type: "bar",
              },
            ]}
            layout={{
              title: "Total Views by Channel",
              xaxis: { title: "Channels" },
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
                labels: channelTitles,
                values: totalViews,
                type: "pie",
              },
            ]}
            layout={{
              title: "Total Views by Channel",
              xaxis: { title: "Channels" },
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

export default TotalViewsbyChannel;
