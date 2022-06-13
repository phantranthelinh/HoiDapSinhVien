import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../LoadingError/Loading'
import Toast from '../LoadingError/Toast'
import { useSelector } from 'react-redux'
import Papa from 'papaparse'
import CSVReader from '../CSVReaderClickAndDragUpload'
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
}
const AddQnAsFileMain = () => {
  const [by, setBy] = useState('')
  const [file, setFile] = useState('')
  // const [columnData, setClumnData] = useState("");
  const [rowData, setRowData] = useState([])
  // const columns = useMemo(() => columnData, [columnData]);

  const data = useMemo(() => rowData, [rowData])

  const { userInfo } = useSelector((state) => state.userLogin)
  // const { loading, listKeywords } = useSelector((state) => state.keywords);
  const { listDepartments, loading: loadingDepartments } = useSelector((state) => state.departments)
  const submitHander = (e) => {
    e.preventDefault()
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data
          const columns = [
            {
              accessor: 'question',
            },
            {
              accessor: 'answer',
            },
          ]
          const rows = data.slice(1).map((row) => {
            return row.reduce((acc, cur, index) => {
              acc[columns[index].accessor] = cur
              return acc
            }, {})
          })
          setRowData(rows)
          // setClumnData(columns);
        },
      })
    }
  }

  const dataFilter = data.filter((data) => data.question.trim() !== '' && data.answer.trim() !== '')

  let dataFinal = []

  for (let i = 0; i < data.dataFilter; i++) {
    dataFinal.push({
      by: by,
      ...dataFilter,
    })
  }

  console.log('🚀 ~ file: AddQnAsFileMain.jsx ~ line 67 ~ AddQnAsFileMain ~ dataFinal', dataFinal)

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
                    {/* <CSVReader /> */}

                    <input
                      type="file"
                      className="form-control"
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
