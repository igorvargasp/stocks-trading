import { useEffect, useState } from "react";
import finhub from "../apis/finhub";
export const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finhub.get("/stock/profile2", {
          params: {
            symbol,
          },
        });
        if (isMounted) {
          setStockData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [symbol]);
  return (
    <div>
      {stockData && (
        <div className="row border bg-white rounded shadow-sm p-4 mt-5">
          <div className="col">
            <div>
              <span style={{ fontWeight: "bold" }}>Name: {""}</span>
              {stockData.name}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Country: {""}</span>
              {stockData.country}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Ticker: {""}</span>
              {stockData.ticker}
            </div>
          </div>
          <div className="col">
            <div>
              <span style={{ fontWeight: "bold" }}>Exchange: {""}</span>
              {stockData.exchange}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Industry: {""}</span>
              {stockData.finnhubIndustry}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>IPO: {""}</span>
              {stockData.ipo}
            </div>
          </div>
          <div className="col">
            <div>
              <span style={{ fontWeight: "bold" }}>MarketCap: {""}</span>
              {stockData.marketCapitalization}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>
                Shares Outstandig: {""}
              </span>
              {stockData.shareOutstanding}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>
                Url:
                <a href={stockData.weburl}> {stockData.weburl}</a>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
