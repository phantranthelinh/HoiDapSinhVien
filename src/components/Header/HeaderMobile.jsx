// import React from "react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose, GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Slice/user";

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

function HeaderMobile() {
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState(null);

  const { userInfo } = useSelector((state) => state.userLogin);

  if (userInfo) {
    headerNav.pop();
    headerNav.push({
      display: userInfo.name,
    });
  }
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const liRef = useRef(null);
  useEffect(() => {
    if (liRef.current) {
      const li = liRef.current.querySelectorAll(".item > .top");
      li.forEach((item) =>
        item.addEventListener("click", function (e) {
          const mega = e.target.nextElementSibling;

          mega.style.height = `${mega.scrollHeight}px`;
          mega.classList.toggle("active");
          if (!mega.classList.contains("active")) {
            mega.style.height = "0px";
          }
        })
      );
    }
  }, [active]);
  const clickHandler = (path) => {
    if (path) {
      navigate(path);
    } else {
      dispatch(logout());
    }

    setShowMenu(false);
  };
  return (
    <>
      <div className="header-main">
        <div className="header-logo">
          <img src="images/logo.gif" alt="ada" className="header-logo" />
        </div>
        <button className="butn" onClick={() => setShowMenu(true)}>
          <GiHamburgerMenu />
        </button>
      </div>
      <div className={`menu-main ${showMenu ? "show" : ""}`}>
        <ul className="menu-main__content">
          {headerNav.length > 0 &&
            headerNav.map((item, i) => {
              return (
                <li key={item.display} className={"menu-text"}>
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
        <button className="butn-close" onClick={() => setShowMenu(false)}>
          <GrClose />
        </button>
      </div>
    </>
  );
}

export default HeaderMobile;
