import React from "react";
import Login from "../Components/Authentication/Login";
import SingUp from "../Components/Authentication/SingUp";
import Footer from "./footer";

function Home() {
  return (
    <>
      <section className="container-fluid mt-3 d-flex justify-content-center  home-box">
        <div className="col-12 col-lg-5 text-center  p-2 rounded rounded-3">
          <div className="fs-2 text-white bg-info rounded rounded-3 work-sans fw-bold">
            <p>Let's Talk Live</p>
          </div>
          <div
            className="bg-white rounded rounded-2 p-1"
            style={{ height: "65vh" }}
          >
            <ul
              className="nav nav-pills mb-3 d-flex justify-content-center w-75 mx-auto"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item w-50 " role="presentation ">
                <button
                  className="nav-link active w-75 ms-auto rounded rounded-3"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Login
                </button>
              </li>
              <li className="nav-item w-50 " role="presentation">
                <button
                  className="nav-link w-75 me-auto rounded rounded-3"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Sing up
                </button>
              </li>
            </ul>
            <div className="tab-content " id="pills-tabContent">
              <div
                className="tab-pane fade show active "
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <Login />
              </div>
              <div
                className="tab-pane fade "
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <SingUp />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
