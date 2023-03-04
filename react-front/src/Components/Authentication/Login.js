import React, { useState } from "react";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // handel show
  let handelClick = (event) => {
    event.preventDefault();
    setShow(!show);
  };
  let postImage = () => {};

  return (
    <>
      <section>
        <div className=" d-flex  flex-column col-11 col-lg-6 mx-auto">
          <label className="text-start ms-1">User Email</label>
          <input
            className="singup-input"
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
          />
          <label className="text-start ms-1">Password</label>

          <form className="d-flex justify-content-between singup-input">
            <input
              className="border w-75 border-0"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={show ? "text" : "password"}
              style={{ outline: "none" }}
            />
            <button
              className=" border border-0 green-lt-bg rounded rounded-3 text-white"
              onClick={handelClick}
            >
              {show ? "Hide" : "Show"}
            </button>
          </form>
          <div className="mt-2 w-100 ">
            <button className="w-100 p-1 border border-0 green-lt-bg rounded rounded-3 text-white">
              Login
            </button>
          </div>
          <div className="mt-2 w-100 ">
            <button
              className="w-100 p-1 border border-0 bg-warning rounded rounded-3 text-white"
              onClick={() => {
                setEmail("guestuser@email.com");
                setPassword("12345678");
              }}
            >
              Guest User
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
