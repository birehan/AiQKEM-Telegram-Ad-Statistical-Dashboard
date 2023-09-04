import Plot from "react-plotly.js";

const DataTableView = ({ headers, cells }) => {
  return (
    <div className="mx-auto">
      <Plot
        data={[
          {
            type: "table",

            header: {
              values: headers,
              align: "center",
              line: { width: 1, color: "black" },
              fill: { color: "grey" },
              font: { family: "Arial", size: 14, color: "white" },
            },
            cells: {
              values: cells,
              align: "center",
              line: { color: "black", width: 1 },
              font: { family: "Arial", size: 12, color: ["black"] },
            },
          },
        ]}
        layout={{
          title: "Data Table",
          // height: 400,
        }}
      />
    </div>
  );
};

export default DataTableView;
