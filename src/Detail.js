import React, { useEffect, useState } from "react";
import { Child } from "./Child";
import "./child.css";
import nodata from "../src/images/nodata.webp";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import LoadingLayout from "./LoadingLayout";
const Detail = (itemsPerPage) => {
  const [num, setnum] = useState(10);
  const [datas, setdata] = useState([]);
  const navigate = useNavigate();
  const City = ["DELHI", "MUMBAI", "DEHRADUN", "BENGALURU", "PUNE"];
  const [SelectedCity, setSelectedCity] = useState(City[0]);
  const [SearchData, setSearchData] = useState([]);
  const [local, setlocal] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const DetailDropdown = ["Bank Name", "IFSC", "Branch"];
  const [SelectedDetailDropdown, setSelectedDetailDropdown] = useState(
    DetailDropdown[0]
  );
  localStorage.setItem("city", JSON.stringify(SelectedCity));
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(SelectedCity.toString()));
    setisLoading(true);
    if (!!data) {
      setdata(data);
      setSearchData(data);
      setisLoading(false);
    } else {
      fetch(`https://vast-shore-74260.herokuapp.com/banks?city=${SelectedCity}`)
        .then((response) => response.json())
        .then((json) => {
          localStorage.setItem(SelectedCity.toString(), JSON.stringify(json));
          setdata(json);
          setSearchData(json);
        })
        .then(() => setisLoading(false));
    }
  }, [SelectedCity, local]);
  useEffect(() => {
    setlocal(1);
  }, []);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [name, setname] = useState("");
  const bookmarkData = !!JSON.parse(window.localStorage.getItem("favorites"))
    ? JSON.parse(window.localStorage.getItem("favorites"))
    : [];
  const [bookMarked, setBookmarked] = useState(bookmarkData);
  console.log(currentItems);
  useEffect(() => {
    const endOffset = itemOffset + num;
    {
      SearchData && setCurrentItems(SearchData.slice(itemOffset, endOffset));
    }
    {
      num > 0 && SearchData && setPageCount(Math.ceil(SearchData.length / num));
    }
  }, [itemOffset, num, SearchData]);
  console.log(SelectedCity);
  useEffect(() => {
    if (SelectedDetailDropdown === DetailDropdown[1]) {
      setSearchData(
        datas.filter((el) => el.ifsc.toLowerCase().includes(name.toLowerCase()))
      );
    } else if (SelectedDetailDropdown === DetailDropdown[0]) {
      setSearchData(
        datas.filter((el) =>
          el.bank_name.toLowerCase().includes(name.toLowerCase())
        )
      );
    } else if (SelectedDetailDropdown === DetailDropdown[2]) {
      {
        setSearchData(
          datas.filter((el) =>
            el.branch.toLowerCase().includes(name.toLowerCase())
          )
        );
      }
    }
  }, [name]);
  console.log(SearchData);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * num) % SearchData.length;
    setItemOffset(newOffset);
  };

  const handleRemoveBookmark = (data) => {
    const favorites = JSON.parse(window.localStorage.getItem("favorites"));
    if (!!favorites) {
      if (favorites.some((el) => el.ifsc == data.ifsc)) {
        const updated = favorites.filter((el) => el.ifsc != data.ifsc);
        window.localStorage.setItem("favorites", JSON.stringify(updated));
        setBookmarked(updated);
      }
    }
  };

  const handleAddBookmark = (data) => {
    const favorites = JSON.parse(window.localStorage.getItem("favorites"));
    if (!!favorites) {
      if (!favorites.some((el) => el.ifsc == data.ifsc)) {
        const updated = [data, ...favorites];
        window.localStorage.setItem("favorites", JSON.stringify(updated));
        setBookmarked(updated);
      }
    } else {
      const newData = [data];
      window.localStorage.setItem("favorites", JSON.stringify(newData));
      setBookmarked(newData);
    }
  };
  const child = (
    <div className="relative ">
      <div
        style={{
          maxWidth: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        className="  items-center"
      >
        <div className="flex justify-center mt-2 top">
          <div className=" border-2 items-center  mr-2 cursor-pointer">
            <select
              className="w-36 h-9 items-center cursor-pointer "
              defaultValue={SelectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setisLoading(true);
                localStorage.setItem("city", JSON.stringify(SelectedCity));
              }}
            >
              {City.map((option) => (
                <option className=" " SelectedCity={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="border-2 items-center cursor-pointer ">
            <select
              className="w-36 h-9 items-center cursor-pointer  "
              defaultValue={SelectedDetailDropdown}
              onChange={(e) => setSelectedDetailDropdown(e.target.value)}
            >
              {DetailDropdown.map((option) => (
                <option className=" " SelectedDetailDropdown={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="ml-2">
            <input
              className="border-2 h-10 w-60  border-slate-400"
              placeholder="Search"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <table
          style={{
            maxWidth: "1200px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className="relative"
        >
          <tr
            className=" text-left mb-5  h-10 "
            style={{
              boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.5)",
            }}
          >
            <th className="pl-2">Bank</th>
            <th className="pl-7">IFSC</th>
            <th className="pl-7">Branch</th>
            <th className="pl-5">Bank_Id</th>
            <th className="pl-7">Address</th>
          </tr>
          {currentItems.length < 1 && (
            <tr>
              <img
                style={{
                  maxWidth: "600px",
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
                  backgroundColor: "#f4f6fb",
                  fontFamily: "Mukta,sans-serif",
                  fontSize: "13px",
                }}
                className="  border-2 h-9 "
              >
                <td
                  onClick={() => navigate(`/bank-details/${m.ifsc}`)}
                  style={{
                    maxWidth: "260px",
                    paddingLeft: "3px",
                    cursor: "pointer",
                    color: "black",
                    fontWeight: "600",
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
                {bookmarkData.some((el) => el.ifsc == m.ifsc) ? (
                  <HeartFilled
                    onClick={() => handleRemoveBookmark(m)}
                    style={{
                      fontSize: "15px",
                      color: "hotpink",
                      padding: "10px",
                    }}
                  />
                ) : (
                  <HeartOutlined
                    onClick={() => handleAddBookmark(m)}
                    style={{
                      fontSize: "15px",
                      color: "hotpink",
                      padding: "10px",
                    }}
                  />
                )}
              </tr>
            ))}
          <div className="flex absolute right-0 pb-5 items-center">
            {datas.length > 0 && <label>Rows per page:</label>}
            {datas.length > 0 && (
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
  const skeletalLayout = (
    <div className="grid gap-8   px-2 absolute top-0 bottom-0 left-0 right-0 items-center">
      {[1].map((_, index) => (
        <div
          key={index}
          className="flex border  w-3/4 rounded-md  shadow-md flex-col items-center mx-auto animate-pulse"
        >
          <div
            style={{ backgroundColor: "rgba(50, 115, 220, 0.3)" }}
            className="w-full  h-96 border-gray-400"
          />
          <div
            style={{ backgroundColor: "rgba(50, 115, 220, 0.3)" }}
            className="py-8 w-full bg-gray-300"
          />
        </div>
      ))}
    </div>
  );
  return (
    <div>
      <LoadingLayout
        skelton={skeletalLayout}
        child={child}
        isLoading={isLoading}
        // spinLoading={true}
      />
    </div>
  );
};

export default Detail;
