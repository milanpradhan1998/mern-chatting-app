import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const SideDrawer = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [sideBar, setSideBar] = useState(false);
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  // logout
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  // SIDE BAR
  const sideBarController = () => {
    setSideBar(!sideBar);
  };

  return (
    <>
      {sideBar ? (
        <div id="sideBar" className="side-bar-main bg-white">
          <div className=" d-flex justify-content-between">
            <p className="fs-5 mt-2 ms-2 fw-bold">Search User</p>
            <button
              className=" border border-0 bg-transparent"
              onClick={sideBarController}
            >
              <i className="fa-solid fa-square-xmark"></i>
            </button>
          </div>
          <hr className="bg-dark" />
          <SideBar
            closeSideBar={() => {
              sideBarController();
            }}
            user={user}
          />
        </div>
      ) : (
        <div className="side-bar-main bg-white side-bar-main-close "></div>
      )}
      <section
        className="bg-white d-flex justify-content-between align-items-center px-2"
        style={{ height: "8vh" }}
      >
        <button
          onClick={sideBarController}
          className="btn btn btn-outline-dark d-flex align-items-center p-2 side-nav-search-btn"
          // data-bs-toggle="modal"
          // data-bs-target="#exampleModal"
        >
          <i className="fa-solid fa-magnifying-glass me-lg-1"></i>
          <span className="d-none d-lg-flex">Search user</span>
        </button>
        <div>
          <h3>Let's Talk</h3>
        </div>
        {/* notification */}
        <div className="d-flex align-items-center">
          <div className="dropdown me-1">
            <button
              className="btn border border-1 border-dark dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-regular fa-bell"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
          {/* menu */}
          <div>
            <div className="dropdown">
              <button
                className="btn border border-1 border-dark p-1 dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="rounded rounded-circle border border-1 border-dark"
                  src={user.pic}
                  style={{ height: "30px", width: "30px" }}
                />
              </button>
              <ul
                className="dropdown-menu p-1"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <i className="fa-regular fa-user me-1"></i>
                  <ProfileModel children={"Profile"} />
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li style={{ cursor: "pointer" }} onClick={logoutHandler}>
                  <i className="fa-solid fa-right-from-bracket me-1"></i>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Modal --> */}
      <div
        className="modal fade "
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* PROFILE */}
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="profileModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {user.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <img
                  src={user.pic}
                  className="rounded rounded-circle border border-2 border-dark mx-auto d-block"
                  style={{ height: "8rem", width: "8rem" }}
                  alt={user.pic}
                ></img>
              </div>
              <div className="w-75 mx-auto">
                <p className="fs-4">
                  <span className=" fw-bold ">User name:</span> {user.name}
                </p>
                <p className="fs-4">
                  <span className=" fw-bold ">Email:</span> {user.email}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
