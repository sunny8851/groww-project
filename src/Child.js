import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./child.css";
import LoadingLayout from "./LoadingLayout";
const Child = () => {
  const { id } = useParams();
  const [datas, setdata] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  // const { city } = useLocation();
  const city = JSON.parse(localStorage.getItem("city"));
  console.log(city);
  // const datas = useMemo(() => data, []);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(city));
    if (!!data) {
      const bankData = data.find((el) => el.ifsc === id);
      setdata(bankData);
      setisLoading(false);
    } else {
      fetch(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`)
        .then((response) => response.json())

        .then((data) => {
          const bankData = data.find((el) => el.ifsc === id);
          setdata(bankData);
          localStorage.setItem(city, JSON.stringify(data));
          if (data.length === 0) setNotFound(true);
        })
        .then(() => setisLoading(false))
        .catch((e) => setError(true));
    }
  }, []);

  console.log(datas);
  const child = (
    <div className="h-screen bg-slate-100">
      {datas && (
        <div className="container w-2/3 border-2 border-stone-400 h-fit">
          <div className="row ">
            <p style={{ minWidth: "120px" }}>Bank Name:</p>
            <p>{datas.bank_name}</p>
          </div>
          <hr />
          <div className="row">
            <p style={{ minWidth: "120px" }}>Bank Id:</p>
            <p>{datas.bank_id}</p>
          </div>
          <hr />
          <div className="row">
            <p style={{ minWidth: "120px" }}>Bank IFSC:</p>
            <p>{datas.ifsc}</p>
          </div>
          <hr />
          <div className="row">
            <p style={{ minWidth: "120px" }}>Bank Branch:</p>
            <p>{datas.branch}</p>
          </div>
          <hr />
          <div className="row">
            <p style={{ minWidth: "120px" }}>Bank District:</p>
            <p>{datas.district}</p>
          </div>
          <hr />
          <div className="row">
            <p style={{ minWidth: "120px" }}>Bank City:</p>
            <p>{datas.city}</p>
          </div>
          <hr />
          <div className="row">
            <p style={{ minWidth: "120px" }}>Bank State:</p>
            <p>{datas.state}</p>
          </div>

          <hr />
          <div className="row">
            <p style={{ minWidth: "120px" }}>Bank Address:</p>
            <p>{datas.address}</p>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
  const skeletalLayout = (
    <div className="grid gap-8 bg-slate-100  px-2 absolute top-0 bottom-0 left-0 right-0 items-center">
      {[1].map((_, index) => (
        <div
          key={index}
          className="flex border  w-2/3 rounded-md  shadow-md flex-col items-center mx-auto animate-pulse"
        >
          <div
            style={{ backgroundColor: "rgba(50, 115, 220, 0.3)" }}
            className="w-full  h-72 border-gray-400"
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
      />
    </div>
  );
};

export default Child;
