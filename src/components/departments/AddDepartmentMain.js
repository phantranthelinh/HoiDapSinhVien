import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { useDispatch, useSelector } from "react-redux";
import AddDepartment from "./../../screens/AddDepartment";
import { addDepartment } from "../../redux/Slice/department";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  theme: "colored",
};

const AddDepartmentMain = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const departments = useSelector((state) => state.departments);
  const { success, loading } = departments;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addDepartment(name));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: "department/Reset" });
      setName("");
      toast.success("Thêm mới đơn vị thành công!", ToastObjects);
    }
  }, [success, dispatch]);

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        {loading && <Loading />}
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/departments" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm đơn vị</h2>
            <div>
              <button className="btn btn-primary" type="submit">
                Thêm
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label className="form-label">Tên đơn vị</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddDepartmentMain;
