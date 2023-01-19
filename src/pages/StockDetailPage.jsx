import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import finhub from "../apis/finhub";
import { StockChart } from "../components/StockChart";
import { StockData } from "../components/StockData";
const formatData = (data) => {
  if (data) {
    return data.t.map((el, index) => {
      return {
        x: el * 1000,
        y: Math.floor(data.c[index]),
      };
    });
  } else {
    return;
  }
};

export const StockDetailPage = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDay;
      if (date.getDate() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDate() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;

      const response = await Promise.all([
        finhub.get("/stock/candle", {
          params: {
            symbol: symbol,
            from: oneDay,
            to: currentTime,
            resolution: 30,
          },
        }),
        finhub.get("/stock/candle", {
          params: {
            symbol: symbol,
            from: oneWeek,
            to: currentTime,
            resolution: 60,
          },
        }),
        finhub.get("/stock/candle", {
          params: {
            symbol: symbol,
            from: oneYear,
            to: currentTime,
            resolution: "W",
          },
        }),
      ]);

      setChartData({
        day: formatData(response[0].data),
        week: formatData(response[1].data),
        year: formatData(response[2].data),
      });
      console.log("chart", chartData);
    };
    fetchData();
  }, [symbol]);
  return (
    <div>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockData symbol={symbol} />
        </div>
      )}
    </div>
  );
};
