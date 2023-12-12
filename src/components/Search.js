import React, { useState } from "react";
import Homepage from "../Device-Schema/Homepage";
import Delete from "../page-device/DeleteDevice";
import AgGridTable from "../page-device/AgGridTable";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

const UniversalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const allPages = [
      { pageName: "Homepage", content: Homepage },
      { pageName: "DeleteDevice", content: Delete },
      { pageName: "AgGridTable", content: AgGridTable },
    ];

    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const matchingResults = allPages
      .map((page) => {
        const lowerCaseContent = page.content.toString().toLowerCase();
        const foundIndex = lowerCaseContent.indexOf(searchTerm.toLowerCase());
        if (foundIndex !== -1) {
          const contentWithSource = lowerCaseContent.slice(
            Math.max(foundIndex - 50, 0),
            Math.min(foundIndex + 50, lowerCaseContent.length)
          );
          return { pageName: page.pageName, content: contentWithSource };
        }
        return null;
      })
      .filter((page) => page !== null); // Search for the term

    console.log(matchingResults);
    setSearchResults(matchingResults);
  };

  return (
    <div style={{ paddingRight: "20px" }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>
      {searchResults.length > 0 && <h1>RESULTS FOUND IN:</h1>}
      <div>
        {searchResults.map((result, index) => (
          <div key={index}>
            {/* <p>{result.content}</p> */}
            <Link
              to={`/${result.pageName}`}
              as={RouterLink}
              style={{ color: "blue" }}
            >
              {result.pageName}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversalSearch;
