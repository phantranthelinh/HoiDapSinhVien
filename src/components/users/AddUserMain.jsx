import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Loading from '../LoadingError/Loading'
import Toast from '../LoadingError/Toast'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../redux/Slice/user'
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  theme: 'colored',
}

const AddUserMain = () => {
  const dispatch = useDispatch()
  const { listDepartments, loading: loadingListDepartments } = useSelector(
    (state) => state.departments
  )
  const { loading, addUserSuccess } = useSelector((state) => state.userLogin)

  //Validate form
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      email: '',
      from: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('*Bắt buộc phải nhập trường này'),
      email: yup
        .string()
        .email('*Địa chỉ email không hợp lệ')
        .required('*Bắt buộc phải nhập trường này'),
      password: yup.string().min(6, 'Tối thiểu 6 ký tự').required('*Bắt buộc phải nhập trường này'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addUser(values))
      resetForm({ values: '' })
    },
  })

  useEffect(() => {
    if (addUserSuccess) {
      dispatch({ type: 'user/Reset' })
      toast.success('Thêm mới thành viên thành công', ToastObjects)
    }
  }, [dispatch, addUserSuccess])
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: '1200px' }}>
        <form onSubmit={formik.handleSubmit} method="post">
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Thêm nhân viên</h2>
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
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label className="form-label">Tên</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.name && formik.errors.name ? (
                    <p className="text-danger">{formik.errors.name}</p>
                  ) : null}
                  <div className="mb-4">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={formik.values.email}
                      className="form-control"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p className="text-danger">{formik.errors.email}</p>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Mật khẩu</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <p className="text-danger">{formik.errors.password}</p>
                    ) : null}
                  </div>
                  {loadingListDepartments ? (
                    <Loading />
                  ) : (
                    <div className="mb-4">
                      <label className="form-label">Chức vụ</label>

                      <select
                        name="from"
                        onChange={formik.handleChange}
                        className="form-control"
                        onBlur={formik.handleBlur}
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
                      {formik.touched.name && formik.errors.name ? (
                        <p className="text-danger">{formik.errors.name}</p>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddUserMain
