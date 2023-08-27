import React from "react";
import Plot from "react-plotly.js";
import Post from "../../types/posts";

interface GraphProps {
  data: Post; // Your JSON data array
}

const ChangeViewsPerPost: React.FC<GraphProps> = ({ data }) => {
  const timestamps = data.recorded_at_timestamps.map(
    (timestamp) => new Date(timestamp)
  );
  const views = data.views_list.map((view) => parseInt(view, 10));

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-8">
        Change Of Views for a Post
      </h1>
      <div className="flex flex-row gap-8">
        <div className="flex-1">
          {/* Line Chart */}
          <Plot
            style={{ flex: 1 }}
            className="flex-1"
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
              title: "Views Over Time (Line Chart)",
              xaxis: { title: "Time" },
              yaxis: { title: "Views" },
            }}
          />
        </div>
        <div className="flex-1">
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
        <div className="flex-1">
          {/* Scatter Chart */}
          <Plot
            style={{ flex: 1 }}
            className="flex-1"
            data={[
              {
                x: timestamps,
                y: views,
                type: "scatter",
                mode: "markers",
                marker: { color: "red" },
              },
            ]}
            layout={{
              title: "Views Over Time (Scatter Chart)",
              xaxis: { title: "Time" },
              yaxis: { title: "Views" },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeViewsPerPost;
