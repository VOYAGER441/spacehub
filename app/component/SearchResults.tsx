/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchResults.module.css";
import services from "../services";
import * as Interface from "@/app/interface/NASAData.interface";

const SearchResults: React.FC<Interface.IProps> = ({ query }) => {
  const [results, setResults] = useState<Interface.INasaSearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    services.NASAAPIService.getSearchResult(query)
      .then((data) => {
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          console.error("Unexpected API response:", data);
          setResults([]);
        }
      })
      .catch((err) => {
        console.error("API Fetch Error:", err);
        setError("Failed to load data.");
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="container mt-3">
      {loading && <p style={{color:"grey"}}>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && results.length === 0 && !error && <p style={{color:"grey"}}>No results found</p>}

      <div className="row">
        {results.map((item) => (
          <div className="col-md-4 col-sm-6 mb-3" key={item.data[0].nasa_id}>
            <div className={`card ${styles.card}`}>
              {item.links && (
                <img
                  src={item.links[0].href}
                  className={`card-img-top ${styles.image}`}
                  alt={item.data[0].title}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{item.data[0].title}</h5>
                <p className="card-text">
                  {item.data[0].description
                    ? item.data[0].description.substring(0, 100)
                    : "No description available"}
                  ...
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => router.push(`/media-display?href=${encodeURIComponent(item.href)}`)}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
