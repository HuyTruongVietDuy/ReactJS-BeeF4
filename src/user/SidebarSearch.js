import React, { useState } from "react";
import { SearchIconClick } from "./JS Modules/UserClick";
import { Link } from "react-router-dom";

const SideBarSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(false);

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      if (query.trim() === "") {
        // If the input is empty, clear the search results and reset the search error state
        setSearchResults([]);
        setSearchError(false);
        return;
      }

      const response = await fetch(`http://localhost:4000/sanpham/listall?q=${query}`);
      const data = await response.json();

      // Filter the results based on the product name
      const filteredResults = data.filter((item) =>
        item.ten_sanpham.toLowerCase().includes(query.toLowerCase())
      );

      if (filteredResults.length === 0) {
        setSearchError(true); // Set search error state to true if no results are found
      } else {
        setSearchError(false); // Reset search error state if results are found
      }

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div id="sidebar-find">
      <span id="closeButton" onClick={SearchIconClick}>
        &times;
      </span>
      <div id="logo-find" >
          <img src="/images/SQBE Logo-grey.png" alt=""/>
      </div>
      <div className="header-side-search">
        <p>TÌM KIẾM</p>
      </div>
      <div className="main-side-search">
        <div className="box-search">
          <input
            type="text"
            placeholder="TÌM KIẾM SẢN PHẨM..."
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        <div className="box-search-result">
          {searchError && <p style={{textDecoration:"underline", textAlign:"center",margin:"20px 0"}}>Không tìm thấy sản phẩm nào.</p>}
          <table>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={index}>
                  <td id="name_price-product">
                    <Link to={`/chitietsanpham/${result.url_product}`}>
                      <span>{result.ten_sanpham}</span> <br />
                      <span>
                        {result.gia_khuyenmai ? (
                          <>
                            <del>
                              {result.gia.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </del>{" "}
                            {result.gia_khuyenmai.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </>
                        ) : (
                          result.gia.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        )}
                      </span>
                    </Link>
                  </td>
                  <td id="image-product">
                  <Link to={`/chitietsanpham/${result.url_product}`}>
                    <div className="box-image-search">
                      <img
                        src={`http://localhost:4000/chitietsanpham/${result.hinh_anh_1}`}
                        alt={result.ten_sanpham}
                      />
                    </div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SideBarSearch;
