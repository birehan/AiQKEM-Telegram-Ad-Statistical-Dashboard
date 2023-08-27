import React from "react";
import Plotly from "plotly.js/lib/core";
import Plot from "react-plotly.js";
import { AiOutlineDownload } from "react-icons/ai";

const WaveLineChart: React.FC = () => {
  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const orders: number[] = [10, 30, 15, 25, 19, 30, 22, 15]; // Random number of orders for each day

  const handleDownloadClick = () => {
    // Custom logic to save the report goes here
    // For example, you can trigger a download of the chart image
    const downloadOptions: Plotly.DownloadImgopts = {
      format: "png", // Set the download format (can be 'png', 'svg', 'jpeg', 'webp')
      filename: "wave-line-chart", // Set the default filename for downloaded image
      width: 800, // Set the width of the downloaded image
      height: 600, // Set the height of the downloaded image
    };
    const gd = document.getElementById("plotly-chart");
    if (gd) {
      Plotly.downloadImage(gd, downloadOptions);
    }
  };

  return (
    <div className="flex-1 rounded-xl shadow-md w-full overflow-hidden relative">
      <div className="chart-container">
        <div id="plotly-chart">
          <Plot
            style={{
              flex: 1,
            }}
            data={[
              {
                x: days,
                y: orders,
                fill: "tonexty",
                stackgroup: "one",
                line: { shape: "spline", color: "#37a1dd", width: 3 },
                fillcolor:
                  "linear-gradient(90deg, rgba(170,218,238,1) 0%, rgba(206,236,250,1) 35%, rgba(231,246,253,1) 100%)",
                mode: "lines", // Remove markers
              },
            ]}
            layout={{
              xaxis: {
                showgrid: false, // Hide y-axis grid lines
              },
              yaxis: {
                showticklabels: false, // Hide y-axis tick labels
                showgrid: false, // Hide y-axis grid lines
              },
              height: 300,
            }}
            config={{
              displaylogo: false,
              modeBarButtonsToRemove: [
                "toImage",
                "pan2d",
                "zoom2d",
                "pan2d",
                "select2d",
                "lasso2d",
                "autoScale2d",
                "resetScale2d",
                "hoverClosestCartesian",
                "hoverCompareCartesian",
                "toggleSpikelines",
                "resetViewMapbox",
                "zoomIn2d",
                "zoomOut2d",
              ],
            }}
          />
        </div>
        <div className="absolute top-6 flex flex-row items-center justify-between left-8 right-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-[#494659] font-bold text-2xl">Chart Order</h2>
            <p className="text-[#c8c9ca]">
              Lorem ipsum, dolor sit amet consect
            </p>
          </div>
          <button
            className="download-button flex flex-row gap-1 rounded-xl border-2 border-[#70bce7] text-[#4994bf] items-center justify-center px-3 py-1"
            onClick={handleDownloadClick}
          >
            <AiOutlineDownload color="#5bb2e3" size="20px" />
            <span className="download-text">Save Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaveLineChart;
