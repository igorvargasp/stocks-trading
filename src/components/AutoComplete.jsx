import { useState, useEffect, useContext } from "react";
import finnhub from "../apis/finhub";
import { WatchListContext } from "../context/watchListContext";
export const AutoComplete = () => {
  const { addStock, deleteStock } = useContext(WatchListContext);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnhub.get("/search", {
          params: {
            q: search,
          },
        });
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (error) {}
    };

    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);

  const renderDropdown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul
        style={{ height: "500px", overflowY: "scroll", overflowX: "hidden" }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {results.map((result) => {
          return (
            <li
              key={results.symbol}
              className="dropdown-item"
              onClick={() => {
                addStock(result.symbol);
                setSearch("");
              }}
            >
              {result.description}({result.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145,158,1171,0.04)" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="search"
          autoCorrect="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};
