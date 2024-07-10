import React, { useContext } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import Nf_ori from "./Net";
import { UserContext } from "../../store/context/userContext";

function Nav({isAuthenticated}) {
 const navigate = useNavigate();
 const {logout} = useContext(UserContext);
  return (
    <div className="navbar_main">
      <div className="netflix_logo">
        <div className="nav_left" >
        <img
          src="https://thewhitonline.com/wp-content/uploads/2020/09/netflix-logo.png"
          alt="neflix_logo"
          height="60px"
        />
        <div className="nav_left_menu" >
        {isAuthenticated ? ( <>
            <a  href="/dashboard" className="menu_bar">HOME</a>
            <a className="menu_bar">MOVIES</a>
            <a className="menu_bar">TV SHOWS</a>
            <a className="menu_bar">MY LIST</a>
            
            </>
          ) : (
            <>
            </>
          )}   
        </div>
        </div>
        <div className="nav_right">
          UNLIMITED TV SHOWS & MOVIES
          {isAuthenticated ? ( 
            <button className="btn_join_now" onClick={logout}>LOGOUT</button>
          ) : (
            <>
              <button className="btn_join_now">JOIN NOW</button>
              <button className="btn_sign" onClick={()=>navigate('/')}>SIGN IN</button>
            </>
          )}
        </div>
      </div>
      <div className="mt-5">
      <Nf_ori />
      </div>
    </div>
  );
}

export default Nav;

