import React, { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [col, setcol] = useState("text-slate-400");
  const [col1, setcol1] = useState("text-slate-400");
  console.log(col, col1);
  return (
    <div className=" w-screen h-14 flex justify-between items-center pr-2 bg-slate-500">
      <div className="">
        <Link to="/all-banks">
          <span
            onClick={() => {
              setcol("text-white");
              setcol1("text-slate-400");
            }}
            className={`${col} ml-2   hover:text-white cursor-pointer`}
          >
            All Banks
          </span>
        </Link>
        <Link to="/favorites">
          <span
            onClick={() => {
              setcol1("text-white");
              setcol("text-slate-400");
            }}
            className={`${col1} ml-2   hover:text-white cursor-pointer`}
          >
            Favorites
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
