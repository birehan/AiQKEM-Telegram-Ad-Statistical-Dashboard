import Plot from "react-plotly.js";
import { BsThreeDotsVertical } from "react-icons/bs";

const PieChart = () => {
  return (
    <div className="flex-1 rounded-xl  shadow-md overflow-hidden relative">
      <Plot
        className="w-full"
        style={{ flex: 1, height: "100%" }}
        data={[
          {
            values: [81, 19],
            labels: ["US", "China"],
            domain: { column: 0 },
            name: "GHG Emissions",
            hoverinfo: "label+percent+name",
            hole: 0.5,
            type: "pie",
            marker: {
              colors: ["#fe5b5c", "#ffe6e7"], // Red color for the first chart
            },
            textinfo: "none",
          },
          {
            values: [22, 78],
            labels: ["US", "China"],
            text: "CO2",
            textposition: "inside",
            domain: { column: 1 },
            name: "CO2 Emissions",
            hoverinfo: "label+percent+name",
            hole: 0.5,
            type: "pie",
            marker: {
              colors: ["#01b075", "#d9f3ea"], // Red color for the first chart
            },
            textinfo: "none",
          },
          {
            values: [22, 78],
            labels: ["US", "China"],
            text: "CO2",
            textposition: "inside",
            domain: { column: 2 },
            name: "CO2 Emissions",
            hoverinfo: "label+percent+name",
            hole: 0.5,
            type: "pie",
            marker: {
              colors: ["#2d9bda", "#deeff9"], // Red color for the first chart
            },
            textinfo: "none",
          },
        ]}
        layout={{
          annotations: [
            {
              font: {
                size: 20,
              },
              showarrow: false,
              text: "81%",
              x: 0.11,
              y: 0.5,
            },
            {
              font: {
                size: 20,
              },
              showarrow: false,
              text: "22%",
              x: 0.9,
              y: 0.5,
            },
            {
              font: {
                size: 20,
              },
              showarrow: false,
              text: "62%",
              x: 0.5,
              y: 0.5,
            },
          ],
          height: 300,
          showlegend: false,
          grid: { rows: 1, columns: 3 },
        }}
        config={{
          displayModeBar: false,
          displaylogo: false,
        }}
      />
      <div className="absolute bottom-10 m-auto left-0 right-0 flex flex-row items-center justify-around text-[#676474] w-[75%]">
        <p>Total Order</p>
        <p>Customer Growth</p>
        <p>Total Revenue</p>
      </div>

      <div className="absolute top-6 flex flex-row items-center justify-between left-8 right-8">
        <h2 className="text-[#494659] font-bold text-2xl">Pie Chart</h2>
        <div className="flex flex-row gap-8 items-center">
          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-2 items-center">
              <input
                className="form-checkbox h-4 w-4"
                type="checkbox"
                id="chart"
                name="chart"
                value="chart"
              />
              <p>Chart</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <input
                className="form-checkbox h-4 w-4 "
                type="checkbox"
                id="Show Value"
                name="Show Value"
                value="Show Value"
              />
              <p>Show Value</p>
            </div>
          </div>
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
