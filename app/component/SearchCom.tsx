import { useState } from "react";
import SearchResults from "./SearchResults";

 function SearchCom() {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const input = document.getElementById("searchInput") as HTMLInputElement;
    setQuery(input.value);
  };

  return (
    <div className="container mt-4">
      <form className="d-flex mb-3" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          id="searchInput"
          placeholder="Search NASA Images"
          aria-label="Search"
        />
        <button className="btn btn-outline-light" type="submit">
          Search
        </button>
      </form>

      <SearchResults query={query} />
    </div>
  );
}

export default SearchCom;