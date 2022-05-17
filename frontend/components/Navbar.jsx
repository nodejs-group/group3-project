// import { Link } from "next/link";
import notebook from "../Styling/Images/notebook.png";

export const Navbar = () => {
  
  return (
    <header>
      <div className="logo">
        
          <img src={notebook} alt=" logo" />
        
      </div>
      <nav>
        <div>
          <ul className="nav-link">
            <li>
             
                Home
            </li>
            <li>
              Global
            </li>

            <li>
              About
            </li>
          </ul>
        </div>
      </nav>

      <div className="navBtn">
     
          <div>
          
              <button className="btn">Log In</button>
           
           
              <button className="btn">Sign Up</button>
          
          </div>
       
          <div>
            <button
           >
              Logout
            </button>
          </div>
        
      </div>
    </header>
  );
};

export default Navbar;
