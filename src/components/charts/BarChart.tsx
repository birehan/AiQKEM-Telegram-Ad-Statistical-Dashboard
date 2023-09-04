import React from "react";
import Plot from "react-plotly.js";

interface BarChartProps {
  x: string[];
  y: number[];
  title: string;
  xTitle: string;
  yTitle: string;
}

const BarChart: React.FC<BarChartProps> = ({ x, y, title, xTitle, yTitle }) => {
  return (
    <div style={{ flex: 1 }}>
      <Plot
        style={{ flex: 1 }}
        data={[
          {
            x: x,
            y: y,
            type: "bar",
          },
        ]}
        layout={{
          title: title,
          xaxis: { title: xTitle },
          yaxis: { title: yTitle },
          height: 400,
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default BarChart;
