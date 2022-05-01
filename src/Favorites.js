import React, { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import nodata from "../src/images/nodata.webp";
import "./child.css";
import { HeartFilled } from "@ant-design/icons";

const Favorites = ({ itemsPerPage }) => {
  const navigate = useNavigate();
  const [num, setnum] = useState(10);
  const options = ["DELHI", "MUMBAI", "HARYANA", "BENGALURU", "BIHAR"];
  const [value, setvalue] = useState(options[0]);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const bookmarkData = !!JSON.parse(window.localStorage.getItem("favorites"))
    ? JSON.parse(window.localStorage.getItem("favorites"))
    : [];

  useEffect(() => {
    const endOffset = itemOffset + num;
    setCurrentItems(bookmarkData.slice(itemOffset, endOffset));
    {
      num > 0 && setPageCount(Math.ceil(bookmarkData.length / num));
    }
  }, [itemOffset, num, bookmarkData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * num) % bookmarkData.length;
    setItemOffset(newOffset);
  };

  const handleRemoveBookmark = (data) => {
    const favorites = JSON.parse(window.localStorage.getItem("favorites"));
    if (!!favorites) {
      if (favorites.some((el) => el.ifsc === data.ifsc)) {
        const updated = favorites.filter((el) => el.ifsc !== data.ifsc);
        window.localStorage.setItem("favorites", JSON.stringify(updated));
        // setBookmarked(updated);
      }
    }
  };

  return (
    <div className="relative">
      <div className="mt-10">
        <table
          style={{
            maxWidth: "1200px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className="relative top-12"
        >
          <tr
            className=" text-left mb-5  h-10 "
            style={{
              boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.5)",
            }}
          >
            <th>Bank</th>
            <th className="pl-7">IFSC</th>
            <th className="pl-7">Branch</th>
            <th className="pl-5">Bank_Id</th>
            <th className="pl-7">Address</th>
          </tr>

          {currentItems.length < 1 && (
            <tr>
              <img
                style={{
                  maxWidth: "800px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className=" h-96  bg-slate-100 mt-2 m-0 justify-center"
                src={nodata}
              ></img>
            </tr>
          )}
          {num > 0 &&
            currentItems &&
            currentItems.map((m) => (
              <tr
                style={{
                  // backgroundColor: "#f4f6fb",
                  fontFamily: "Mukta,sans-serif",
                  fontSize: "13px",
                }}
                className="  border-2 h-9 "
              >
                <td
                  onClick={() => navigate(`/child/${value}/${m.ifsc}`)}
                  style={{
                    maxWidth: "260px",
                    paddingLeft: "3px",
                    cursor: "pointer",
                  }}
                >
                  {m.bank_name}
                </td>
                <td className="pl-7">{m.ifsc}</td>
                <td className="pl-7" style={{ maxWidth: "200px" }}>
                  {m.branch}
                </td>
                <td className="pl-5">{m.bank_id}</td>
                <td className="pl-7" style={{ maxWidth: "550px" }}>
                  {m.address}
                </td>
                <HeartFilled
                  onClick={() => handleRemoveBookmark(m)}
                  style={{
                    fontSize: "15px",
                    color: "hotpink",
                    padding: "10px",
                  }}
                />
              </tr>
            ))}
          <div className="flex absolute right-0 pb-5 items-center">
            {bookmarkData.length > 0 && <label>Rows per page:</label>}
            {bookmarkData.length > 0 && (
              <input
                className="border-2 w-12 h-8 mr-8 mt-1 ml-1"
                onChange={(e) => setnum(e.target.value)}
                value={num}
                minLength={1}
                maxLength={3}
              />
            )}
            {num > 0 && (
              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                activeClassName="  w-7  justify-center bg-gray-400  text-center item-center"
                pageCount={pageCount}
                previousLabel="<"
                containerClassName="paginationbtn flex gap-4   mt-2 from-neutral-500  text-xs pt-0.5 mb-0"
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        </table>
        <div></div>
      </div>
    </div>
  );
};

export default Favorites;
