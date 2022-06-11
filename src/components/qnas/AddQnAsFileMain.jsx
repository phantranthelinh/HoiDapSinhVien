import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import CSVReader from "../CSVReaderClickAndDragUpload";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddQnAsFileMain = () => {
  const [by, setBy] = useState("");
  const [file, setFile] = useState("");
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  // const { loading, listKeywords } = useSelector((state) => state.keywords);
  const { listDepartments, loading: loadingDepartments } = useSelector(
    (state) => state.departments
  );
  const submitHander = (e) => {
    e.preventDefault();
    if (file) {
      Papa.parse(file, {
        complete: (results) => console.log("Finished:", results.data),
      });
    }
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHander} encType="multipart/form-data">
          <div className="content-header">
            <Link to="/qnas" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm câu hỏi bằng file</h2>
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
                  <a
                    href="./import_data.csv"
                    className="btn btn-success mb-4"
                    download
                  >
                    Tải file mẫu
                  </a>
                  {userInfo.role === 1 &&
                    (loadingDepartments ? (
                      <Loading />
                    ) : (
                      <div className="mb-4">
                        <select
                          name="by"
                          onChange={(e) => setBy(e.target.value)}
                          className="form-control"
                          defaultValue={"DEFAULT"}
                        >
                          <option
                            className="form-control"
                            value="DEFAULT"
                            disabled
                          >
                            - Chọn đơn vị -
                          </option>
                          {listDepartments.length > 0 &&
                            listDepartments.map((department) => {
                              return (
                                <option
                                  key={department._id}
                                  className="form-control"
                                  value={department._id}
                                >
                                  {department.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    ))}
                  <div className="mb-4">
                    {/* <CSVReader /> */}

                    <input
                      type="file"
                      className="form-control"
                      required
                      onChange={(e) => setFile(e.target.files[0])}
                    ></input>
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

export default AddQnAsFileMain;
