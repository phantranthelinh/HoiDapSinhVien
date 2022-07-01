import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Message from '../LoadingError/Error'
import Loading from '../LoadingError/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { addDepartment } from '../../redux/Slice/department'
import { toast } from 'react-toastify'
import Toast from './../LoadingError/Toast'
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  theme: 'colored',
}
const AddDepartmentMain = () => {
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const departments = useSelector((state) => state.departments)
  const { actionSuccess, loading, error } = departments

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addDepartment(name))
  }

  useEffect(() => {
    if (actionSuccess) {
      dispatch({ type: 'department/Reset' })
      toast.success('Thêm mới thành công!!!', ToastObjects)
      setName('')
    }
  }, [actionSuccess, dispatch])

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: '1200px' }}>
        {loading && <Loading />}
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/departments" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm đơn vị</h2>
            <div>
              <button className="btn btn-primary" type="submit">
                Thêm
              </button>
            </div>
          </div>
          {error && <Message variant="alert-danger">{error}</Message>}
          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label className="form-label">Tên đơn vị</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
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

export default AddDepartmentMain
