import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getListQnAs } from "../../redux/Slice/qna";
import Loading from "./../LoadingError/Loading";
import Message from "./../LoadingError/Error";

const MainQnAs = () => {
  const dispatch = useDispatch();

  const qnas = useSelector((state) => state.qnas);

  const { listQnAs, loading, error } = qnas;

  useEffect(() => {
    dispatch(getListQnAs());
  }, [dispatch]);

  const handleDelete = () => {};
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách câu hỏi</h2>
        <div>
          <Link to="/add-qna" className="btn btn-primary">
            Thêm mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Thể loại</option>
                <option>Electronics</option>
                <option>Clothings</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          <div className="row gx-3 py-3 ">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <>
                {listQnAs.length > 0 &&
                  listQnAs.map((qna) => {
                    return (
                      <div key={qna._id} className="col-lg-4 col-md-6 me-8 ">
                        <div className="card card-user shadow-sm">
                          <div className="card-body">
                            <h5 className="card-title mt-5">{qna.question}</h5>
                            <div className="row">
                              <Link
                                to={`/department/${qna._id}/edit`}
                                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                              >
                                <i className="fas fa-pen"></i>
                              </Link>
                              <div
                                onClick={() => handleDelete(qna._id)}
                                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </div>
                            </div>
                            <div className="card-text text-muted">
                              {/* <p className="m-0">Role:</p> */}
                              {/* <p>
                                  <a href={`mailto:`}>Email</a>
                                </p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainQnAs;
