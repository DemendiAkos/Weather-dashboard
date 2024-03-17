import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration, ChartTypeRegistry } from "chart.js/auto";

interface Props {
  temps: number[];
}

function LineChart(props: Props) {
  const chartContainerRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart<keyof ChartTypeRegistry, number[]> | null>(
    null
  );

  useEffect(() => {
    const ctx = chartContainerRef.current?.getContext("2d");
    if (!ctx) return;

    const data = {
      labels: props.temps,
      datasets: [
        {
          label: "My Dataset",
          data: props.temps,
          borderColor: "#EC6E4C",
          borderWidth: 3,
          fill: false,
          tension: 0.6,
          // pointRadius: 0,
          // pointHoverRadius: 0,
        },
      ],
    };

    const options: ChartConfiguration["options"] = {
      aspectRatio: 10,
      scales: {
        y: {
          display: false,
        },
        x: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },

        filler: {
          propagate: true,
        },
      },
    };

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: data,
      options: options,
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [props.temps]);

  return (
    <canvas
      id="myChart"
      className="w-full h-full min-w-full"
      ref={chartContainerRef}
    ></canvas>
  );
}

export default LineChart;
