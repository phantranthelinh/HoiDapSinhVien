import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Loading from '../LoadingError/Loading'
import Message from '../LoadingError/Error'
import { useDispatch } from 'react-redux'
import { deleteNewQuestion, getListNewQuestion } from './../../redux/Slice/newQuestion'
import { toast } from 'react-toastify'
import Toast from './../LoadingError/Toast'
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  theme: 'colored',
}
const MainNewQuestion = () => {
  const [to, setTo] = useState('')
  const [question, setQuestion] = useState('')
  let { search } = useLocation()
  const page = search.split('?page=')[1]
  const { userInfo } = useSelector((state) => state.userLogin)
  const { data, loading, error, actionSuccess } = useSelector((state) => state.newQuestions)
  const { listDepartments, loading: loadingDepartments } = useSelector((state) => state.departments)
  const dispatch = useDispatch()

  const clickHandler = (id) => {
    console.log({ id, to })
  }
  const deleteHandler = (id) => {
    dispatch(deleteNewQuestion(id))
  }
  useEffect(() => {
    dispatch(getListNewQuestion())
    if (actionSuccess) {
      dispatch({ type: 'newquestion/Reset' })
      toast.success('Xóa thành công!!', ToastObjects)
    }
  }, [dispatch, actionSuccess])
  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Các câu hỏi chưa được trả lời</h2>
          <div>
            <Link to="/add-qna" className="btn btn-primary">
              Thêm mới
            </Link>
          </div>
        </div>

        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="row gx-3 py-3 ">
              {' '}
              {loading ? (
                <Loading />
              ) : error ? (
                <Message variant="alert-danger">{error}</Message>
              ) : (
                <>
                  {data?.length > 0 &&
                    data.map((nq) => {
                      return (
                        <div key={nq._id} className="row mb-4">
                          <div className="col-sm-12">
                            <div className="card">
                              <div className="card-body">
                                <h5 className="card-title">Câu hỏi</h5>
                                <p className="card-text">{nq.question}</p>
                                <div style={{ display: 'flex' }}>
                                  <button
                                    onClick={() => deleteHandler(nq._id)}
                                    className="btn btn-danger"
                                    style={{ marginLeft: 8 }}>
                                    Xóa
                                  </button>
                                  <button
                                    onClick={() => clickHandler(nq._id)}
                                    className="btn btn-primary"
                                    style={{ marginLeft: 8 }}>
                                    Chuyển đến
                                  </button>
                                  {userInfo.role === 1 &&
                                    (loadingDepartments ? (
                                      <Loading />
                                    ) : (
                                      <div style={{ marginLeft: '8px' }}>
                                        <select
                                          name="by"
                                          onChange={(e) => setTo(e.target.value)}
                                          className="form-select"
                                          defaultValue={'DEFAULT'}>
                                          <option className="form-control" value="DEFAULT" disabled>
                                            - Chọn đơn vị -
                                          </option>
                                          {listDepartments.length > 0 &&
                                            listDepartments.map((department) => {
                                              return (
                                                <option
                                                  key={department._id}
                                                  className="form-control"
                                                  value={department._id}>
                                                  {department.name}
                                                </option>
                                              )
                                            })}
                                        </select>
                                      </div>
                                    ))}
                                </div>
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

export default MainNewQuestion
