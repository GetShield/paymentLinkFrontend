import React from "react";
import { Link } from 'react-router-dom';
import { useToken } from "../providers/AuthContext";
import { useNavigate } from 'react-router-dom';

export const Navigation = (props) => {
  const { token, merchant, logout } = useToken();
  const navigate = useNavigate();
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            Shield
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/payment-link">payment-link</Link>
            </li>
            {
              (!token) ?
                <>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
                : <>
                  <li>
                    <Link>Welcome {merchant?.name}</Link>
                  </li>
                  <li onClick={() => {
                    logout();
                    navigate('/home');

                  }}>
                    <a>Log Out</a>
                  </li>
                </>

            }

          </ul>
        </div>
      </div>
    </nav>
  );
};
