import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../LoadingError/Loading'
import Toast from '../LoadingError/Toast'
import { useDispatch, useSelector } from 'react-redux'
import { addWithFile } from '../../redux/Slice/qna'
import { toast } from 'react-toastify'
import { ToastObjects } from '../newquestions/MainMessage'

const AddQnAsFileMain = () => {
  const [by, setBy] = useState('')
  const [file, setFile] = useState('')
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { listDepartments, loading: loadingDepartments } = useSelector((state) => state.departments)
  const { addWithFileSuccess } = useSelector((state) => state.qnas)
  const submitHander = (e) => {
    e.preventDefault()
    dispatch(addWithFile(file))
  }

  useEffect(() => {
    if (addWithFileSuccess) {
      toast.success('Thêm câu hỏi thành công', ToastObjects)
      dispatch({ type: 'qna/Reset' })
    }
  }, [dispatch, addWithFileSuccess])

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: '1200px' }}>
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
                  <a href="./import_data.csv" className="btn btn-success mb-4" download>
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
                  <div className="mb-4">
                    <input
                      type="file"
                      className="form-control"
                      name="import_data"
                      required
                      onChange={(e) => setFile(e.target.files[0])}></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddQnAsFileMain
