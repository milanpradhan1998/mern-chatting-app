import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState({
    head: "Alert",
    img: "./images/warning.png",
    body: "Please fill all box.",
  });

  // handel show
  let handelClick = (event) => {
    event.preventDefault();
    setShow(!show);
  };
  let submitHandler = async () => {
    setLoading(true);
    // checking the box fill or not
    if (email === undefined || password === undefined) {
      setLoading(false);
      setNotice({
        head: "Alert",
        img: "./images/warning.png",
        body: "Please fill all box.",
      });
      popNotification(); //enable notice
    } else {
      //verifying Email and Password.
      try {
        console.log(email, password, "ok");
        let { data } = await axios.post(
          "http://localhost:7700/api/user/login",
          {
            email,
            password,
          }
        );
        console.log(data);
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setNotice({
          head: "Login",
          img: "./images/success.png",
          body: "Successfully login.",
        });
        popNotification(); //enable notice
        navigate("/chats");
      } catch (err) {
        setLoading(false);
        alert(err.response.data.message);
        console.log(err);
      }
    }
  };
  let popNotification = () => {
    document.getElementById("noticePop").classList =
      "show toast position-absolute bottom-0";

    setTimeout(function () {
      document.getElementById("noticePop").classList =
        "toast position-absolute bottom-0";
    }, 3000);
  };

  return (
    <>
      {/* model notification */}
      <div
        id="noticePop"
        className="toast position-absolute bottom-0 start-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img
            src={notice.img}
            className="rounded me-2"
            style={{ height: "24px", width: "24px" }}
          />
          <strong className="me-auto">{notice.head}</strong>
          <small>Just Now</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body text-start">{notice.body}</div>
      </div>
      <section>
        <div className=" d-flex  flex-column col-11 col-lg-6 mx-auto">
          <label className="text-start ms-1">User Email</label>
          <input
            value={email}
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
              value={password}
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
            <button
              className="w-100 p-1 border border-0 green-lt-bg rounded rounded-3 text-white"
              onClick={submitHandler}
            >
              {loading == false ? (
                <>Login</>
              ) : (
                <>
                  <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
              )}
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
