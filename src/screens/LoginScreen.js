import React, { useEffect, useState } from "react";
import Toast from "./../components/LoadingError/Toast";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/User/userSlice";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { loginSuccess, error, loading } = userLogin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
  };
  useEffect(() => {
    if (loginSuccess) {
      history.push(redirect);
    }
  }, [loginSuccess, history, redirect]);
  return (
    <>
      <Toast />
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">Đăng nhập</h4>
          {loading && <Loading />}
          {error && <Message variant="alert-danger">{error}</Message>}
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Mật khẩu"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
