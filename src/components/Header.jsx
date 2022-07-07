import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/Slice/user";

const headerNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Thông tin",
    path: "/about",
  },
  {
    display: "Q&A",
    path: "/qna",
  },
  {
    display: "Đăng nhập",
    path: "/login",
  },
];
const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const active = headerNav.findIndex((e) => e.path === pathname);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  if (userInfo) {
    headerNav.pop();
    headerNav.push({
      display: "Đăng xuất",
    });
  }

  const clickHandler = (path) => {
    if (path) {
      navigate(path);
    } else {
      dispatch(logout());
    }
  };

  return (
    <>
      <div className="header" ref={headerRef}>
        <div className="header-container">
          <div className="header-logo">
            <img src="images/logo.gif" alt="ada" className="header-logo" />
          </div>
          <ul className="menu">
            {headerNav.length > 0 &&
              headerNav.map((item, i) => {
                return (
                  <li
                    className={`menu-item ${i === active ? "active" : ""}`}
                    key={i}
                  >
                    <div
                      className="menu-link"
                      onClick={() => clickHandler(item.path)}
                    >
                      {item.display}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
