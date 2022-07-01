import React, { useEffect, useState } from 'react'
import Toast from '../LoadingError/Toast'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'
import Loading from '../LoadingError/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { editDepartment, updateDepartment } from '../../redux/Slice/department'
import Message from './../LoadingError/Error'

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
}
const EditDepartmentMain = ({ departmentId }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const departments = useSelector((state) => state.departments)
  const { loading, department, actionSuccess, error } = departments

  useEffect(() => {
    if (actionSuccess) {
      dispatch({ type: 'department/Reset' })
      toast.success('Cập nhật thành công!', ToastObjects)
    }
    if (!department.name || department._id !== departmentId) {
      dispatch(editDepartment(departmentId))
    } else {
      setName(department.name)
    }
  }, [department, dispatch, departmentId, actionSuccess])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateDepartment({
        _id: departmentId,
        name,
      })
    )
  }
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: '1200px', height: '100vh' }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/departments" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Chỉnh sửa tên đơn vị</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>
          {error && <Message variant="alert-danger">{error}</Message>}
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {loading && <Loading />}
                  <>
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label">
                        Tên đơn vị
                      </label>
                      <input
                        type="text"
                        placeholder="Tên đơn vị"
                        className="form-control"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
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

export default EditDepartmentMain
