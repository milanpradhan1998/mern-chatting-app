import React, { useState } from "react";

const SingUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState("./images/user.png");
  // handel show
  let handelClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  let postImage = (e) => {
    setPic(e.name);
    console.log(e);
  };
  let submitForm = () => {};
  return (
    <>
      <section>
        <div className="d-flex align-items-center flex-column col-11 col-lg-6  mx-auto">
          <img
            src={pic}
            style={{
              height: "5rem",
              width: "5rem",
              borderRadius: "50%",
              border: "2px solid black",
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              postImage(e.target.files[0]);
            }}
          />
        </div>
        <div className="d-flex flex-column col-11 col-lg-6 mx-auto">
          <label className="text-start ms-1">User name</label>
          <input
            className="singup-input"
            placeholder="Enter name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
          />
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
          <form>
            <input
              className="singup-input"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={show ? "text" : "password"}
            />
          </form>

          <label className="text-start ms-1">Confirm Password</label>
          <form className="d-flex justify-content-between singup-input">
            <input
              className=" border w-75 border-0"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
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
        </div>
      </section>
      <div className="d-flex justify-content-center w-50 mx-auto my-2">
        <button className="btn green-lt-bg " onClick={submitForm}>
          Submit
        </button>
      </div>
    </>
  );
};

export default SingUp;
