import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../LoadingError/Loading'
import Toast from '../LoadingError/Toast'
import { useDispatch, useSelector } from 'react-redux'
import { extractKeywords } from '../../redux/Slice/keyword'
import { addQnA } from '../../redux/Slice/qna'
import Papa from 'papaparse'
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
}
const AddQnAMain = () => {
  const [question, setQuestion] = useState('')

  const [answer, setAnswer] = useState('')
  const [by, setBy] = useState('')
  const [file, setFile] = useState('')
  const { userInfo } = useSelector((state) => state.userLogin)
  const dispatch = useDispatch()

  const { loading, listKeywords } = useSelector((state) => state.keywords)
  const { listDepartments, loading: loadingDepartments } = useSelector((state) => state.departments)
  const submitHander = (e) => {
    e.preventDefault()
    dispatch(addQnA({ question, answer, by }))
  }
  const blurHandler = () => {
    dispatch(extractKeywords(question))
  }
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: '1200px' }}>
        <form onSubmit={submitHander}>
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
                      onBlur={blurHandler}></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Từ khóa</label>
                    {loading ? (
                      <Loading />
                    ) : (
                      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 ml-4">
                        {listKeywords?.length > 0 &&
                          listKeywords.map((keyword, i) => {
                            return (
                              <ul key={i} className="flex keyword-container">
                                <li className="text-keyword">{keyword}</li>
                                <li className="btn btn-delete-keyword">X</li>
                              </ul>
                            )
                          })}
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Câu trả lời</label>
                    <textarea
                      placeholder="Nhập vào đây..."
                      className="form-control"
                      rows="4"
                      value={answer}
                      required
                      onChange={(e) => setAnswer(e.target.value)}></textarea>
                  </div>
                  {userInfo.role === 1 &&
                    (loadingDepartments ? (
                      <Loading />
                    ) : (
                      <div className="mb-4">
                        <select
                          name="by"
                          onChange={(e) => setBy(e.target.value)}
                          className="form-control"
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
                  <Link to="/add-qnas-file" className="btn btn-primary">
                    Thêm bằng file
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddQnAMain
