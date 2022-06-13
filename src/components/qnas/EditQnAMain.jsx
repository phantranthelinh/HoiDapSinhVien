import React, { useEffect, useState } from 'react'
import Toast from '../LoadingError/Toast'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'
import Message from '../LoadingError/Error'
import Loading from '../LoadingError/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getListDepartments } from '../../redux/Slice/department'
import { editQnA, updateQnA } from './../../redux/Slice/qna'

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  theme: 'colored',
}
const EditQnAMain = ({ qnaId }) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [by, setBy] = useState('')
  const dispatch = useDispatch()

  const { listDepartments, loading: loadingListDepartments } = useSelector(
    (state) => state.departments
  )

  const { actionSuccess, qna, error } = useSelector((state) => state.qnas)
  useEffect(() => {
    if (actionSuccess) {
      dispatch({ type: 'qna/Reset' })
      toast.success('Cập nhật thành công!', ToastObjects)
    }
    if (error) {
      toast.error(error, ToastObjects)
    }

    if (!qna.question || qna._id !== qnaId) {
      dispatch(editQnA(qnaId))
    } else {
      setQuestion(qna.question)
      setAnswer(qna.answer)
      setBy(qna.by)
    }
  }, [dispatch, qnaId, error, qna, actionSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateQnA({
        _id: qnaId,
        question,
        answer,
        by,
      })
    )
  }
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: '1200px' }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/qnas" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Cập nhật câu hỏi</h2>
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
                  <>
                    {' '}
                    <div className="mb-4">
                      <label htmlFor="product_title" className="form-label">
                        Câu hỏi
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="product_price" className="form-label">
                        Câu trả lời
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                      />
                    </div>
                    {loadingListDepartments ? (
                      <Loading />
                    ) : (
                      <div className="mb-4">
                        <label htmlFor="name" className="form-label">
                          Thuộc đơn vị
                        </label>
                        <select
                          name="role"
                          onChange={(e) => setBy(e.target.value)}
                          className="form-control"
                          defaultValue={qna.by?._id}>
                          <option className="form-control" value={qna.by?._id} selected>
                            {qna.by?.name}
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
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default EditQnAMain
