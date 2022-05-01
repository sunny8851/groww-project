import React from "react";

const LoadingLayout = ({ isLoading, child, skelton, spinLoading = false }) => {
  if (spinLoading) {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center w-screen h-screen p-4">
          <div
            style={{ borderTopColor: "transparent" }}
            className=" w-10 h-10 border-4 border-orange-500 border-solid rounded-full animate-spin"
          ></div>
        </div>
      );
    }
    return <>{child}</>;
  }

  if (isLoading && skelton) {
    return (
      <>
        <div className="items-center relative h-screen ">
          <div className="flex justify-center items-center w-scree h-screen p-4 absolute left-0 right-0 top-0 bottom-0">
            <div
              style={{ borderTopColor: "transparent" }}
              className=" w-10 h-10 border-4 border-orange-500 border-solid rounded-full animate-spin"
            ></div>
          </div>
          {skelton}
        </div>
      </>
    );
  }

  return <>{child}</>;
};

export default LoadingLayout;
