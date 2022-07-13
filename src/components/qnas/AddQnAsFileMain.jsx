import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../LoadingError/Loading'
import Toast from '../LoadingError/Toast'
import { useDispatch, useSelector } from 'react-redux'
import { addWithFile } from '../../redux/Slice/qna'
import { toast } from 'react-toastify'
import { ToastObjects } from '../newquestions/MainMessage'
import { getListDepartments } from '../../redux/Slice/department'

const AddQnAsFileMain = () => {
  const [by, setBy] = useState('')
  const [file, setFile] = useState({})
  const [isFilePicked, setIsFilePicked] = useState(false)
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { listDepartments, loading: loadingDepartments } = useSelector((state) => state.departments)
  const { addWithFileSuccess, loadingUploadFile } = useSelector((state) => state.qnas)
  const changeHandler = (e) => {
    setIsFilePicked(true)
    setFile(e.target.files[0])
  }

  const submitHander = (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('import_data', file)
    data.append('by', by)

    dispatch(addWithFile(data, by))

    console.log(file)
  }
  useEffect(() => {
    if (addWithFileSuccess) {
      toast.success('Thêm câu hỏi thành công', ToastObjects)
      dispatch({ type: 'qna/Reset' })
    }
    dispatch(getListDepartments())
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
              <button className="btn btn-primary" disabled={!isFilePicked} type="submit">
                Thêm
              </button>
            </div>
          </div>
          {loadingUploadFile ? (
            <Loading />
          ) : (
            <>
              {' '}
              <div className="row mb-4">
                <div className="col-xl-12 col-lg-12">
                  <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                      <h6 className="text">Vui lòng tải file mẫu dưới đây</h6>
                      <a href="./uploads/import_data.csv" className="btn btn-success mb-4" download>
                        Tải file mẫu
                      </a>

                      {userInfo?.role === 1 &&
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
                          id="import_data"
                          required
                          onChange={changeHandler}></input>
                      </div>
                      {isFilePicked ? (
                        <div>
                          <p>Filename: {file.name}</p>
                          <p>Type: {file.type}</p>
                          <p>Size: {file.size} bytes</p>
                          {/* <p>lastModifiedDate: {new Date(file.lastModified).toLocaleDateString()}</p> */}
                        </div>
                      ) : (
                        <p>Select a file to show details</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </form>
      </section>
    </>
  )
}

export default AddQnAsFileMain
