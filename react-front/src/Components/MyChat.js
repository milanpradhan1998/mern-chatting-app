import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/chatProvider";
import { getSender, getSenderImg } from "../Config/ChatLogic";
import LoaderPg from "../Pages/LoaderPg";

const MyChat = () => {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  const [loggedUser, setLoggedUser] = useState();
  const [loading, setLoading] = useState(false);
  const [stopFetch, setStopFetch] = useState(false);
  const fetchChats = async () => {
    try {
      setLoading(true);
      let config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      let url = "/api/chats";
      let { data } = await axios.get(url, config);
      setChats(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };
  // List Selection
  const listSelection = (id) => {
    console.log(id);
    chats.map((val, ind) => {
      document.getElementById(val._id).style.backgroundColor = "#c7ecee";
    });

    document.getElementById(id).style.backgroundColor = "#00cec9";
  };
  useEffect(() => {
    if (stopFetch === false) {
      fetchChats();
    } else setStopFetch(false);
  }, [selectedChat]);

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);
  return (
    <>
      {selectedChat ? (
        // if chat selected then display this code
        <section className="d-none flex-column d-md-flex d-lg-flex bg-white col-12 col-lg-3 col-md-5 border border-1 border-dark">
          <div
            className="d-flex align-items-center justify-content-between rounded rounded-3 p-1 m-1"
            style={{ height: "10%", backgroundColor: "#dfe6e9" }}
          >
            <h3>My Chats 1</h3>
            <div>
              <button
                className=" btn btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target="#groupModal"
              >
                Crate Group <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="p-2">
            {chats.length != 0 ? (
              <>
                {chats.map((val, ind) => {
                  return (
                    <div
                      id={val._id}
                      className="hover-bg-1 d-flex p-2 mb-1"
                      style={{ backgroundColor: "#c7ecee" }}
                      key={val._id}
                      onClick={() => {
                        setStopFetch(true);
                        listSelection(val._id);
                        setSelectedChat(val);
                      }}
                    >
                      <img
                        style={{ height: "35px", width: "35px" }}
                        src={
                          val.isGroupChat == false ? (
                            getSenderImg(loggedUser, val.users)
                          ) : (
                            <>{val.chatName}</>
                          )
                        }
                      />
                      <div className="ms-1">
                        <p>
                          {val.isGroupChat == false ? (
                            getSender(loggedUser, val.users)
                          ) : (
                            <>{val.chatName}</>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <LoaderPg load={loading} />
            )}
          </div>
        </section>
      ) : (
        // if chat not selected the display this code
        <section className=" bg-white col-12 col-lg-3 col-md-5">
          <div
            className="d-flex align-items-center justify-content-between rounded rounded-3 p-1 m-1"
            style={{ height: "10%", backgroundColor: "#dfe6e9" }}
          >
            <h3>My Chats 2</h3>
            <div>
              <button
                className=" btn btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target="#groupModal"
              >
                Crate Group <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="p-2">
            {chats.length != 0 ? (
              <>
                {chats.map((val, ind) => {
                  return (
                    <div
                      id={val._id}
                      className="hover-bg-1 d-flex p-2 mb-1"
                      style={{ backgroundColor: "#c7ecee" }}
                      key={val._id}
                      onClick={() => {
                        setStopFetch(true);
                        listSelection(val._id);
                        setSelectedChat(val);
                      }}
                    >
                      <img
                        style={{ height: "35px", width: "35px" }}
                        src={
                          val.isGroupChat == false ? (
                            getSenderImg(loggedUser, val.users)
                          ) : (
                            <>{val.chatName}</>
                          )
                        }
                      />
                      <div className="ms-1">
                        <p>
                          {val.isGroupChat == false ? (
                            getSender(loggedUser, val.users)
                          ) : (
                            <>{val.chatName}</>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <LoaderPg load={loading} />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default MyChat;
