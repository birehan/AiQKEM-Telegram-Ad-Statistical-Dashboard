import React from "react";
import Plot from "react-plotly.js";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";

const BarChart: React.FC = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const yValues = [60, 80, 40, 65, 60, 23, 60]; // Adjust the y-values as needed

  const barColors = [
    "#ff5b5a",
    "#f7c705",
    "#ff5b5a",
    "#f7c705",
    "#ff5b5a",
    "#f7c705",
    "#ff5b5a",
  ]; // Repeat the color pattern

  return (
    <div className="flex-[4] rounded-xl shadow-md w-full overflow-hidden relative">
      <Plot
        style={{ flex: 4 }}
        data={daysOfWeek.map((day, index) => ({
          x: [day],
          y: [yValues[index]],
          type: "bar",
          marker: { color: barColors[index % barColors.length] },
          textposition: "auto",
          width: 0.35,
        }))}
        layout={{
          yaxis: { range: [0, 80] },
          barmode: "stack",
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
        <h2 className="text-[#494659] font-bold text-2xl">Customer Map</h2>
        <div className="flex flex-row gap-4 items-center justify-center">
          <button className="rounded-lg px-4 py-1.5 border-2 border-[#d7d7da]">
            <div className="flex flex-row gap-2 items-center justify-center ">
              <p className="">Weekly</p>
              <AiFillCaretDown color="#ff5b5b" />
            </div>
          </button>
          <BsThreeDotsVertical color="#babbbf" size="25px" />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
