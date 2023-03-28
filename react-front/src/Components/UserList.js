import React from "react";

const UserList = ({ user, handelFunction }) => {
  return (
    <div
      onClick={() => {
        handelFunction();
      }}
      className="hover-bg-1 d-flex justify-content-between align-items-center p-1 rounded-3  mx-2 mb-1"
      style={{ backgroundColor: "#b8e994", cursor: "default" }}
    >
      <div>
        <img
          className="me-1 border border-2 border-white rounded rounded-circle "
          src={user.pic}
          style={{ height: "2.5rem", width: "2.5rem" }}
        />
      </div>
      <div style={{ width: "180px", flexWrap: "wrap" }}>
        <p className=" fw-bold">{user.name}</p>
        <p>{user.email}</p>
      </div>
      <div>
        <button className="border border-0 bg-transparent">
          <i className="fa-regular fa-comment-dots fs-3"></i>
        </button>
      </div>
    </div>
  );
};

export default UserList;
