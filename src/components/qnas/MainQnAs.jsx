import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { deleteQnA, getListQnAs } from '../../redux/Slice/qna'
import Loading from '../LoadingError/Loading'
import Message from '../LoadingError/Error'
import { toast } from 'react-toastify'
import { ToastObjects } from './../newquestions/MainMessage'
import Toast from './../LoadingError/Toast'
import { useState } from 'react'

const MainQnAs = () => {
  const dispatch = useDispatch()
  const [inputSearch, setInputSearch] = useState('')
  let { search } = useLocation()
  const page = search.split('?page=')[1]
  const qnas = useSelector((state) => state.qnas)
  const { data, loading, error, deleteQnAsuccess } = qnas

  useEffect(() => {
    if (deleteQnAsuccess) {
      toast.success('Xóa thành công', ToastObjects)
      dispatch({ type: 'qna/Reset' })
    }
    dispatch(getListQnAs(page, inputSearch))
  }, [dispatch, page, deleteQnAsuccess, inputSearch])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteQnA(id))
    }
  }
  return (
    <>
      <Toast />
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
                  onChange={(e) => setInputSearch(e.target.value)}
                  placeholder="Tìm kiếm"
                  className="form-control p-2"
                />
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
                  {data.QAs?.length > 0 &&
                    data.QAs.map((qna) => {
                      return (
                        <div key={qna._id} className="col-md-12 mb-4 card ">
                          <h5 className="card-header ">{qna.question}</h5>
                          <div className="card-body">
                            <h6 className="card-title line-clamp">{qna.answer}</h6>
                            <div className="card-text text-muted mb-4">
                              <p className="m-0">Đơn vị trả lời: {qna.by?.name}</p>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: 10,
                              }}>
                              <Link
                                to={`/qna/${qna._id}/edit`}
                                className="btn btn-primary"
                                style={{ marginRight: 8 }}>
                                <i className="fas fa-pen"></i>
                              </Link>
                              <div onClick={() => handleDelete(qna._id)} className="btn btn-danger">
                                <i className="fas fa-trash-alt"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
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
                {[...Array(data.pages).keys(0)].map((i) => {
                  return (
                    <li key={i} className="page-item active">
                      <Link className="page-link" to={`?page=${i + 1}`}>
                        {i + 1}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}

export default MainQnAs