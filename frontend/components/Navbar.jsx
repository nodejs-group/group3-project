// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "./Styling/Navbar.css";
// import notebook from "./Styling/Images/notebook.png";
import Styles from "../styles/Navbar.module.css"
// import postContext from "../context/post/PostState";
import { useContext, useEffect } from "react";

export const Navbar = () => {
  // let location = useLocation();
  // let navigate = useNavigate();

  // // useEffect(() => {
  // //   console.log(location.pathname);
  // // }, [location]);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  // const context = useContext(postContext);
  // const { fetchPost } = context;
  // console.log(context);

useEffect(() => {
const data = fetch("http://localhost:5000/api/v1/posts/");
console.log(data);
  
});

  
  return (
    <header className={Styles.head}>
      <div className={Styles.bannerContainer}>
      <div className={Styles.banner}>
        {" "}
        <h1>Socialley</h1>
      </div>

      </div>
      <nav className={Styles.navbar}>
        <div>
          <ul className={Styles.navlink}>
            <li>Home</li>

            <li>About</li>
          </ul>
        </div>
      </nav>

      {/* <div className="navBtn">
        {!localStorage.getItem("token") ? (
          <div>
            <Link to="/login">
              <button className="btn">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        ) : (
          <div>
            <button
              className="btn"
              style={{ margin: "5px 67px" }}
              onClick={handleLogout}
            >
              Logout
            </button>
        //   </div> */}
      {/* // )} */}
      {/* </div> */}
    </header>
  );
};

export default Navbar;
