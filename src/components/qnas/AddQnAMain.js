import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
};
const AddQnAMain = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState("");

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit>
          <div className="content-header">
            <Link to="/qnas" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm câu hỏi</h2>
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
                    <label className="form-label">Câu hỏi</label>
                    <textarea
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      value={question}
                      required
                      onChange={(e) => setQuestion(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Câu trả lời</label>
                    <textarea
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      value={answer}
                      required
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Thêm từ file .csv</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Inter Image URL"
                      value={file}
                      onChange={(e) => setFile(e.target.value)}
                    />
                    <input className="form-control mt-3" type="file" />
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

export default AddQnAMain;
