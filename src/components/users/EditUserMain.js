import React, { useEffect, useState } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { useDispatch, useSelector } from "react-redux";
import { editDepartment, updateDepartment } from "../../redux/Slice/department";
import { editUser, updateUser } from "../../redux/Slice/user";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  theme: "colored",
};
const EditUserMain = ({ userId }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, user, success } = userLogin;

  useEffect(() => {
    if (success) {
      dispatch({ type: "user/Reset" });
      toast.success("Cập nhật thành công!");
    }
    if (!user.name || userId._id !== userId) {
      dispatch(editUser(userId));
    } else {
      setName(user.name);
    }
  }, [user, dispatch, userId, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        _id: userId,
        name,
      })
    );
  };
  return (
    <>
      <Toast />
      <section
        className="content-main"
        style={{ maxWidth: "1200px", height: "100vh" }}
      >
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Cập nhật thông tin nhân viên</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {loading && <Loading />}
                  <>
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label">
                        Tên đơn vị
                      </label>
                      <input
                        type="text"
                        placeholder="Tên đơn vị"
                        className="form-control"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditUserMain;
