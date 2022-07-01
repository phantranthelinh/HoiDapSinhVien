import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Loading from '../LoadingError/Loading'
import Message from '../LoadingError/Error'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Toast from '../LoadingError/Toast'
import { deleteMessage, getListMessage } from '../../redux/Slice/newMessage'

export const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  theme: 'colored',
}
const MainMessage = () => {
  let { search } = useLocation()

  const page = search.split('?page=')[1]
  const {
    listMessage: data,
    loading,
    error,
    deleteMessageSuccess,
  } = useSelector((state) => state.messages)
  const dispatch = useDispatch()

  const deleteHandler = (id) => {
    dispatch(deleteMessage(id))
  }
  useEffect(() => {
    if (deleteMessageSuccess) {
      dispatch({ type: 'message/Reset' })

      toast.success('Xóa thành công', ToastObjects)
    }
    dispatch(getListMessage())
  }, [deleteMessageSuccess, dispatch])
  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Các câu hỏi chưa được trả lời</h2>
          <div>
            <Link to="/" className="btn btn-danger">
              Trở về
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
                    data.map((q) => {
                      return (
                        <div key={q._id} className="row mb-4">
                          <div className="col-sm-12">
                            <div className="card">
                              <div className="card-body">
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 8,
                                  }}>
                                  <div>
                                    <h5 className="card-title">Câu hỏi</h5>
                                    <p className="card-text">{q.question}</p>
                                  </div>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => deleteHandler(q._id)}>
                                    <i className="fas fa-trash-alt"></i>
                                  </button>
                                </div>
                                <Link className="btn btn-primary" to={`/add-qna/${q.question}`}>
                                  Trả lời
                                </Link>
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
                {/* {[...Array(data.pages).keys(0)].map((i) => {
                  return (
                    <li key={i} className="page-item active">
                      <Link className="page-link" to={`?page=${i + 1}`}>
                        {i + 1}
                      </Link>
                    </li>
                  )
                })} */}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  )
}

export default MainMessage
