import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/Slice/user";
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  const [mssv, setMSSV] = useState("");
  const [password, setPassword] = useState("");

  const [data, setData] = useState([]);

  const { loginSuccess } = useSelector((state) => state.userLogin);

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(mssv, password));
  };
  useEffect(() => {
    if (loginSuccess) {
      navigate("/");
    }
  }, [dispatch, loginSuccess, navigate]);
  return (
    <>
      {/* <Header /> */}
      <div className="form">
        <form onSubmit={submitHandler} className="form-done">
          <span className="span-login">Đăng nhập</span>
          <HiOutlineUserCircle className="icon-login" />
          <div className="form-group first">
            <div className="icon-left">
              <FiUser />
            </div>
            <input
              type="text"
              placeholder="Nhập MSSV của bạn"
              onChange={(e) => setMSSV(e.target.value)}
            />
          </div>
          <div className="form-group first">
            <div className="icon-left">
              <RiLockPasswordLine />
            </div>
            <input
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group sub">
            <input type="submit" value="Đăng nhập" />
            <div className="arrow-right">
              <AiOutlineArrowRight />
            </div>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
