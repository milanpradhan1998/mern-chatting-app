import React from "react";
import { ChatState } from "../Context/chatProvider";

const ChatBox = () => {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  return (
    <>
      {selectedChat ? (
        <section className=" d-flex bg-white col-12 col-lg-8 col-md-7">
          <div>
            <button
              onClick={() => {
                setSelectedChat();
              }}
            >
              Back
            </button>
            <h1>This is Chat Box 1</h1>
          </div>
        </section>
      ) : (
        <section className="d-none d-md-flex d-lg-flex bg-white col-12 col-lg-8 col-md-7">
          <div>
            <h1>This is Chat Box 2</h1>
          </div>
        </section>
      )}
    </>
  );
};

export default ChatBox;
