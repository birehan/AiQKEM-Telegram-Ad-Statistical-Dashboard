import React from "react";
import Plot from "react-plotly.js";

interface PieChartProps {
  labels: string[];
  values: number[];
  title: string;
  xTitle: string;
  yTitle: string;
}

const PieChart: React.FC<PieChartProps> = ({
  labels,
  values,
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
            labels: labels,
            values: values,
            type: "pie",
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

export default PieChart;
