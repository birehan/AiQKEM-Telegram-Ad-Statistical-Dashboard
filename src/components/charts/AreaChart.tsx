import React from "react";
import Plot from "react-plotly.js";

interface AreaChartProps {
  x: string[];
  y: number[];
  title: string;
  xTitle: string;
  yTitle: string;
}

const AreaChart: React.FC<AreaChartProps> = ({
  x,
  y,
  title,
  xTitle,
  yTitle,
}) => {
  return (
    <div style={{ flex: 1 }}>
      <Plot
        style={{ flex: 1 }}
        data={[
          {
            x: x,
            y: y,
            fill: "tozeroy",
            type: "scatter",
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

export default AreaChart;
