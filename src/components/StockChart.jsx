import Chart from "react-apexcharts";
import { useState } from "react";

export const StockChart = (props) => {
  const [dateFormat, setDateFormat] = useState("24h");
  console.log("props", props);

  const handleTimeFormat = () => {
    switch (dateFormat) {
      case "24h":
        return props.chartData.day;
      case "7d":
        return props.chartData.week;
      case "1y":
        return props.chartData.year;
      default:
        return props.chartData.day;
    }
  };

  const color =
    handleTimeFormat()[handleTimeFormat().length - 1].y -
      handleTimeFormat()[0].y >
    0
      ? "#26C281"
      : "#ed3419";

  const options = {
    colors: [color],
    title: {
      text: props.symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock-chart",
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        dateTimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd hh:MM",
      },
    },
  };

  const series = [
    {
      name: props.symbol,
      data: handleTimeFormat(),
    },
  ];

  const buttonSelect = (button) => {
    if (button === dateFormat) {
      return "btn m-1 btn-primary";
    } else {
      return "btn m-1 btn-outline-primary";
    }
  };

  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      <div>
        <button
          className={buttonSelect("24h")}
          onClick={() => setDateFormat("24h")}
        >
          24h
        </button>
        <button
          className={buttonSelect("7d")}
          onClick={() => setDateFormat("7d")}
        >
          7d
        </button>
        <button
          className={buttonSelect("1y")}
          onClick={() => setDateFormat("1y")}
        >
          1y
        </button>
      </div>
    </div>
  );
};
