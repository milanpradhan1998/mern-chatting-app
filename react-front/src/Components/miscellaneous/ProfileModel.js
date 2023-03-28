import React from "react";

const ProfileModel = ({ user, children }) => {
  return (
    <>
      {children ? (
        <span
          style={{ cursor: "pointer" }}
          data-bs-toggle="modal"
          data-bs-target="#profileModal"
        >
          {children}
        </span>
      ) : (
        <button data-bs-toggle="modal" data-bs-target="#profileModal">
          <i className="fa-regular fa-eye"></i>
        </button>
      )}
    </>
  );
};

export default ProfileModel;
