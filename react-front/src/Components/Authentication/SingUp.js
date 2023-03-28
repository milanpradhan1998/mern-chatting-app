import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SingUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState("./images/user.png");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState({
    head: "Alert",
    img: "./images/warning.png",
    body: "Please fill all box.",
  });
  // handel show
  let handelClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  let postImage = async (pics) => {
    setLoading(true);
    if (pics === undefined) {
      alert("Please select an Image");
      return;
    }
    if (
      (pics.type === "image/jpeg" ||
        pics.type === "image/png" ||
        pics.type === "image/jpg") &&
      pics.size <= 150000
    ) {
      const newData = new FormData();
      newData.append("file", pics);
      newData.append("upload_preset", "chat-app");
      newData.append("cloud_name", "dmf3wy6he");
      try {
        let { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/dmf3wy6he/image/upload",
          newData
        );
        console.log(pics);
        setPic(data.url);
        setLoading(false);
      } catch (error) {
        alert(error);
        setLoading(false);
      }
    } else {
      alert("Please select an Image. Image size under 150kb.");
      setLoading(false);
      return;
    }
  };
  let submitForm = async () => {
    setLoading(true);

    if (
      name == undefined ||
      email == undefined ||
      password == undefined ||
      confirmPassword == undefined
    ) {
      alert("Please fill all box.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setLoading(false);
      alert("Confirm Password not match!");
      return;
    }
    try {
      let { data } = await axios.post("/api/user", {
        name,
        email,
        password,
        pic,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      alert("You are successfully login.");
      navigate("/chats");
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

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
          <label
            className="border border-2 border-dark p-1 mt-1 rounded rounded-3"
            htmlFor="imageInput"
          >
            <i className="fa-solid fa-camera fs-5  me-2"></i>
            Profile Image
            <input
              className="d-none"
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={(e) => {
                postImage(e.target.files[0]);
              }}
            />
          </label>
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
          {loading == false ? (
            <>SingUp</>
          ) : (
            <>
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default SingUp;
