import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Loading from '../LoadingError/Loading'
import Message from '../LoadingError/Error'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Toast from '../LoadingError/Toast'
import { deleteMessage } from '../../redux/Slice/newMessage'
import { sendMessage } from './../../redux/Slice/newMessage'
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  theme: 'colored',
}
const MainNewQuestion = () => {
  const [toId, setToId] = useState('')
  let { search } = useLocation()
  const page = search.split('?page=')[1]
  const { userInfo } = useSelector((state) => state.userLogin)
  const {
    listMessage: data,
    loading,
    deleteMessageSuccess,
    error,
    sendMessageSuccess,
  } = useSelector((state) => state.messages)
  const { listDepartments, loading: loadingDepartments } = useSelector((state) => state.departments)
  const dispatch = useDispatch()

  const clickHandler = (question) => {
    dispatch(sendMessage(question, toId))
  }
  const deleteHandler = (id) => {
    dispatch(deleteMessage(id))
  }
  useEffect(() => {
    if (sendMessageSuccess) {
      toast.success('Chuyển câu hỏi thành công', ToastObjects)
      dispatch({ type: 'message/Reset' })
    }
    if (deleteMessageSuccess) {
      toast.success('Xoá câu hỏi thành công', ToastObjects)
      dispatch({ type: 'message/Reset' })
    }
  }, [dispatch, deleteMessageSuccess, sendMessageSuccess, data.isMoved])
  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Các câu hỏi có thể chuyển</h2>
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
              ) : data?.length === 0 ? (
                <h5 className="text-center">Không có câu hỏi mới nào</h5>
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
                                  {nq.isMoved && !nq.isAnswered ? (
                                    <>
                                      <h5 className="text-danger">Câu hỏi chưa được trả lời</h5>
                                    </>
                                  ) : nq.isMoved && nq.isAnswered ? (
                                    <>
                                      <h5 className="text-success">Câu hỏi đã được trả lời f00c</h5>
                                      <button
                                        onClick={() => deleteHandler(nq._id)}
                                        className="btn btn-danger"
                                        style={{ marginLeft: 8 }}>
                                        Xóa
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => deleteHandler(nq._id)}
                                        className="btn btn-danger"
                                        style={{ marginLeft: 8 }}>
                                        Xóa
                                      </button>
                                      <button
                                        onClick={() => clickHandler(nq.question)}
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
                                              onChange={(e) => setToId(e.target.value)}
                                              className="form-select"
                                              defaultValue={'DEFAULT'}>
                                              <option
                                                className="form-control"
                                                value="DEFAULT"
                                                disabled>
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
                                    </>
                                  )}
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
          </div>
        </div>
      </section>
    </>
  )
}

export default MainNewQuestion
