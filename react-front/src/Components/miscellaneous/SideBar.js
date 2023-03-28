import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import axios from "axios";
import UserList from "../UserList";
import LoaderPg from "../../Pages/LoaderPg";

const SideBar = ({ user, closeSideBar }) => {
  const { setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const handelSearch = async (value) => {
    if (value == "") {
      setUserList([]);
      return;
    } else {
      try {
        setLoading(true);
        console.log(value);
        let config = {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        };
        let url = `/api/user?search=${value}`;
        let { data } = await axios.get(url, config);

        setUserList(data);
        setLoading(false);
      } catch (error) {
        alert(error.message);
      }
    }
  };
  // ON CLICK ACCESS CHAT WITH USER
  const accessChat = async (userId) => {
    try {
      setLoading(true);
      let config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };
      let url = "/api/chats/";
      let { data } = await axios.post(url, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) {
        setSelectedChat([data, ...chats]);
      }
      setSelectedChat(data);
      setLoading(false);
      closeSideBar();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className=" text-white w-100  d-flex justify-content-center">
        <input
          onChange={(e) => {
            let { value } = e.target;
            setSearch(value);
          }}
          className=" w-75 p-1 fs-6"
          style={{ borderRadius: "1rem", outline: "none" }}
          placeholder="search user"
          type="search"
        />
        <button
          className=" ms-1 rounded rounded-circle border-0 hover-bg-1"
          style={{ height: "35px", width: "35px" }}
          onClick={() => {
            handelSearch(search);
          }}
        >
          <i className="fa-brands fa-searchengin"></i>
        </button>
      </div>
      <div data-bs-spy="scroll" className="mt-2  searched-user-list">
        {/* CARD 1 */}
        {loading ? (
          <LoaderPg load={loading} />
        ) : userList.length != 0 ? (
          userList.map((val, ind) => {
            return (
              <UserList
                closeSideBar={closeSideBar}
                key={val._id}
                user={val}
                handelFunction={() => {
                  accessChat(val._id);
                }}
              />
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default SideBar;
