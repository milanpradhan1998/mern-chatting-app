import React from "react";
import { useState, CSSProperties } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const LoaderPg = ({ load }) => {
  const [loading, setLoading] = useState(true);
  console.log(loading);
  //   setLoading(load);
  return (
    <>
      {loading ? (
        <ScaleLoader
          className="text-center"
          color={"#00cec9"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default LoaderPg;
