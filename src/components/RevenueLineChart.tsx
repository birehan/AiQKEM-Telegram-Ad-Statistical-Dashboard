import React from "react";
import Plot from "react-plotly.js";
import { BsFillCircleFill } from "react-icons/bs";

const RevenueLineChart: React.FC = () => {
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const revenue2020: number[] = [
    10000, 20000, 30000, 25000, 40000, 35000, 28000, 30000, 25000, 32000, 19000,
    8500,
  ];
  const revenue2021: number[] = [
    20000, 30000, 15000, 34000, 25000, 23000, 38000, 40000, 16000, 26000, 34000,
    31000,
  ];

  return (
    <div className="flex-[7] rounded-xl shadow-md w-full overflow-hidden relative">
      <Plot
        style={{ flex: 7 }}
        data={[
          {
            x: months,
            y: revenue2020,
            type: "scatter",
            mode: "lines",
            name: "2020",
            line: {
              shape: "spline",
              color: "#2d9cda",
              width: 3,
              smoothing: 1.3,
            },
          },
          {
            x: months,
            y: revenue2021,
            type: "scatter",
            mode: "lines",
            name: "2021",
            line: {
              shape: "spline",
              color: "#ff5b5a",
              width: 3,
              smoothing: 1.3,
            },
          },
        ]}
        layout={{
          xaxis: {},
          yaxis: {
            range: [10000, 40000, 10000],
            showgrid: false, // Hide y-axis grid lines
          },
          legend: {
            x: 0.85,
            y: 1,
          },
          autosize: true,
          margin: {
            l: 60,
            r: 30,
            b: 60,
            t: 80,
            pad: 4,
          },
          height: 350,
          showlegend: false,
        }}
        config={{
          displaylogo: false,
          responsive: true,
          displayModeBar: false,
        }}
      />

      <div className="absolute top-6 flex flex-row items-center justify-between left-8 right-8">
        <h2 className="text-[#494659] font-bold text-2xl">Chart Order</h2>
        <div className="flex flex-row gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <BsFillCircleFill color="#2d9cda" />
            <p className="text-[#acacac]">2020</p>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <BsFillCircleFill color="#ff5b5a" />
            <p className="text-[#acacac]">2021</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueLineChart;
