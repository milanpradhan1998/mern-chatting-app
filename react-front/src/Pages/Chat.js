import React, { useEffect, useState } from "react";
import ChatBox from "../Components/ChatBox";
import MyChat from "../Components/MyChat";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/chatProvider";

function Chat() {
  const { user } = ChatState();
  return (
    <>
      <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <div
          className="d-flex justify-content-around py-1  mt-1 mx-auto"
          style={{ width: "98%", height: "90vh" }}
        >
          {user && <MyChat />}
          {user && <ChatBox />}
        </div>
      </div>
      {/* <!-- CREATE GROUP Modal --> */}
      <div
        className="modal fade"
        id="groupModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className=" modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Group Chat
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group flex-nowrap mb-2">
                <span className="input-group-text" id="addon-wrapping">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Group name"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </div>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">
                  @
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Users"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success">
                Add <i className="fa-solid fa-plus"></i>
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Chat;
