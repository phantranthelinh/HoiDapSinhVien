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
];
const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const active = headerNav.findIndex((e) => e.path === pathname);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  let navigate = useNavigate();

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
            {userInfo ? (
              <li className={`menu-item `}>
                <div class="dropdown">
                  <div className="menu-link">
                    <button
                      class="menu-link"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {userInfo.name}
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div
                        class="dropdown-item"
                        onClick={() => dispatch(logout())}
                      >
                        Đăng xuất
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <li className={`menu-item `}>
                <div className="menu-link">Đăng nhập</div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
